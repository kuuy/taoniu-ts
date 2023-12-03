import { Rate } from '~/src/types/rate'

export default async function getRates(): Promise<Rate[]>  {
  const response = await fetch(`${process.env.NEXT_PUBLIC_IO_URL}/rates`)
  if (!response.ok) {
    throw new Error('Failed Request Api')
  }

  return response.json()
}
