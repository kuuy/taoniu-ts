import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AccountState} from '~/src/types/account'
import {Network} from '~/src/types/network'

const initialState: AccountState = {
  initialized: false,
  network: Network.MainNet,
  wallets: [],
  selectedWallet: null
}

const reducers = {
}

export const slice = createSlice({
  name: 'account',
  initialState,
  reducers,
})

export const { reducer } = slice
