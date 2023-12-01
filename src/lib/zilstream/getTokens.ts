import { Token } from '~/src/types/token'

export default async function getTokens(): Promise<Token[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_IO_URL}/tokens`)
  return await res.json()
}
