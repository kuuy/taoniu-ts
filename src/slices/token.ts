import {Token, TokenState} from '~/src/types/token'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type InitialAction = PayloadAction<Token[]>

const initialState: TokenState = {
  initialized: false,
  zilRate: 0,
  tokens: []
}

const reducers = {
  initial: (state: TokenState, action: InitialAction) => {
    const tokens = action.payload
    state.initialized = true
    state.tokens = tokens
  },
}

export const slice = createSlice({
  name: 'token',
  initialState,
  reducers,
})

export const { reducer } = slice
