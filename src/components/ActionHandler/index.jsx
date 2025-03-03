import { Button } from "antd";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { useDocumentId } from "../../hooks/useDocumentId";
import { updateDocument } from "../../store/document/documentSlice";

const ActionHandler = ({ onRemoveRow, onSave }) => {
  return (
    <Wrapper>
      <Button size="large" danger type="text" onClick={onRemoveRow}>
        삭제
      </Button>
      <Button
        size="large"
        type="primary"
        onClick={() => {
          onSave();
          // dispatch(updateDocument({ documentId, document }))
        }}
      >
        저장
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export default ActionHandler;
