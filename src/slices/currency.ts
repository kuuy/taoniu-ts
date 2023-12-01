import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {CurrencyState} from '~/src/types/currency'

const initialState: CurrencyState = {
  currencies: [
    {
      name: 'United States Dollar',
      code: 'USD',
      symbol: '$',
      rate: 0,
      isPopular: true,
      isFiat: true,
      isCrypto: false
    },
    {
      name: 'Euro',
      code: 'EUR',
      symbol: '€',
      rate: 0,
      isPopular: true,
      isFiat: true,
      isCrypto: false
    },
    {
      name: 'Singapore Dollar',
      code: 'SGD',
      symbol: 'S$',
      rate: 0,
      isPopular: true,
      isFiat: true,
      isCrypto: false
    },
    {
      name: 'Pound Sterling',
      code: 'GBP',
      symbol: '£',
      rate: 0,
      isPopular: true,
      isFiat: true,
      isCrypto: false
    },
    {
      name: 'Bitcoin',
      code: 'BTC',
      symbol: '₿',
      rate: 0,
      isPopular: true,
      isFiat: false,
      isCrypto: true
    },
    {
      name: 'Indian Rupee',
      code: 'INR',
      symbol: '₹',
      rate: 0,
      isPopular: false,
      isFiat: true,
      isCrypto: false
    },
    {
      name: 'Canadian Dollar',
      code: 'CAD',
      symbol: '$',
      rate: 0,
      isPopular: false,
      isFiat: true,
      isCrypto: false
    },
    {
      name: 'Chinese Yuan',
      code: 'CNY',
      symbol: '¥',
      rate: 0,
      isPopular: false,
      isFiat: true,
      isCrypto: false
    },
    {
      name: 'Indonesian Rupiah',
      code: 'IDR',
      symbol: 'RP',
      rate: 0,
      isPopular: false,
      isFiat: true,
      isCrypto: false
    },
    {
      name: 'Australian Dollar',
      code: 'AUD',
      symbol: '$',
      rate: 0,
      isPopular: false,
      isFiat: true,
      isCrypto: false
    },
    {
      name: 'New Zealand Dollar',
      code: 'NZD',
      symbol: '$',
      rate: 0,
      isPopular: false,
      isFiat: true,
      isCrypto: false
    },
    {
      name: 'Thai Baht',
      code: 'THB',
      symbol: '฿',
      rate: 0,
      isPopular: false,
      isFiat: true,
      isCrypto: false
    },
    {
      name: 'Russian Ruble',
      code: 'RUB',
      symbol: '₽',
      rate: 0,
      isPopular: false,
      isFiat: true,
      isCrypto: false
    },
    {
      name: 'Japanese Yen',
      code: 'JPY',
      symbol: '¥',
      rate: 0,
      isPopular: false,
      isFiat: true,
      isCrypto: false
    },
    {
      name: 'Malaysian Ringgit',
      code: 'MYR',
      symbol: 'RM',
      rate: 0,
      isPopular: false,
      isFiat: true,
      isCrypto: false
    },
  ],
  selectedCurrency: 'USD'
}

const reducers = {
}

export const slice = createSlice({
  name: 'currency',
  initialState,
  reducers,
})

export const { reducer } = slice
