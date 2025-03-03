import { AgGridReact } from "ag-grid-react";
import { Button } from "antd";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import useCurrentDocumentColumns from "../../hooks/useCurrentDocumentColumns";
import { useDocumentId } from "../../hooks/useDocumentId";
import {
  getDocument,
  selectAllDocuments,
  updateDocument,
} from "../../store/document/documentSlice";
import ActionHandler from "../ActionHandler";

// dataArray 변환 함수
const transformDataArray = (dataArray, nameArray, lang) => {
  // 키-이름 매핑 객체 생성
  const keyToNameMap = nameArray.reduce((acc, { key, name }) => {
    if (lang === "kr") acc[key] = name;
    else acc[name] = key;
    return acc;
  }, {});

  return dataArray.map((item) => {
    const transformedItem = {};
    for (const key in item) {
      if (keyToNameMap[key]) {
        transformedItem[keyToNameMap[key]] = item[key]; // 매핑된 이름으로 키 변경
      } else {
        transformedItem[key] = item[key]; // 매핑 없는 키 유지 (선택적)
      }
    }
    return transformedItem;
  });
};

const TableSection = () => {
  const documentId = useDocumentId();
  const currentDocumentColumns = useCurrentDocumentColumns();
  const document = useSelector(selectAllDocuments);
  const dispatch = useDispatch();
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [sequence, setSequence] = useState(0);

  useEffect(() => {
    setRowData(transformDataArray(document, currentDocumentColumns, "kr"));
  }, [document]);

  useEffect(() => {
    setColumnDefs(
      currentDocumentColumns.map((column) => ({
        field: column.name,
      }))
    );
  }, [currentDocumentColumns]);

  useEffect(() => {
    dispatch(getDocument({ documentId }));
  }, [dispatch, documentId]);

  const createOneDocumentRecord = useCallback(() => {
    // 기본 레코드 생성: currentDocumentColumns에서 키 가져옴
    const record = currentDocumentColumns.reduce((acc, column) => {
      acc[column.name] = null; // 모든 필드를 null로 초기화
      return acc;
    }, {});
    record.id = `temp-${sequence}`; // 고유 ID 설정
    setSequence((prev) => prev + 1);
    return record;
  }, [currentDocumentColumns, sequence]);

  const onAddRow = () => {
    const newRecord = createOneDocumentRecord();
    const result = gridRef.current.api.applyTransaction({ add: [newRecord] });
  };

  const onRemoveRow = () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selecteData = selectedNodes.map((node) => node.data);
    const result = gridRef.current.api.applyTransaction({
      remove: selecteData,
    });
    console.log("[onRemoveRow] res: ", result.remove[0].data);
  };

  const onSave = () => {
    const rowData = [];
    gridRef.current.api.forEachNode((node) => {
      if (typeof node.data.id === "number") rowData.push(node.data);
    });

    console.log(
      "[onSave] rowData: ",
      transformDataArray(rowData, currentDocumentColumns, "en")
    );
  };

  const handleCellValueChanged = useCallback((event) => {}, []);

  const getRowId = useCallback((params) => {
    return params.data.id;
  }, []);

  return (
    <Wrapper>
      <AgGridReact
        enableCellChangeFlash={true}
        getRowId={getRowId}
        rowSelection={"multiple"}
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{ editable: true }}
        animateRows={true}
        onCellValueChanged={handleCellValueChanged}
      />
      <ButtonWrapper
        size="mdeium"
        variant="outlined"
        color="default"
        onClick={onAddRow}
      >
        Add a row +
      </ButtonWrapper>
      <ActionHandler onRemoveRow={onRemoveRow} onSave={onSave} />
    </Wrapper>
  );
};

export default TableSection;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  gap: 18px;
  flex-direction: column;
  height: 100%;
`;

const ButtonWrapper = styled(Button)`
  width: 100%;
`;
