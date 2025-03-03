import { useMemo } from "react";

import { OVERVIEW_TABLES } from "../constants/menu";
import { useDocumentId } from "./useDocumentId";

const useCurrentDocumentColumns = () => {
  const documentId = useDocumentId();
  return useMemo(() => {
    return OVERVIEW_TABLES.find((table) => table.key === documentId)?.columns;
  }, [documentId]);
};

export default useCurrentDocumentColumns;
