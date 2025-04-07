import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

export const useIdsFromParams = () => {
  const { documentId, organizationId, clientId, vendorId, markClientId } = useParams()

  return useMemo(() => {
    return {
      documentId,
      organizationId: organizationId ? parseInt(organizationId) : null,
      clientId: clientId ? parseInt(clientId) : null,
      vendorId: vendorId ? parseInt(vendorId) : null,
      markClientId: markClientId ? parseInt(markClientId) : null,
    }
  }, [documentId, organizationId, clientId, vendorId, markClientId]) // 생략 가능
}
