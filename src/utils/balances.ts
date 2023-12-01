import getZRCBalance from '~/src/lib/zilliqa/getZRCBalance'
import { Token } from '~/src/types/token'
import { Balance } from '~/src/types/balance'

export async function getBalancesForTokens(walletAddress: string, tokens: Token[]): Promise<Balance[]> {
  var balances: Balance[] = []


  tokens.forEach(async token => {
    let balance = await getZRCBalance(
      token.address,
      walletAddress
    )
    balances.push({
      tokenAddress: token.address,
      balance: balance ? (balance * Math.pow(10, -token.decimals)) : 0
    })
  })

  return balances
}
