import React, { useEffect, useState } from 'react'
import { useSelector } from '~/src/store/store'
import { AccountType,ConnectedWallet } from '~/src/types/account'
import ZilliqaHW from '~/src/utils/ledger'

interface Props {
  onClose?: (() => void)
}

const ConnectLedger = (props: Props) => {
  const accountState = useSelector(state => state.account)
  // const dispatch = useDispatch()

  const [hwIndex, setHwIndex] = useState(0)
  const [address, setAddress] = useState('')

  useEffect(() => {
    connect()
  }, [])

  const connect = async () => {
    try {
      const transport = await ZilliqaHW.create()
      const ledger = new ZilliqaHW(transport)
      const data = await ledger.getPublicAddress(hwIndex)

      let wallet: ConnectedWallet = {
        address: data.pubAddr,
        label: '',
        isDefault: accountState.wallets.length === 0,
        isConnected: false,
        isMember: false,
        type: AccountType.Ledger
      }
      // dispatch({ type: AccountActionTypes.ADD_WALLET, payload: {wallet: wallet}})

      props.onClose?.()
    } catch(err: any) {
      console.log(err.message)
    }
  }

  return (
    <div className="py-8">
      <div>Connect your ledger. Make sure you have the Zilliqa app opened on your Ledger.</div>
    </div>
  )
}

export default ConnectLedger
