import { Snapshot } from '~/src/types/snapshot'

export default async function getGovernanceSnapshot(hash: string): Promise<Snapshot> {
  const res = await fetch(`https://gateway.pinata.cloud/ipfs/${hash}`)
  return await res.json()
}
