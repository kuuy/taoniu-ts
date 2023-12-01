import { Exchange } from './exchange'
import { Quote } from './quote'
import { Reserve } from './reserve'

export interface Pair {
  id: number
  pair: string
  category: string
  base_symbol: string
  base_address: string
  quote_symbol: string
  quote_address: string
  exchange_id?: string
  price?: number
  base_reserve?: number
  quote_reserve?: number
  volume_24h_base?: number
  volume_24h_quote?: number
  quote?: Quote
  reserve?: Reserve
  exchange?: Exchange
  volume?: PairVolume
}

export interface PairVolume {
  timestamp: string
  volume_24h_base: number
  volume_24h_quote: number
}
