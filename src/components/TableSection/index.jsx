import { AgGridReact } from "ag-grid-react"
import { Button } from "antd"
import { DateTime } from "luxon"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"

import useCurrentDocumentColumns from "../../hooks/useCurrentDocumentColumns"
import { useDocumentId } from "../../hooks/useDocumentId"
import { getDocument, updateDocument } from "../../store/document/documentSlice"
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
    dispatch(getDocument({ documentId })).then((res) => {
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
  }, [documentId])

  const createOneDocumentRecord = useCallback(() => {
    // 기본 레코드 생성: currentDocumentColumns에서 키 가져옴
    const record = currentDocumentColumns.reduce((acc, column) => {
      acc[column.name] = null // 모든 필드를 null로 초기화
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

  const onRemoveRow = () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes()
    const selecteData = selectedNodes.map((node) => node.data)
    const result = gridRef.current.api.applyTransaction({
      remove: selecteData,
    })
    console.log("[onRemoveRow] res: ", result.remove[0].data)
  }

  const onSave = () => {
    const rowData = []
    gridRef.current.api.forEachNode((node) => {
      if (typeof node.data.id === "number") rowData.push(node.data)
    })

    console.log("[onSave] rowData: ", rowData)

    dispatch(updateDocument({ documentId, document: rowData }))
  }

  const handleCellValueChanged = useCallback((event) => {
    console.log("[handleCellValueChanged] event: ", event)
  }, [])

  const getRowId = useCallback((params) => {
    return String(params.data.id)
  }, [])

  return (
    <Wrapper>
      <AgGridReact
        getRowId={getRowId}
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        rowSelection={"multiple"}
        defaultColDef={{
          editable: true,
          enableCellChangeFlash: true,
          filter: true,
        }}
        animateRows={true}
        onCellValueChanged={handleCellValueChanged}
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
      <ActionHandler onRemoveRow={onRemoveRow} onSave={onSave} />
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
