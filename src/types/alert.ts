import {Indicator, Metric} from '~/src/types/metric'

export interface AlertState {
  initialized: boolean
  alerts: Alert[]
}

export interface Alert {
  token_address: string
  metric: Metric
  indicator: Indicator
  value: number
  triggered: boolean
}
