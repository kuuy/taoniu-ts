import TransportU2F from '@ledgerhq/hw-transport-u2f'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import { sha256 } from 'js-sha256'
import { BN, Long } from '@zilliqa-js/util'
import {encodeTransactionProto} from '@zilliqa-js/account/dist/types/src/util'

const CLA = 0xe0;
const INS = {
  getVersion: 0x01,
  getPublickKey: 0x02,
  getPublicAddress: 0x02,
  signTxn: 0x04,
  signHash: 0x08
};

const PubKeyByteLen = 33;
const SigByteLen = 64;
const HashByteLen = 32;
const Bech32AddrLen = 'zil'.length + 1 + 32 + 6;

/**
 * Zilliqa API
 *
 * @example
 * import Zil from '@ledgerhq/hw-app-zil'
 * const zil = new Zil(transport)
 */
export default class ZilliqaHW {
  transport: any

  static async create() {
    const isUSB = await TransportWebUSB.isSupported();

    try {
      if (isUSB) {
        const transport = await TransportWebUSB.create();

        return transport;
      }
    } catch {
      //
    }

    return TransportU2F.create();
  }

  constructor(transport: any, scrambleKey = 'w0w') {
    this.transport = transport;
    transport.decorateAppAPIMethods(
      this,
      ['getVersion', 'getPublicKey', 'getPublicAddress', 'signHash', 'signTxn'],
      scrambleKey
    );
  }

  getVersion() {
    const P1 = 0x00;
    const P2 = 0x00;

    return this.transport.send(CLA, INS.getVersion, P1, P2).then((response: any) => {
      let version = 'v';
      for (let i = 0; i < 3; ++i) {
        version += parseInt('0x' + response[i]);
        if (i !== 2) {
          version += '.';
        }
      }
      return { version };
    });
  }

  getPublicKey(index: number) {
    const P1 = 0x00;
    const P2 = 0x00;

    const payload = Buffer.alloc(4);
    payload.writeInt32LE(index);

    return this.transport
      .send(CLA, INS.getPublickKey, P1, P2, payload)
      .then((response: any) => {
        // The first PubKeyByteLen bytes are the public address.
        const publicKey = response.toString('hex').slice(0, PubKeyByteLen * 2);
        return { publicKey };
      });
  }

  getPublicAddress(index: number) {
    const P1 = 0x00;
    const P2 = 0x01;

    const payload = Buffer.alloc(4);
    payload.writeInt32LE(index);

    return this.transport
      .send(CLA, INS.getPublicAddress, P1, P2, payload)
      .then((response: any) => {
        // After the first PubKeyByteLen bytes, the remaining is the bech32 address string.
        const pubAddr = response
          .slice(PubKeyByteLen, PubKeyByteLen + Bech32AddrLen)
          .toString('utf-8');
        const publicKey = response.toString('hex').slice(0, PubKeyByteLen * 2);
        return { pubAddr, publicKey };
      });
  }

  signTxn(keyIndex: number, txnParams: any) {
    // https://github.com/Zilliqa/Zilliqa-JavaScript-Library/tree/dev/packages/zilliqa-js-account#interfaces
    const P1 = 0x00;
    const P2 = 0x00;

    const indexBytes = Buffer.alloc(4);
    indexBytes.writeInt32LE(keyIndex);

    // Convert to Zilliqa types
    if (!(txnParams.amount instanceof BN)) {
      txnParams.amount = new BN(txnParams.amount);
    }

    if (!(txnParams.gasPrice instanceof BN)) {
      txnParams.gasPrice = new BN(txnParams.gasPrice);
    }

    if (!(txnParams.gasLimit instanceof Long)) {
      txnParams.gasLimit = Long.fromNumber(txnParams.gasLimit);
    }

    let txnBytes = encodeTransactionProto(txnParams);

    const STREAM_LEN = 128; // Stream in batches of STREAM_LEN bytes each.
    let txn1Bytes;
    if (txnBytes.length > STREAM_LEN) {
      txn1Bytes = txnBytes.slice(0, STREAM_LEN);
      txnBytes = txnBytes.slice(STREAM_LEN, undefined);
    } else {
      txn1Bytes = txnBytes;
      txnBytes = Buffer.alloc(0);
    }

    const txn1SizeBytes = Buffer.alloc(4);
    txn1SizeBytes.writeInt32LE(txn1Bytes.length);
    const hostBytesLeftBytes = Buffer.alloc(4);
    hostBytesLeftBytes.writeInt32LE(txnBytes.length);
    // See signTxn.c:handleSignTxn() for sequence details of payload.
    // 1. 4 bytes for indexBytes.
    // 2. 4 bytes for hostBytesLeftBytes.
    // 3. 4 bytes for txn1SizeBytes (number of bytes being sent now).
    // 4. txn1Bytes of actual data.
    const payload = Buffer.concat([
      indexBytes,
      hostBytesLeftBytes,
      txn1SizeBytes,
      txn1Bytes
    ]);

    const transport = this.transport;
    return transport
      .send(CLA, INS.signTxn, P1, P2, payload)
      .then(function cb(response: any) {
        // Keep streaming data into the device till we run out of it.
        // See signTxn.c:istream_callback() for how this is used.
        // Each time the bytes sent consists of:
        //  1. 4-bytes of hostBytesLeftBytes.
        //  2. 4-bytes of txnNSizeBytes (number of bytes being sent now).
        //  3. txnNBytes of actual data.
        if (txnBytes.length > 0) {
          let txnNBytes;
          if (txnBytes.length > STREAM_LEN) {
            txnNBytes = txnBytes.slice(0, STREAM_LEN);
            txnBytes = txnBytes.slice(STREAM_LEN, undefined);
          } else {
            txnNBytes = txnBytes;
            txnBytes = Buffer.alloc(0);
          }

          const txnNSizeBytes = Buffer.alloc(4);
          txnNSizeBytes.writeInt32LE(txnNBytes.length);
          hostBytesLeftBytes.writeInt32LE(txnBytes.length);
          const payload = Buffer.concat([
            hostBytesLeftBytes,
            txnNSizeBytes,
            txnNBytes
          ]);
          return transport.send(CLA, INS.signTxn, P1, P2, payload).then(cb);
        }
        return response;
      })
      .then((result: any) => {
        return result.toString('hex').slice(0, SigByteLen * 2);
      });
  }

  signHash(keyIndex: number, message: any) {
    const P1 = 0x00;
    const P2 = 0x00;
    const hashStr = sha256(message);
    let indexBytes = Buffer.alloc(4);
    indexBytes.writeInt32LE(keyIndex);
    const hashBytes = Buffer.from(hashStr, 'hex');
    let hashLen = hashBytes.length;
    if (hashLen <= 0) {
      throw Error(`Hash length ${hashLen} is invalid`);
    }
    if (hashLen > HashByteLen) {
      hashBytes.slice(0, HashByteLen);
    }
    const payload = Buffer.concat([indexBytes, hashBytes]);
    return this.transport
      .send(CLA, INS.signHash, P1, P2, payload)
      .then((result: any) => {
        return result.toString('hex').slice(0, SigByteLen * 2);
      });
  }
}
