import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {NotificationState} from '~/src/types/notification'

const initialState: NotificationState = {
  initialized: false,
  notifications: []
}

const reducers = {
}

export const slice = createSlice({
  name: 'notification',
  initialState,
  reducers,
})

export const { reducer } = slice
