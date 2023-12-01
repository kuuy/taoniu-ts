import { Space } from '~/src/types/space'

export default async function getGovernanceSpaces(): Promise<{[id: string]: Space}> {
  const res = await fetch('https://governance-api.zilliqa.com/api/spaces')
  return await res.json()
}
