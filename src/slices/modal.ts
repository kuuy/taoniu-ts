import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ModalState} from '~/src/types/modal'

const initialState: ModalState = {
  walletOpen: false,
  currencyOpen: false,
  exchangeOpen: false,
  exportOpen: false,
}

const reducers = {
}

export const slice = createSlice({
  name: 'modal',
  initialState,
  reducers,
})

export const { reducer } = slice
