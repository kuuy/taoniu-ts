import { combineReducers } from 'redux'

import {reducer as tokenReducers} from '~/src/slices/token'
import {reducer as accountReducers} from '~/src/slices/account'
import {reducer as stakingReducers} from '~/src/slices/staking'
import {reducer as currencyReducers} from '~/src/slices/currency'
import {reducer as modalReducers} from '~/src/slices/modal'
import {reducer as settingsReducers} from '~/src/slices/settings'
import {reducer as blockchainReducers} from '~/src/slices/blockchain'
import {reducer as swapReducers} from '~/src/slices/swap'
import {reducer as alertReducers} from '~/src/slices/alert'
import {reducer as notificationReducers} from '~/src/slices/notification'
import {reducer as collectionReducers} from '~/src/slices/collection'

export default combineReducers({
  token: tokenReducers,
  account: accountReducers,
  staking: stakingReducers,
  currency: currencyReducers,
  modal: modalReducers,
  settings: settingsReducers,
  blockchain: blockchainReducers,
  swap: swapReducers,
  alert: alertReducers,
  notification: notificationReducers,
  collection: collectionReducers
})
