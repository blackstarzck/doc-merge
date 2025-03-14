import { useMemo } from 'react'

import { TABLE_COLUMNS } from '../constants/menu'
import { useIdsFromParams } from './useIdsFromParams'

const useCurrentDocumentColumns = () => {
  const { documentId, organizationId, clientId, vendorId } = useIdsFromParams()

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
    }

    const columns = TABLE_COLUMNS.find((table) => table.key === key)?.columns
    return columns
  }, [documentId, organizationId, clientId, vendorId])
}

export default useCurrentDocumentColumns
