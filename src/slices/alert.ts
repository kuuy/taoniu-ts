import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AlertState} from '~/src/types/alert'

const initialState: AlertState = {
  initialized: false,
  alerts: []
}

const reducers = {
}

export const slice = createSlice({
  name: 'alert',
  initialState,
  reducers,
})

export const { reducer } = slice
