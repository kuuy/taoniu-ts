import {Pair} from '~/src/types/pair'

export type SwapState = {
  exchange: SwapExchange
  tokenInAddress: string|null
  tokenOutAddress: string|null
  slippage: number
  selectedDirection: "in"|"out"
  availablePairs: Pair[]
}

export interface SwapExchange {
  name: string
  iconAddress: string
  identifier: "zilswap"|"xcad-dex"|"carbswap"
  baseTokenAddress: string
  active: boolean
  hasRouting: boolean
}
