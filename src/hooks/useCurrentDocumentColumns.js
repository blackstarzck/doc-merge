import { useMemo } from 'react'

import { TABLE_COLUMNS } from '../constants/menu'
import { useIdsFromParams } from './useIdsFromParams'

const useCurrentDocumentColumns = () => {
  const { documentId, organizationId, clientId, vendorId, markInfoId } = useIdsFromParams()
  console.log({ documentId, organizationId, clientId, vendorId, markInfoId })
  return useMemo(() => {
    let key = null

    if (documentId) {
      key = documentId
    } else if (organizationId) {
      key = 'organization'
    } else if (clientId) {
      key = 'client_ledger'
    } else if (vendorId) {
      key = 'vendor_ledger'
    } else if (markInfoId) {
      key = 'mark_status'
    }
    console.log('key: ', key)

    const columns = TABLE_COLUMNS.find((table) => table.key === key)?.columns
    console.log('columns: ', columns)
    return columns
  }, [documentId, organizationId, clientId, vendorId, markInfoId])
}

export default useCurrentDocumentColumns
