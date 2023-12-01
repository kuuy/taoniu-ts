import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {SettingsState} from '~/src/types/settings'

const initialState: SettingsState = {
  initialized: false,
  columns: {
    priceZIL: true,
    priceFiat: true,
    ath: false,
    atl: false,
    change24H: true,
    change7D: true,
    change24HZIL: false,
    change7DZIL: false,
    marketCap: true,
    marketCapDiluted: false,
    circSupply: false,
    totalSupply: false,
    maxSupply: false,
    liquidity: true,
    volume: true,
    apr: false,
    apy: false,
    graph24H: true,
    graph24HZIL: false
  },
  filters: {
    unlisted: false,
    bridged: true
  },
  rows: 50
}

const reducers = {
}

export const slice = createSlice({
  name: 'settings',
  initialState,
  reducers,
})

export const { reducer } = slice
