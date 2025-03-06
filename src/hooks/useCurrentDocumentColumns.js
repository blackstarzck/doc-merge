import { useMemo } from "react"

import { ORGANIZATION_COLUMNS, OVERVIEW_TABLES } from "../constants/menu"
import { useDocumentId } from "./useDocumentId"

const useCurrentDocumentColumns = () => {
  const { documentId } = useDocumentId()
  return useMemo(() => {
    return documentId
      ? OVERVIEW_TABLES.find((table) => table.key === documentId)?.columns
      : ORGANIZATION_COLUMNS
  }, [documentId])
}

export default useCurrentDocumentColumns
