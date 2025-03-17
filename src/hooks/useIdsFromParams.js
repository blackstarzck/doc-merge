import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

export const useIdsFromParams = () => {
  const { documentId, organizationId, clientId, vendorId, markInfoId } = useParams()

  return useMemo(() => {
    return {
      documentId,
      organizationId: parseInt(organizationId),
      clientId: parseInt(clientId),
      vendorId: parseInt(vendorId),
      markInfoId: parseInt(markInfoId),
    }
  }, [documentId, organizationId, clientId, vendorId, markInfoId]) // 생략 가능
}
