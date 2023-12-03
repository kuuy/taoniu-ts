import {ReactElement, ReactNode} from 'react'
import {NextPage} from 'next'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { Provider as ReduxProvider } from 'react-redux'

import {CacheProvider} from '@emotion/react'

import {store} from '~/src/store/store'
import createEmotionCache from '~/src/utils/create-emotion-cache'
import Layout from '~/src/layouts/default'

import '~/src/styles/globals.css'
import '~/src/styles/toastify.css'
import {TokenProvider,TokenConsumer} from '~/src/contexts/token-context'
import {SplashScreen} from '~/src/components/splash-screen'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const emotionCache = createEmotionCache()
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)
  return (
    <CacheProvider value={emotionCache}>
      <ReduxProvider store={store}>
        <TokenProvider>
          <TokenConsumer>
            {(token) => (
              <ThemeProvider defaultTheme="system" enableSystem={true} attribute="class">
                {token.initialized ? getLayout(<Component {...pageProps} />) : <SplashScreen/>}
              </ThemeProvider>
            )}
          </TokenConsumer>
        </TokenProvider>
      </ReduxProvider>
    </CacheProvider>
  )
}
