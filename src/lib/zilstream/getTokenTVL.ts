import { Token } from '~/src/types/token'

export default async function getTokenTVL(token: Token): Promise<{time: string, value: number}[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tokens/${token.symbol}/tvl`)
  return res.json()
}
