import { NftCollection } from '~/src/types/collection'

export default async function getNftCollections(): Promise<NftCollection[]>  {
  const res = await fetch(`${process.env.NEXT_PUBLIC_IO_URL}/nft/collections`)
  return await res.json()
}
