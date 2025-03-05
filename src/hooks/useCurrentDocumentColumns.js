import { useMemo } from "react";

import { OVERVIEW_TABLES } from "../constants/menu";
import { useDocumentId } from "./useDocumentId";

const useCurrentDocumentColumns = () => {
  const { documentId } = useDocumentId();
  return useMemo(() => {
    return documentId
      ? OVERVIEW_TABLES.find((table) => table.key === documentId)?.columns
      : OVERVIEW_TABLES.find((table) => table.key === "organization").columns;
  }, [documentId]);
};

export default useCurrentDocumentColumns;
