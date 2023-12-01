import {ReactElement, ReactNode} from 'react'
import Header from '~/src/components/Header'
import Footer from '~/src/components/Footer'
import Head from 'next/head'

interface LayoutProps {
  children?: ReactNode
}

export default function DefaultLayout({ children }: LayoutProps): ReactElement{
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
        <Header />
        <div className="container flex-grow">
          <div className="px-3 md:px-4 my-4 flex-grow">{children}</div>
        </div>
        <Footer />
      </div>
    </>
  )
}
