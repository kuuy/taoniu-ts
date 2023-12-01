export type Currency = {
  name: string
  code: string
  symbol: string
  rate: number
  isPopular: boolean
  isFiat: boolean
  isCrypto: boolean
}

export interface CurrencyState {
  currencies: Currency[]
  selectedCurrency: string
}

