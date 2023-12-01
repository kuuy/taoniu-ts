import { Token } from '~/src/types/token'

export default async function getToken(address: string): Promise<Token> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_IO_URL}/tokens/${address}`)
  return res.json()
}
