import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Token } from '~/src/types/token'
import getRatesForToken from '~/src/lib/zilstream/getRatesForToken'

const Chart = dynamic(
  () => import('~/src/components/Chart').then((mod) => mod.Chart),
  { ssr: false }
)

interface Props {
  token: Token
}

const ChartContainer = (props: Props) => {
  const { token} = props
  const [rates, setRates] = useState<{time: string, value: number}[]>()

  useEffect(() => {
    fetchRates()
  }, [])

  async function fetchRates() {
    const r = await getRatesForToken(token.address)
    var newRates: {time: string, value: number}[] = []
    r.forEach(rate => {
      newRates.push({
        time: rate.time,
        value: rate.value
      })
    })
    setRates(newRates)
  }

  return (
    <div className="h-80 md:h-144 bg-white dark:bg-gray-800 rounded-lg">
      {rates &&
        <Chart data={rates} isUserInteractionEnabled={true} isScalesEnabled={true} />
      }
    </div>
  )
}

export default ChartContainer
