import { NftCollection } from '~/src/types/collection'
import { BatchResponse, nftCollectionStateBatchRequest, sendBatchRequest } from '~/src/utils/batch'

export default async function getCollectionsOwnerStates(collections: NftCollection[]): Promise<BatchResponse[]> {
  var requests: any[] = [];

  collections.forEach(collection => {
    requests.push(nftCollectionStateBatchRequest(collection))
  })

  return await sendBatchRequest(requests);
}
