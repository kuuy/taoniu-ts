import { Token } from '~/src/types/token'
import { Pair } from '~/src/types/pair'

export default async function getTokenPairs(address: string): Promise<Pair[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_IO_URL}/tokens/${address}/pairs`)
  return res.json()
}
