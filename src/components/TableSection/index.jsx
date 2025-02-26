import { Button, Input, Table } from "antd"
import throttle from "lodash.throttle"
import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import useSWR from "swr"

import { useSheetId } from "../../hooks/useSheetId"
import fetcher from "../../lib/fetcher"
import { setSelectedRow } from "../../store/selectedRows/selectedRowIdSlice"
import { EditableCell, EditableRow } from "./Editable"

const ROW_HEIGHT = 55
const FOOTER_HEIGHT = 65
const HEADER_HEIGHT = 55
const TableSection = () => {
  const sheetId = useSheetId()

  console.log("[TableSection] sheetId: ", sheetId)

  const { data, error, mutate } = useSWR(`/sheets/${sheetId}/data`, fetcher)
  const [dataSource, setDataSource] = useState([
    {
      key: "0",
      name: "Edward King 0",
      age: "32",
      address: "London, Park Lane no. 0",
    },
    {
      key: "1",
      name: "Edward King 1",
      age: "33",
      address: "London, Park Lane no. 1",
    },
  ])
  const [rows, setRows] = useState(0)
  const [count, setCount] = useState(2)
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

  useEffect(() => {
    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const defaultColumns = [
    {
      title: "name",
      dataIndex: "name",
      editable: true,
      fixed: "left",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "age",
      dataIndex: "age",
      editable: true,
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "address",
      dataIndex: "address",
      editable: true,
      // filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => {
        return record.address.startsWith(value)
      },
      filters: [
        {
          text: "London, Park Lane no. 0",
          value: "London, Park Lane no. 0",
        },
        {
          text: "London, Park Lane no. 1",
          value: "London, Park Lane no. 1",
        },
      ],
    },
  ]

  const handleAdd = () => {
    const newData = {
      key: count,
      name: "-",
      age: "-",
      address: "-",
    }
    setDataSource([...dataSource, newData])
    setCount(count + 1)
  }

  const handleSave = (row) => {
    const newData = [...dataSource]
    const index = newData.findIndex((item) => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      ...row,
    })
    setDataSource(newData)
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  }

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record) => {
        return {
          // EditableCell 컴포넌트에 props로 전달됨
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave,
        }
      },
    }
  })

  return (
    <Wrapper ref={containerRef}>
      <Table
        bordered
        tableLayout="auto"
        pagination={false}
        scroll={{ x: "max-content", y: ROW_HEIGHT * rows }}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(
              `selectedRowKeys: ${selectedRowKeys}`,
              "selectedRows: ",
              selectedRows
            )
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
        components={components}
        dataSource={dataSource}
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
