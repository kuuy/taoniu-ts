import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {CollectionState} from '~/src/types/collection'

const initialState: CollectionState = {
  initialized: false,
  collections: []
}

const reducers = {
}

export const slice = createSlice({
  name: 'collection',
  initialState,
  reducers,
})

export const { reducer } = slice
