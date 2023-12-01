import { NftCollection } from '~/src/types/collection'

export default async function getNftCollection(address: string): Promise<NftCollection>  {
  const res = await fetch(`${process.env.NEXT_PUBLIC_IO_URL}/nft/collections/${address}`)
  return await res.json()
}
