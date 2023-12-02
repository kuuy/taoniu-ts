
export interface Stats {
  tvl: number
  volume_24h: number
  market_cap: number
  tokens: StatsToken[]
}

export interface StatsToken {
  name: string,
  symbol: string,
  address: string,
  rate: number,
  rate_usd: number,
  liquidity: number,
  liquidity_zil: number,
  liquidity_ema30_zil: number,
  zil_reserve: number,
  token_reserve: number,
  volume_24h: number,
  volume_ema30_zil: number,
  aps: number,
}
