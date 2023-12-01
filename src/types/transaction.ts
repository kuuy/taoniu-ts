import BigNumber from 'bignumber.js'

export interface Transaction {
  block_height: number
  hash: string
  success: boolean
  timestamp: Date
  type: string
  sub_type: string
  from_address: string
  to_address: string
  token_in_address: string
  token_out_address: string
  zil_amount: BigNumber
  token_in_amount: BigNumber
  token_out_amount: BigNumber
  nonce: number
  gas_price: number
  gas_limit: number
  data: string
  receipt: string
}

export interface ExportTransaction {
  Type: string
  BuyAmount: number
  BuyCurrency: string
  SellAmount: number
  SellCurrency: string
  FeeAmount: number
  FeeCurrency: string
  Exchange: string
  Group: string
  Comment: string
  Date: string
}
