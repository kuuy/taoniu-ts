import { Exchange } from '~/src/types/exchange'

export default async function getExchange(slug: string): Promise<Exchange>  {
  const res = await fetch(`${process.env.NEXT_PUBLIC_IO_URL}/exchanges/${slug}`)
  return await res.json()
}
