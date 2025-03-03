import { useMemo } from "react";
import { useParams } from "react-router-dom";

export const useDocumentId = () => {
  const { documentId } = useParams();
  return useMemo(() => documentId, [documentId]); // 생략 가능
};
