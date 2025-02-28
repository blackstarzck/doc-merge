import { Button, Input, Table } from "antd"
import isEqual from "lodash.isequal"
import throttle from "lodash.throttle"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import useSWR from "swr"

import { useDocumentId } from "../../hooks/useDocumentId"
import useSelectedColumns from "../../hooks/useSelectedColumns"
import fetcher from "../../lib/fetcher"
import { setDocument } from "../../store/document/documentSlice"
import { setSelectedRow } from "../../store/selectedRows/selectedRowIdSlice"
import { EditableCell, EditableRow } from "./Editable"

const ROW_HEIGHT = 55
const FOOTER_HEIGHT = 65
const HEADER_HEIGHT = 55

const TableSection = () => {
  const documentId = useDocumentId()
  const selectedColumns = useSelectedColumns()
  const { data, error, mutate } = useSWR(`/${documentId}`, fetcher)
  const [dataSource, setDataSource] = useState([])
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState(0) // 화면이 resize 될 때 마다 Table 컴포넌트 옵션으로 넣어줘야 overflow-y 스크롤이 생김 (row 갯수 필수 옵션임...)
  const [count, setCount] = useState(2) // Add a row 버튼 클릭 시 key 값으로 사용
  const containerRef = useRef(null)
  const dispatch = useDispatch()

  const handleResize = useCallback(
    throttle(() => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight
        const calcHeight = containerHeight - (FOOTER_HEIGHT + HEADER_HEIGHT)
        const newRows = Math.floor(calcHeight / ROW_HEIGHT)

        setRows(() => newRows)
      }
    }, 1000),
    []
  )

  const handleSave = useCallback((row) => {
    setDataSource((prevData) => {
      const index = prevData.findIndex((item) => item.id === row.id)

      if (index > -1) {
        const copy = [...prevData]
        const match = prevData.find((item) => item.id === row.id)
        const newRow = { ...match, ...row }

        copy.splice(index, 1, newRow)
        return copy
      }
      return prevData
    })
  }, [])

  const generateColumns = useCallback((data, selectedColumns, handleSave) => {
    const filterMap = {}
    data?.forEach((row) => {
      selectedColumns.forEach((column) => {
        const key = column.key
        if (row[key]) {
          filterMap[key] = filterMap[key] || new Set()
          filterMap[key].add(row[key])
        }
      })
    })

    return selectedColumns.map((column) => {
      const filters = filterMap[column.key]
        ? Array.from(filterMap[column.key]).map((value) => ({
            text: value,
            value,
          }))
        : []
      const baseColumn = {
        editable: true,
        title: column.name,
        dataIndex: column.key,
        sorter: (a, b) => {},
        filter: (value, record) => {},
        filters,
        shouldCellUpdate: (record, prevRecord) => !isEqual(record, prevRecord),
      }
      return baseColumn
      // return baseColumn.editable
      //   ? {
      //       ...baseColumn,
      //       onCell: (record) => ({
      //         key: record.key,
      //         record,
      //         editable: baseColumn.editable,
      //         dataIndex: baseColumn.dataIndex,
      //         title: baseColumn.title,
      //         handleSave,
      //       }),
      //     }
      //   : baseColumn
    })
  }, [])

  useEffect(() => {
    if (!dataSource.length && data) setDataSource(data)

    const newColumns = generateColumns(data, selectedColumns, handleSave)
    setColumns(newColumns)
  }, [data, selectedColumns, handleSave])

  useEffect(() => {
    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (dataSource.length > 0 && data) {
      console.log("Data: ", data)
      dispatch(setDocument(data))
    }
  }, [dataSource])

  const handleAdd = () => {
    const newData = { id: `temp-${count}` }

    for (const elem of selectedColumns) {
      newData[elem.key] = ""
    }

    setDataSource([...dataSource, newData])
    setCount(count + 1)
  }

  const components = useMemo(
    () => ({
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    }),
    []
  )

  console.log(
    `dataSource: ${dataSource.length}, 
    columns: ${columns.length}, 
    selectedColumns: ${selectedColumns.length}, 
    documentId: ${documentId}`
  )

  return (
    <Wrapper ref={containerRef}>
      <Table
        bordered
        pagination={false}
        tableLayout="auto"
        shouldCellUpdate
        scroll={{ x: 8000, y: ROW_HEIGHT * rows }}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys, selectedRows) => {
            console.log("selectedRows: ", selectedRowKeys.join(", "))
            dispatch(setSelectedRow(selectedRows))
          },
          getCheckboxProps: (record) => {
            return {
              disabled: record.name === "Disabled User",
              // Column configuration not to be checked
              name: record.name,
            }
          },
        }}
        // components={components}
        dataSource={dataSource.map((item) => ({
          ...item,
          key: item.id,
        }))}
        columns={columns}
        rowClassName={() => "editable-row"}
        footer={() => (
          <ButtonWrapper variant="outlined" color="default" onClick={handleAdd}>
            Add a row +
          </ButtonWrapper>
        )}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1;
  overflow: hidden;

  .ant-table {
    .ant-table-container {
      .ant-table-body,
      .ant-table-content {
        scrollbar-width: thin;
        scrollbar-color: #eaeaea transparent;
        scrollbar-gutter: stable;
      }
    }
  }

  & .ant-table-footer {
    background-color: transparent !important;
  }
`

const ButtonWrapper = styled(Button)`
  width: 100%;
`

export default TableSection
