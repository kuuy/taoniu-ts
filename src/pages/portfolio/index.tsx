import PortfolioBalances from '~/src/components/PortfolioBalances'
import React from 'react'
import { useSelector } from '~/src/store/store'
import Head from 'next/head'
import PortfolioPools from '~/src/components/PortfolioPools'
import PortfolioOverview from '~/src/components/PortfolioOverview'
import PortfolioStaking from '~/src/components/PortfolioStaking'
import PortfolioHeader from '~/src/components/PortfolioHeader'
import Membership from '~/src/pages/membership'
import PortfolioCollections from '~/src/components/PortfolioCollections'

const Portfolio = () => {
  const accountState = useSelector(state => state.account)

  if(accountState.selectedWallet === null) {
    return <Membership />
  }

  return (
    <>
      <Head>
        <title>Portfolio | ZilStream</title>
        <meta property="og:title" content={`Portfolio | ZilStream`} />
      </Head>

      <PortfolioHeader />

      <div className="max-w-full flex flex-col sm:flex-row items-start">
        <PortfolioOverview />
        <div className="max-w-full mt-6 sm:mt-0 flex-grow flex flex-col items-stretch">
          <PortfolioBalances />
          <PortfolioPools />
          <PortfolioStaking />
          <PortfolioCollections />
        </div>
      </div>
    </>
  )
}

export default Portfolio
