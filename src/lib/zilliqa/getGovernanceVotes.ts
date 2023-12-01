import { Vote } from '~/src/types/vote'

export default async function getGovernanceVotes(symbol: string, hash: string): Promise<{[id: string]: Vote}> {
  const res = await fetch(`https://governance-api.zilliqa.com/api/${symbol}/proposal/${hash}`)
  return await res.json()
}
