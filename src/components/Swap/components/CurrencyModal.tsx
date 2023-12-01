import { Dialog, Transition } from '@headlessui/react'
import TokenIcon from '~/src/components/TokenIcon'
import { ZIL_ADDRESS } from '~/src/constants'
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { useSelector } from '~/src/store/store'
// import { openCurrency } from '~/src/store/modal/actions'
// import { updateSwap } from '~/src/store/swap/actions'
import { cryptoFormat } from '~/src/utils/format'
import {toBigNumber} from '~/src/utils/useMoneyFormatter'

const CurrencyModal = () => {
  const swapState = useSelector(state => state.swap)
  const tokenState = useSelector(state => state.token)
  const modalState = useSelector(state => state.modal)
  // const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if(isOpen === false) {
      setSearchTerm('')
    }
    // dispatch(openCurrency(isOpen))
  }, [isOpen])

  useEffect(() => {
    if(isOpen) return
    setIsOpen(modalState.currencyOpen)
  }, [modalState.currencyOpen])

  const filteredTokens = useMemo(() => {
    var tokens = tokenState.tokens

    // @ts-ignore
    let quoteTokens = [...new Set(swapState.availablePairs.map(pair => pair.quote_address))]
    // @ts-ignore
    let baseTokens = [...new Set(swapState.availablePairs.map(pair => pair.base_address))]

    tokens = tokens.filter(token => quoteTokens.includes(token.address) || baseTokens.includes(token.address))

    if(searchTerm !== '') {
      tokens = tokens.filter(token => token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || token.name.toLowerCase().includes(searchTerm.toLowerCase()) || token.address === searchTerm)
    }

    tokens = tokens.filter(t => t.reviewed).sort((a,b) => toBigNumber(a.balance??0).isGreaterThan(b.balance ?? 0) ? -1 : 1)

    return tokens
  }, [searchTerm, tokenState, swapState.availablePairs])

  const selectToken = (tokenAddress: string) => {
    if(swapState.selectedDirection === "in") {
      // dispatch(updateSwap({
      //   tokenInAddress: tokenAddress
      // }))
    } else {
      // dispatch(updateSwap({
      //   tokenOutAddress: tokenAddress
      // }))
    }
    setIsOpen(false)
  }

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">

        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 py-4 px-5 my-4 flex flex-col rounded-lg shadow-lg w-110 max-w-full max-h-screen-margin mx-auto">
              <Dialog.Title className="text-lg font-bold mb-1">Select a token</Dialog.Title>

              <div>
                <input
                  className="w-full rounded-lg py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
                  type="text"
                  placeholder="Search name or paste address"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <div className="font-semibold mb-1">Common bases</div>
                <div>
                  <div
                    className="inline-flex items-center px-2 py-1 font-semibold border dark:border-gray-700 rounded-lg mr-2 mb-2 cursor-pointer"
                    onClick={() => selectToken(ZIL_ADDRESS)}
                  >
                    <div className="w-5 h-5 mr-1"><TokenIcon address={ZIL_ADDRESS} /></div>
                    ZIL
                  </div>
                  <div
                    className="inline-flex items-center px-2 py-1 font-semibold border dark:border-gray-700 rounded-lg mr-2 mb-2 cursor-pointer"
                    onClick={() => selectToken('zil1sxx29cshups269ahh5qjffyr58mxjv9ft78jqy')}
                  >
                    <div className="w-5 h-5 mr-1"><TokenIcon address={`zil1sxx29cshups269ahh5qjffyr58mxjv9ft78jqy`} /></div>
                    zUSDT
                  </div>
                  <div
                    className="inline-flex items-center px-2 py-1 font-semibold border dark:border-gray-700 rounded-lg mr-2 mb-2 cursor-pointer"
                    onClick={() => selectToken('zil1zu72vac254htqpg3mtywdcfm84l3dfd9qzww8t')}
                  >
                    <div className="w-5 h-5 mr-1"><TokenIcon address={`zil1zu72vac254htqpg3mtywdcfm84l3dfd9qzww8t`} /></div>
                    XSGD
                  </div>
                  <div
                    className="inline-flex items-center px-2 py-1 font-semibold border dark:border-gray-700 rounded-lg mr-2 mb-2 cursor-pointer"
                    onClick={() => selectToken('zil1z5l74hwy3pc3pr3gdh3nqju4jlyp0dzkhq2f5y')}
                  >
                    <div className="w-5 h-5 mr-1"><TokenIcon address={`zil1z5l74hwy3pc3pr3gdh3nqju4jlyp0dzkhq2f5y`} /></div>
                    XCAD
                  </div>
                </div>
              </div>
              <div className="flex-grow overflow-y-scroll border-t dark:border-gray-700 mt-2">
                {filteredTokens.map(token => (
                  <div
                    key={token.address}
                    className="flex items-center py-2 border-b last:border-b-0 border-gray-100 dark:border-gray-800 cursor-pointer"
                    onClick={() => selectToken(token.address)}
                  >
                    <div className="w-6 h-6 mr-4"><TokenIcon address={token.address} /></div>
                    <div className="flex-grow">
                      <div className="font-semibold">{token.symbol}</div>
                      <div className="text-gray-500 dark:text-gray-400 text-sm">{token.name}</div>
                    </div>
                    <div className="font-medium">
                      {cryptoFormat(toBigNumber(token.balance??0).shiftedBy(-token.decimals??0).toNumber() ?? 0)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CurrencyModal
