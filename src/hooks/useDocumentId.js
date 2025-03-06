import { useMemo } from "react"
import { useParams } from "react-router-dom"

export const useDocumentId = () => {
  const { documentId, organizationId } = useParams()

  // console.log("useDocumentId: ", documentId, organizationId)

  return useMemo(() => {
    return { documentId, organizationId: Number(organizationId) }
  }, [documentId, organizationId]) // 생략 가능
}
