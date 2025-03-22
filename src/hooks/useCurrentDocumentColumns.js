import { useMemo } from 'react'

import { TABLE_COLUMNS } from '../constants/tables'
import { useIdsFromParams } from './useIdsFromParams'

const useCurrentDocumentColumns = () => {
  const { documentId, organizationId, clientId, vendorId, markInfoId } = useIdsFromParams()

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

    const columns = TABLE_COLUMNS.find((table) => table.key === key)?.columns
    return columns
  }, [documentId, organizationId, clientId, vendorId, markInfoId])
}

export default useCurrentDocumentColumns
