import React, { useEffect, useState } from 'react'
import Header from './Header'
import Head from 'next/head'
import Footer from './Footer'
import { useRouter } from 'next/router'
import PageLoading from './PageLoading'
import MarketBar from './MarketBar'
import WalletModal from './WalletModal'
import CurrencyModal from './Swap/components/CurrencyModal'
import { ToastContainer } from 'react-toastify'
import ExchangeModal from './Swap/components/ExchangeModal'

interface Props {
  children: React.ReactNode
}

export default function Layout(props: Props) {
  const { children } = props
  const router = useRouter()

  const [state, setState] = useState({
    isRouteChanging: false,
    loadingKey: 0,
  })

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: true,
        loadingKey: prevState.loadingKey ^ 1,
      }))
    }

    const handleRouteChangeEnd = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: false,
      }))
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeEnd)
    router.events.on('routeChangeError', handleRouteChangeEnd)

    const handleRouteChange = (url: any) => {}
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeEnd)
      router.events.off('routeChangeError', handleRouteChangeEnd)
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover" />

        <title>ZilStream</title>
        <meta property="og:site_name" content="ZilStream" />
        <meta name="twitter:site" content="@zilstream" />

        <link rel="icon" type="image/png" href="/favicon-196x196.png" sizes="196x196" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icon-ios.png" />
        <meta name="apple-mobile-web-app-title" content="ZilStream" />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <PageLoading isRouteChanging={state.isRouteChanging} key={state.loadingKey} />
        <Header />
        <MarketBar />
        <ToastContainer />
        <div className="container flex-grow">
          <WalletModal />
          <CurrencyModal />
          <ExchangeModal />
          <div className="px-3 md:px-4 my-4 flex-grow">{children}</div>
        </div>
        <Footer />
      </div>
    </>
  )
}
