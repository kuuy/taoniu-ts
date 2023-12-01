import {ReactElement, ReactNode} from 'react'
import {NextPage} from 'next'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { Provider as ReduxProvider } from 'react-redux'

import {CacheProvider} from '@emotion/react'

import createEmotionCache from '~/src/utils/create-emotion-cache'

import '~/src/styles/globals.css'
import '~/src/styles/toastify.css'

import {store} from '~/src/store/store'
import Layout from '~/src/layouts/default'

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
        <ThemeProvider defaultTheme="system" enableSystem={true} attribute="class">
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </ReduxProvider>
    </CacheProvider>
  )
}
