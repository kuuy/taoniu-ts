import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {BlockchainState} from '~/src/types/blockchain'
import {Network} from '~/src/types/network'
import {MainnetNode} from '~/src/utils/mainnetNode'

const initialState: BlockchainState = {
  network: Network.MainNet,
  node: MainnetNode.ZilStream,
  blockHeight: null,
}

const reducers = {
}

export const slice = createSlice({
  name: 'blockchain',
  initialState,
  reducers,
})

export const { reducer } = slice
