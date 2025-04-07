import { useMemo } from 'react'

import { TABLE_COLUMNS } from '../constants/tables'
import { useIdsFromParams } from './useIdsFromParams'

const useDefaultColumns = () => {
  const { documentId, organizationId, clientId, vendorId, markClientId } = useIdsFromParams()

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
    } else if (markClientId) {
      key = 'mark_status'
    }

    const columns = TABLE_COLUMNS.find((table) => table.key === key)?.columns
    return columns
  }, [documentId, organizationId, clientId, vendorId, markClientId])
}

export default useDefaultColumns
