import {Operator} from '~/src/types/account'

export interface StakingState {
  operators: Operator[]
  initialized: boolean
}
