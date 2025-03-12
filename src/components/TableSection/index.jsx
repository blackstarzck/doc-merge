import { themeQuartz } from "ag-grid-community"
import { AgGridReact } from "ag-grid-react"
import { Button, message } from "antd"
import { DateTime } from "luxon"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import useCurrentDocumentColumns from "../../hooks/useCurrentDocumentColumns"
import { useDocumentId } from "../../hooks/useDocumentId"
import {
  deleteDocument,
  getDocument,
  postDocument,
  selectAllDocuments,
} from "../../store/document/documentSlice"
import { selectNameById } from "../../store/organizationNames/organizationNamesSlice"
import ActionHandler from "../ActionHandler"

const myTheme = themeQuartz.withParams({
  borderColor: "#d5d5eb",
  wrapperBorder: false,
  headerRowBorder: false,
  rowBorder: { style: "solid", width: 1 },
  columnBorder: { style: "solid" },
});

const numberFormatter = (value) =>
  value ? value.toLocaleString("en-US") : null
const dateFormatter = (value) => {
  const jsDate = new Date(value)
  const dt = DateTime.fromJSDate(jsDate)
  return dt.toFormat("yyyy-MM-dd")
}

const TableSection = () => {
  const { documentId, organizationId } = useDocumentId()
  const currentDocumentColumns = useCurrentDocumentColumns()
  const dispatch = useDispatch()
  const gridRef = useRef()
  const [rowData, setRowData] = useState([])
  const [columnDefs, setColumnDefs] = useState([])
  const [selected, setSelectedRows] = useState([])
  const [messageApi, contextHolder] = message.useMessage()
  const { loading: getLoading, error: getError } = useSelector(
    (state) => state.document.get
  )
  const { loading: postLoading, error: postError } = useSelector(
    (state) => state.document.post
  )
  const { loading: deleteLoading, error: deleteError } = useSelector(
    (state) => state.document.delete
  )
  const document = useSelector(selectAllDocuments)
  const org = useSelector((state) =>
    organizationId ? selectNameById(state, organizationId) : null
  )
  const count = useRef(0)
  const theme = useMemo(() => {
    return myTheme;
  }, []);

  const defaultColDef = useMemo(() => (
    {
      editable: true,
      enableCellChangeFlash: true,
      filter: true,
    }
  ), []);

  useEffect(() => {
    setColumnDefs(
      currentDocumentColumns.map((column) => {
        return {
          field: column.key,
          headerName: column.name,
          hide: column.hide,
          cellDataType: column.type,
          editable: column.editable,
          suppressNavigable: column.suppressNavigable,
          tooltipValueGetter: (p) =>
            p.value
              ? column.calc
                ? `${column.calc?.text} = ${numberFormatter(p.value)}`
                : null
              : null,
          valueFormatter: (params) => {
            if (column.type === "number" && params.value) {
              return numberFormatter(params.value)
            }
            if (column.type === "date" && params.value) {
              return dateFormatter(params.value)
            }
            if (!params.value) {
              return ""
            }
          },
        }
      })
    )
  }, [currentDocumentColumns])

  useEffect(() => {
    const copy = structuredClone(document)
    setRowData(copy)
  }, [document])

  useEffect(() => {
    count.current = 0 // 초기화
    dispatch(
      getDocument({
        path: documentId || "organizations",
        documentId: organizationId || "",
      })
    )
      .then((res) => {
        const data = res.payload ? structuredClone(res.payload) : []
        const dateTypesColumns = currentDocumentColumns
          .filter((item) => item.type === "date")
          .map((item) => item.key)

        data.map((item) => {
          dateTypesColumns.forEach((column) => {
            item[column] = item[column] ? new Date(item[column]) : null
          })
          return item
        })

        setRowData(data)
      })
      .catch((error) => console.error("Failed to load data", error))
  }, [documentId, organizationId, currentDocumentColumns, dispatch])

  const createOneDocumentRecord = useCallback(() => {
    const record = currentDocumentColumns.reduce((acc, column) => {
      acc[column.key] = "" // 모든 필드를 null로 초기화
      return acc
    }, {})
    return record
  }, [currentDocumentColumns])

  const onAddRow = () => {
    const newRecord = createOneDocumentRecord()
    count.current++
    newRecord.id = `temp-${count.current}`
    if (organizationId) {
      newRecord.sheet_name = org.name
      newRecord.sheet_data_num = org.id
    }

    console.log("newRecord: ", newRecord)
    gridRef.current.api.applyTransaction({ add: [newRecord] })
  }

  const onRemoveRows = () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes()
    const selecteDatas = selectedNodes.map((node) => node.data)

    const ids = selecteDatas
      .filter((data) => typeof data.id === "number")
      .map((data) => data.id)

    dispatch(
      deleteDocument({
        path: documentId || "organizations",
        documentId: organizationId || "",
        ids,
      })
    )
      .then((res) => {
        console.log("After delete data", res)
        if (res.type.includes("rejected")) {
          messageApi.open({
            type: "error",
            content: `삭제를 실패하였습니다.`,
          })
        } else {
          const copy = structuredClone(res.payload)
          setSelectedRows([])
          setRowData(copy)
          messageApi.open({ type: "success", content: "삭제되었습니다." })
        }

        gridRef.current.api.applyTransaction({ remove: selecteDatas })
      })
      .catch((error) => {
        console.log("delete error: ", error)
        messageApi.open({
          type: "error",
          content: `삭제를 실패하였습니다.`,
        })
      })
  }

  const onCellValueChanged = useCallback((event) => {
    const { data, colDef } = event
    console.log("[onCellValueChanged] event: ", event)

    gridRef.current.api.applyTransaction({ update: [data] })
  }, [])

  const onRowSelected = useCallback((event) => {
    const datas = event.api.getSelectedNodes().map((node) => node.data)
    console.log("[onRowSelected] event: ", datas)
    setSelectedRows(datas.map((data) => data.id))
  }, [])

  const onSave = () => {
    const rowData = []
    const editingCells = gridRef.current.api.getEditingCells()

    if (editingCells.length > 0) {
      editingCells.forEach((cell) => {
        const rowNode = gridRef.current.api.getDisplayedRowAtIndex(
          cell.rowIndex
        )
        const colId = cell.column.getColId()
        const newValue = gridRef.current.api
          .getCellEditorInstances({
            rowNodes: [rowNode],
            columns: [cell.column],
          })[0]
          ?.getValue() // 입력 박스 값 가져오기

        if (newValue !== undefined) {
          rowNode.setDataValue(colId, newValue) // 셀 값 업데이트
        }
      })
      gridRef.current.api.stopEditing() // 모든 편집 종료
    }

    gridRef.current.api.forEachNode((node) => {
      let cnt = 0
      for (const key in node.data) {
        if (!node.data[key]) cnt++
      }
      // -1은 id를 제외한 필드의 개수
      if (cnt <= Object.keys(node.data).length - 1) {
        delete node.data.id
        rowData.push(node.data)
      }
    })
    dispatch(
      postDocument({
        path: documentId || "organizations",
        documentId: organizationId || "",
        document: rowData,
      })
    )
      .then((res) => {
        if (res.type.includes("rejected")) {
          console.log("rejected: ", res)
          messageApi.open({
            type: "error",
            content: `저장을 실패하였습니다. 콘솔로그를 확인해주세요.`,
          })
        } else {
          const copy = structuredClone(res.payload)
          setRowData(copy)
          console.log("after success : ", res)
          gridRef.current.api.deselectAll()
          messageApi.open({ type: "success", content: "저장되었습니다." })
        }
      })
      .catch((error) => {
        console.log("post error: ", error)
        messageApi.open({
          type: "error",
          content: `저장을 실패하였습니다. 콘솔로그를 확인해주세요.`,
        })
      })
      .finally(() => setSelectedRows([]))
  }

  const getRowId = useCallback((params) => {
    return String(params.data.id)
  }, [])

  return (
    <Wrapper>
      <AgGridReact
      theme={theme}
        loading={getLoading || postLoading || deleteLoading}
        getRowId={getRowId}
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        rowSelection={{
          mode: "multiRow",
        }}
        defaultColDef={defaultColDef}
        resetRowDataOnUpdate={true}
        animateRows={true}
        onCellValueChanged={onCellValueChanged}
        onSelectionChanged={onRowSelected}
        tooltipShowDelay={500}
        // onGridReady={onGridReady}
      />
      <ButtonWrapper
        size="mdeium"
        variant="outlined"
        color="default"
        onClick={onAddRow}
      >
        Add a row +
      </ButtonWrapper>
      {contextHolder}
      <ActionHandler
        columns={columnDefs}
        rowData={rowData}
        selected={selected}
        onRemoveRows={onRemoveRows}
        onSave={onSave}
      />
    </Wrapper>
  )
}

export default TableSection

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  gap: 18px;
  flex-direction: column;
  height: 100%;
`

const ButtonWrapper = styled(Button)`
  width: 100%;
`
