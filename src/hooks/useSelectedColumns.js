import { OVERVIEW_TABLES } from "../constants/menu"
import { useDocumentId } from "./useDocumentId"

const useSelectedColumns = () => {
  const documentId = useDocumentId()
  const columns = OVERVIEW_TABLES.find(
    (table) => table.key === documentId
  )?.columns
  return columns
}

export default useSelectedColumns
