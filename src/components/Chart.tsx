import React, { useEffect, useRef} from 'react'
import { createChart, Time, UTCTimestamp} from 'lightweight-charts'
import { useTheme } from 'next-themes'

interface Props {
  data: {time: string, value: number, value_zil?: number}[],
  isUserInteractionEnabled?: boolean,
  isScalesEnabled?: boolean,
  isZilValue?: boolean
}

export interface ChartDataPoint {
  time: Time,
  value: number,
}

export const Chart = (props: Partial<Props>) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const {resolvedTheme} = useTheme()

  useEffect(() => {
    if (!ref.current) return

    const chart = createChart(ref.current, {
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
      handleScroll: !!props.isUserInteractionEnabled,
      handleScale: !!props.isUserInteractionEnabled,
      layout: {
        backgroundColor: 'rgba(0,0,0,0)',
        textColor: '#838383',
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: !!props.isScalesEnabled,
          color: resolvedTheme === 'dark' ? 'rgb(41, 51, 65)' : 'rgb(248, 248, 256)'
        },
      },
      leftPriceScale: {
        visible: false,
      },
      rightPriceScale: {
        visible: !!props.isScalesEnabled,
        borderVisible: false,
      },
      timeScale: {
        visible: !!props.isScalesEnabled,
        borderVisible: false,
        fixLeftEdge: true,
      },
      crosshair: {
        vertLine: {
          visible: !!props.isUserInteractionEnabled ,
        },
        horzLine: {
          visible: !!props.isUserInteractionEnabled,
        },
      },
    })

    const data: ChartDataPoint[] = []
    props.data!.sort((a,b) =>  new Date(a.time).getTime()  -  new Date(b.time).getTime())
    props.data!.forEach(rate => {
      data.push({
        time: (Date.parse(rate.time) / 1000) as UTCTimestamp,
        value: props.isZilValue ? rate.value_zil! : rate.value,
      })
    })
    const isIncrease = data.length > 0 &&  data?.[0].value < data?.[data.length-1].value

    const series = chart.addAreaSeries({
      topColor: isIncrease ? 'rgba(76, 175, 80, 0.56)' : 'rgba(255, 82, 82, 0.56)',
      bottomColor: isIncrease ? 'rgba(76, 175, 80, 0.04)' : 'rgba(255, 82, 82, 0.04)',
      lineColor: isIncrease ? 'rgba(76, 175, 80, 1)' : 'rgba(255, 82, 82, 1)',
      lineWidth: 2,
      priceLineVisible: false,
      crosshairMarkerVisible: !!props.isUserInteractionEnabled,
      autoscaleInfoProvider: () => ({
        priceRange: {
            minValue: Math.min(...props.data!.map(item => props.isZilValue ? item.value_zil! : item.value)),
            maxValue: Math.max(...props.data!.map(item => props.isZilValue ? item.value_zil! : item.value)),
        },
      }),
    })

    series.setData(data)
    chart.timeScale().fitContent()

    function resize() {
      if(ref.current) {
        chart.resize(ref.current.clientWidth, ref.current.clientHeight)
      }
    }
    window.addEventListener('resize', resize)

    return () => {
      chart.remove()
      window.removeEventListener('resize', resize)
    }
  }, [props])

  return (
    <>
      <div ref={ref} className="h-full w-full" />
    </>
  )
}

Chart.defaultProps = {
  isUserInteractionEnabled: true,
  isScalesEnabled: true
}
