import React from 'react'
import { Transaction } from '~/src/types/transaction'
import TransactionRow from './TransactionRow'

interface Props {
  transactions: Transaction[]
}

const TransactionsGroup = (props: Props) => {
  return (
    <>
      {props.transactions.map(transaction => {
        return <TransactionRow key={transaction.hash} transaction={transaction} />
      })}
    </>
  )
}

export default TransactionsGroup

