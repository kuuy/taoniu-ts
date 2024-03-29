import { Rate } from '~/src/types/rate'

export default async function getNftRates(collectionIds: string[]): Promise<Rate[]>  {
  const res = await fetch(`${process.env.NEXT_PUBLIC_IO_URL}/nft/rates/${collectionIds.join(',')}`)
  return await res.json()
}
