import { Rate } from '~/src/types/rate'

export default async function getRatesForToken(address: string): Promise<Rate[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_IO_URL}/chart/aggr/${address}`)
  return res.json()
}
