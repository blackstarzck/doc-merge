import { useParams } from "react-router-dom"

export const useOrganizationId = () => {
  const { organizationtId } = useParams()
  return organizationtId
}
