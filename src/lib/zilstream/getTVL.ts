import { ChartDataPoint } from '~/src/components/Chart'

export default async function getTVL(): Promise<{time: string, value: number}[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_IO_URL}/chart/tvl`)
  return res.json()
}
