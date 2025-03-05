import { useMemo } from "react";
import { useParams } from "react-router-dom";

export const useDocumentId = () => {
  const { documentId, organizationId } = useParams();
  console.log("param id: ", { documentId, organizationId });

  return useMemo(() => {
    return { documentId, organizationId };
  }, [documentId, organizationId]); // 생략 가능
};
