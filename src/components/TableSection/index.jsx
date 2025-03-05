import { AgGridReact } from "ag-grid-react"
import { Button, message } from "antd"
import { DateTime } from "luxon"
import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"

import useCurrentDocumentColumns from "../../hooks/useCurrentDocumentColumns"
import { useDocumentId } from "../../hooks/useDocumentId"
import {
  deleteDocument,
  getDocument,
  updateDocument,
} from "../../store/document/documentSlice"
import ActionHandler from "../ActionHandler"

const numberFormatter = (value) => value.toLocaleString("en-US")
const dateFormatter = (value) => {
  const jsDate = new Date(value)
  const dt = DateTime.fromJSDate(jsDate)
  return dt.toFormat("yyyy-MM-dd")
}

const TableSection = () => {
  const documentId = useDocumentId()
  const currentDocumentColumns = useCurrentDocumentColumns()
  const dispatch = useDispatch()
  const gridRef = useRef()
  const [rowData, setRowData] = useState([])
  const [columnDefs, setColumnDefs] = useState([])
  const [sequence, setSequence] = useState(0)
  const [loading, setLoading] = useState(true)
  const [selected, setSelectedRows] = useState([])

  useEffect(() => {
    setColumnDefs(
      currentDocumentColumns.map((column) => {
        return {
          field: column.key,
          headerName: column.name,
          cellDataType: column.type,
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
    setLoading(true)
    dispatch(getDocument({ documentId }))
      .then((res) => {
        const data = structuredClone(res.payload)
        const dateTypesColumns = currentDocumentColumns
          .filter((item) => item.type === "date")
          .map((item) => item.key)

        data.map((item) => {
          dateTypesColumns.forEach((column) => {
            item[column] = item[column] ? new Date(item[column]) : null
          })
          return item
        })

        console.log("data: ", data)
        setRowData(data)
      })
      .catch((error) => console.error("Failed to load data", error))
      .finally(() => setLoading(false))
  }, [documentId])

  const createOneDocumentRecord = useCallback(() => {
    const record = currentDocumentColumns.reduce((acc, column) => {
      acc[column.name] = "" // 모든 필드를 null로 초기화
      return acc
    }, {})
    record.id = `temp-${sequence}` // 고유 ID 설정
    setSequence((prev) => prev + 1)
    return record
  }, [currentDocumentColumns, sequence])

  const onAddRow = () => {
    const newRecord = createOneDocumentRecord()
    gridRef.current.api.applyTransaction({ add: [newRecord] })
  }

  const onRemoveRows = () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes()
    const selecteDatas = selectedNodes.map((node) => node.data)

    const ids = selecteDatas
      .filter((data) => typeof data.id === "number")
      .map((data) => data.id)

    setLoading(true)
    dispatch(deleteDocument({ documentId, ids }))
      .then((res) => {
        console.log("After delete data", res)
        setSelectedRows([])
        message.success("삭제되었습니다.")
        gridRef.current.api.applyTransaction({ remove: selecteDatas })
      })
      .catch((error) => message.error("저장을 실패하였습니다. ", error.message))
      .finally(() => setLoading(false))
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
    gridRef.current.api.forEachNode((node) => {
      if (typeof node.data.id === "number") rowData.push(node.data)
    })

    console.log("[onSave] rowData: ", rowData)

    const editingCells = gridRef.current.api.getEditingCells()
    console.log("editingCells: ", editingCells)
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
    setLoading(true)
    dispatch(updateDocument({ documentId, document: rowData }))
      .then((res) => {
        gridRef.current.api.deselectAll()
        message.success("저장되었습니다.")
      })
      .catch((error) => {
        console.log("error: ", error)
        message.error("저장을 실패하였습니다. ", error.message)
      })
      .finally(() => {
        setLoading(false)
        setSelectedRows([])
      })
  }

  const getRowId = useCallback((params) => {
    return String(params.data.id)
  }, [])

  return (
    <Wrapper>
      <AgGridReact
        loading={loading}
        getRowId={getRowId}
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        rowSelection={{
          mode: "multiRow",
        }}
        defaultColDef={{
          editable: true,
          enableCellChangeFlash: true,
          filter: true,
        }}
        resetRowDataOnUpdate={true}
        animateRows={true}
        onCellValueChanged={onCellValueChanged}
        onSelectionChanged={onRowSelected}
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
      <ActionHandler
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
