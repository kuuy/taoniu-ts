import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {SwapState} from '~/src/types/swap'
import {swapExchanges} from '~/src/api/swap/data'

const initialState: SwapState = {
  exchange: swapExchanges[0],
  tokenInAddress: null,
  tokenOutAddress: null,
  slippage: 0.01,
  selectedDirection: "in",
  availablePairs: []
}

const reducers = {
}

export const slice = createSlice({
  name: 'swap',
  initialState,
  reducers,
})

export const { reducer } = slice
