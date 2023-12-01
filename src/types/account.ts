import {Network} from '~/src/types/network'
import BigNumber from 'bignumber.js'

export interface AccountState {
  initialized: boolean,
  network: Network,
  wallets: ConnectedWallet[],
  selectedWallet: ConnectedWallet|null
}

export interface ConnectedWallet {
  address: string,
  label: string,
  isDefault: boolean,
  isConnected: boolean,
  isMember: boolean,
  type: AccountType
  provider?: any
}

export enum AccountType {
  ZilPay,
  Ledger,
  Avatar,
  Zeeves,
  Address
}

export type Operator = {
  name: string
  address: string
  staked?: BigNumber
  // url: string
  // api_url: string
  // stake_amount: BigNumber
  // buffered_deposit: BigNumber
  comission: BigNumber
  symbol: string
  decimals: number
}
