import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {StakingState} from '~/src/types/staking'

const initialState: StakingState = {
  initialized: false,
  operators: [],
}

const reducers = {
}

export const slice = createSlice({
  name: 'staking',
  initialState,
  reducers,
})

export const { reducer } = slice
