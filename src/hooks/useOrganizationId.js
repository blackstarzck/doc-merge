import { useMemo } from "react"
import { useParams } from "react-router-dom"

export const useOrganizationId = () => {
  const { organizationtId } = useParams()
  return useMemo(() => {
    return organizationtId
  }, [organizationtId])
}
