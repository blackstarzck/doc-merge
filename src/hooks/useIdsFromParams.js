import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

export const useIdsFromParams = () => {
  const { documentId, organizationId, clientId, vendorId, markInfoId } = useParams()

  return useMemo(() => {
    return {
      documentId,
      organizationId: organizationId ? parseInt(organizationId) : null,
      clientId: clientId ? parseInt(clientId) : null,
      vendorId: vendorId ? parseInt(vendorId) : null,
      markInfoId: markInfoId ? parseInt(markInfoId) : null,
    }
  }, [documentId, organizationId, clientId, vendorId, markInfoId]) // 생략 가능
}