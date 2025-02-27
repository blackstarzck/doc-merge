import { useParams } from "react-router-dom"

export const useDocumentId = () => {
  const { documentId } = useParams()
  return documentId
}
