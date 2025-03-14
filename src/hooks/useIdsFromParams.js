import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

export const useIdsFromParams = () => {
  const { documentId, organizationId, clientId, vendorId } = useParams()

  return useMemo(() => {
    return { documentId, organizationId: parseInt(organizationId), clientId: parseInt(clientId), vendorId: parseInt(vendorId) }
  }, [documentId, organizationId, clientId, vendorId]) // 생략 가능
}
