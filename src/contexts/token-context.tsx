import type { FC, ReactNode } from 'react'
import { createContext, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

import {useDispatch, useSelector} from '~/src/store/store'
import thunks from '~/src/thunks/token'
import {TokenState} from '~/src/types/token'

export interface TokenContextState extends TokenState {}

export const TokenContext = createContext<TokenContextState>({
  initialized: false,
  zilRate: 0,
  tokens: [],
})

interface ProviderProps {
  children: ReactNode
}

export const TokenProvider = ({ children }: ProviderProps) => {
  const dispatch = useDispatch()
  const tokenState = useSelector((state) => state.token)

  const initial = useCallback(
    async (): Promise<void> => {
      console.log('token initial')
      dispatch(thunks.initial())
    },
    [dispatch, tokenState]
  )

  useEffect(() => {
    if (!tokenState.initialized) {
      initial()
    }
  }, [tokenState])

  return (
    <TokenContext.Provider
      value={{
        ...tokenState,
      }}
    >
      {children}
    </TokenContext.Provider>
  )
}

TokenProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export const TokenConsumer = TokenContext.Consumer
