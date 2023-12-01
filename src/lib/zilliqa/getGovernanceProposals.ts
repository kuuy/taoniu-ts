import { Proposal } from '~/src/types/proposal'

export default async function getGovernanceProposals(symbol: string): Promise<{[id: string]: Proposal}> {
  const res = await fetch(`https://governance-api.zilliqa.com/api/${symbol}/proposals`)
  return await res.json()
}
