import {MainnetNode, TestnetNode} from '~/src/utils/mainnetNode'
import { Network } from '~/src/types/network'

export interface BlockchainState {
  network: Network
  node: MainnetNode|TestnetNode
  blockHeight: number|null
}
