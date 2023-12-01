import { Rate } from '~/src/types/rate'

export default async function getRates(): Promise<Rate[]>  {
  const res = await fetch(`${process.env.NEXT_PUBLIC_IO_URL}/rates`)
  return await res.json()
}
