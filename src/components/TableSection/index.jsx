import './styles.css'

import { themeQuartz } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { Empty, Flex } from 'antd'
import { Button, message, notification } from 'antd'
import { DateTime } from 'luxon'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { TABLE_COLUMNS } from '../../constants/tables'
import { useIdsFromParams } from '../../hooks/useIdsFromParams'
import { selectAllClient } from '../../store/client/clientSlice'
import { deleteDocument, getDocument, postDocument, selectAllDocuments } from '../../store/document/documentSlice'
import { selectOrganizationById } from '../../store/organization/organizationSlice'
import { selectAllVendor } from '../../store/vendor/vendorSlice'
import { calculateEquation } from '../../utils/excel.util'
import ActionHandler from '../ActionHandler'

const myTheme = themeQuartz.withParams({
  borderColor: '#d5d5eb',
  wrapperBorder: false,
  headerRowBorder: false,
  rowBorder: { style: 'solid', width: 1 },
  columnBorder: { style: 'solid' },
})

const numberFormatter = (value) => (value ? value.toLocaleString('en-US') : null)
const dateFormatter = (value) => {
  const jsDate = new Date(value)
  const dt = DateTime.fromJSDate(jsDate)
  return dt.toFormat('yyyy-MM-dd')
}

const CustomPinnedRowRenderer = (props) => {
  return <span style={props.style}>{props.value}</span>
}

const TableSection = ({ viewType, currentDocumentColumns }) => {
  const { documentId, organizationId, clientId, vendorId, markClientId } = useIdsFromParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const gridRef = useRef()
  const [rowData, setRowData] = useState([])
  const [columnDefs, setColumnDefs] = useState([])
  const [selected, setSelectedRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const clients = useSelector(selectAllClient)
  const vendors = useSelector(selectAllVendor)
  const document = useSelector(selectAllDocuments)
  const org = useSelector((state) => (organizationId ? selectOrganizationById(state, organizationId) : null))
  const count = useRef(0)
  const theme = useMemo(() => myTheme, [])
  const access = useSelector((state) => state.access.code)
  const [api, notificationContextHolder] = notification.useNotification()

  const defaultColDef = useMemo(
    () => ({
      editable: true,
      enableCellChangeFlash: true,
      filter: true,
      sortable: true,
    }),
    []
  )

  const setCellEditorForAgGrid = (key) => {
    const cellEditorMap = {}
    let values = []
    switch (key) {
      case 'admin_contact':
      case 'lib_contact':
      case 'notes':
        cellEditorMap.cellEditor = 'agLargeTextCellEditor'
        cellEditorMap.cellEditorPopup = true
        cellEditorMap.cellEditorParams = {
          rows: 3,
        }
        break
      case 'outsourcing_company':
        values = vendors.map((item) => item.name)
        cellEditorMap.cellEditor = 'agSelectCellEditor'
        cellEditorMap.cellEditorParams = { values: [...values, '없음'] }
        break
      case 'parent_company':
        values = clients.map((item) => item.name)
        cellEditorMap.cellEditor = 'agSelectCellEditor'
        cellEditorMap.cellEditorParams = { values: [...values, '없음'] }
        break
      default:
        cellEditorMap.cellEditor = null
        break
    }
    return cellEditorMap
  }

  const setColumnDefProps = useCallback(
    (col) => {
      return {
        pinned: col.pinned || null,
        width: col.width || null,
        field: col.key,
        headerName: col.name,
        hide: col.hide || false,
        cellDataType: col.type,
        editable: clientId || vendorId || markClientId || col.editable,
        suppressNavigable: col.suppressNavigable,
        tooltipValueGetter: (p) => (p.value ? (col.calc ? `${col.calc?.text} = ${numberFormatter(p.value)}` : null) : null),
        valueFormatter: (params) => {
          if (col.type === 'text' && params.value && String(params.value).startsWith('=')) {
            return calculateEquation(params.value.replace('=', ''), params.data, currentDocumentColumns)
          } else if (col.type === 'number' && params.value) {
            if (String(params.value).startsWith('=')) {
              return calculateEquation(params.value.replace('=', ''), params.data, currentDocumentColumns)
            }
            return numberFormatter(params.value)
          } else if (col.type === 'date' && params.value) {
            return dateFormatter(params.value)
          } else if (!params.value) {
            return ''
          } else {
            if (typeof params.value === 'number') return numberFormatter(params.value)
          }
        },
        cellRendererSelector: (params) => {
          if (params.node.rowPinned) {
            return {
              component: CustomPinnedRowRenderer,
              params: {
                style: { color: '#5577CC' },
              },
            }
          } else {
            return undefined
          }
        },
      }
    },
    [currentDocumentColumns]
  )

  useEffect(() => {
    const filterConfigs = {
      all: null,
      yearly: {
        continue_type: {
          filterType: 'text',
          type: 'contains',
          filter: '연간',
        },
      },
      default: {
        continue_type: {
          filterType: 'text',
          type: 'notContains',
          filter: '연간',
        },
      },
    }

    const filterModel = filterConfigs[viewType] || filterConfigs.default
    gridRef.current?.api.setFilterModel(filterModel)

    console.log('api: ', gridRef.current)
  }, [viewType, gridRef])

  useEffect(() => {
    setColumnDefs(() => {
      let colDef = currentDocumentColumns.map((col) => {
        return setColumnDefProps(col)
      })
      if (documentId === 'book_delivery') {
        const clientLedgerColumns = TABLE_COLUMNS.find((table) => table.key === 'client_ledger')?.columns
        const vendorLedgerColumns = TABLE_COLUMNS.find((table) => table.key === 'vendor_ledger')?.columns
        colDef = [
          ...colDef,
          {
            headerName: '매출처 원장',
            headerClass: 'client-ledger-group',
            marryChildren: true,
            children: clientLedgerColumns.map((col) => setColumnDefProps(col)),
          },
          {
            headerName: '매입처 원장',
            headerClass: 'vendor-ledger-group',
            marryChildren: true,
            children: vendorLedgerColumns.map((col) => setColumnDefProps(col)),
          },
        ]
      }
      return colDef
    })
  }, [currentDocumentColumns])

  // 비동기적인 실행이 있어 따로 useEffect로 빼둠
  useEffect(() => {
    setColumnDefs((prevCol) =>
      prevCol.map((col) => {
        let cell = setCellEditorForAgGrid(col.field)
        if (col.cellDataType === 'date') cell = { ...cell, cellEditor: 'agDateCellEditor' }

        return {
          ...col,
          ...cell,
        }
      })
    )
  }, [vendors, clients, documentId, organizationId, clientId, vendorId, markClientId])

  useEffect(() => {
    console.log('columnDefs: ', columnDefs)
    count.current = 0 // 초기화
    setLoading(true)
    dispatch(getDocument(location.pathname))
      .then((res) => {
        const data = res.payload ? structuredClone(res.payload) : []
        const dateTypesColumns = currentDocumentColumns.filter((item) => item.type === 'date').map((item) => item.key)
        console.log('data: ', data)
        setRowData(() =>
          data.map((item) => {
            dateTypesColumns.forEach((column) => {
              item[column] = item[column] ? new Date(item[column]) : null
            })
            return item
          })
        )
      })
      .catch((error) => console.error('Failed to load data', error))
      .finally(() => setLoading(false))
  }, [documentId, organizationId, clientId, vendorId, markClientId])

  useEffect(() => {
    console.log('document 업데이트됨!!! 테이블 새로 만듬: ', document)
    if (document.length > 0) {
      const copy = structuredClone(document)
      setRowData(() =>
        copy.map((item) => {
          if (!item.outsourcing_company) item.outsourcing_company = '없음'
          return item
        })
      )
    }
  }, [document])

  const createOneDocumentRecord = useCallback(() => {
    const record = currentDocumentColumns.reduce((acc, column) => {
      acc[column.key] = '' // 모든 필드를 null로 초기화
      return acc
    }, {})
    return record
  }, [document])

  const onAddRow = () => {
    const newRecord = createOneDocumentRecord()
    count.current++
    newRecord.id = `temp-${count.current}`
    if (organizationId) {
      newRecord.sheet_name = org.name
      newRecord.sheet_data_num = org.id
    }

    console.log('newRecord: ', newRecord)
    gridRef.current.api.applyTransaction({ add: [newRecord] })

    // 추가된 행으로 스크롤 이동
    const rowCount = gridRef.current.api.getDisplayedRowCount()
    if (rowCount > 0) {
      gridRef.current.api.ensureIndexVisible(rowCount - 1, 'bottom')
    }
  }

  const onRemoveRows = () => {
    if (!access) {
      api.error({
        placement: 'top',
        message: '권한코드가 일치하지 않습니다.',
        description: '권한코드를 확인해주세요.',
      })
      return
    }

    const selectedNodes = gridRef.current.api.getSelectedNodes()
    const selecteDatas = selectedNodes.map((node) => node.data)

    const recordedData = selecteDatas.filter((data) => typeof data.id === 'number')
    const ids = recordedData.map((data) => data.id)

    // 데이터베이스에 저장되지 않은, 화면에 row만 추가된 데이터 삭제
    selecteDatas.forEach((data) => {
      if (typeof data.id !== 'number') {
        gridRef.current.api.applyTransaction({ remove: [data] })
      }
    })

    // 삭제할 데이터가 없으면 리턴
    if (ids.length === 0) return
    setLoading(true)
    dispatch(deleteDocument({ path: location.pathname, ids }))
      .then((res) => {
        console.log('After delete data', res)
        if (res.type.includes('rejected')) {
          messageApi.open({
            type: 'error',
            content: `삭제를 실패하였습니다.`,
          })
        } else {
          const copy = structuredClone(res.payload)
          setSelectedRows([])
          setRowData(copy)
          messageApi.open({ type: 'success', content: '삭제되었습니다.' })
        }

        gridRef.current.api.applyTransaction({ remove: recordedData })
      })
      .catch((error) => {
        console.log('delete error: ', error)
        messageApi.open({
          type: 'error',
          content: `삭제를 실패하였습니다.`,
        })
      })
      .finally(() => setLoading(false))
  }

  const onCellValueChanged = useCallback((event) => {
    const { data, colDef } = event
    console.log('[onCellValueChanged] event: ', event)

    gridRef.current.api.applyTransaction({ update: [data] })
  }, [])

  const onRowSelected = useCallback((event) => {
    const datas = event.api.getSelectedNodes().map((node) => node.data)
    console.log('[onRowSelected] event: ', datas)
    setSelectedRows(datas.map((data) => data.id))
  }, [])

  const onSave = () => {
    let newData = []
    const editingCells = gridRef.current.api.getEditingCells()

    if (editingCells.length > 0) {
      editingCells.forEach((cell) => {
        const rowNode = gridRef.current.api.getDisplayedRowAtIndex(cell.rowIndex)
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
        // delete node.data.id
        newData.push(node.data)
      }
    })

    console.log('[2] newData: ', newData)

    // newData = newData.map((data) => {
    //   if (typeof data.id !== 'number') delete data.id
    //   if (!data.parent_company_id && data.parent_company && data.parent_company !== '없음') {
    //     const client = data.parent_company_id || clients.find((c) => c.name === data.parent_company)

    //     data.client = client?.name || data.parent_company
    //     data.client_id = client?.id
    //     data.parent_company_id = client?.id
    //   }
    //   if (!data.outsourcing_company_id && data.outsourcing_company && data.outsourcing_company !== '없음') {
    //     const vendor = data.outsourcing_company_id || vendors.find((vendor) => vendor.name === data.outsourcing_company)
    //     data.vendor = vendor?.name || data.outsourcing_company
    //     data.vendor_id = vendor?.id
    //     data.outsourcing_company_id = vendor?.id
    //   }
    //   return data
    // })
    // setLoading(true)
    // dispatch(
    //   postDocument({
    //     path: location.pathname,
    //     document: newData,
    //   })
    // )
    //   .then((res) => {
    //     if (res.type.includes('rejected')) {
    //       console.log('postDocument rejected: ', res)
    //     } else {
    //       console.log('after postDocument success : ', res)

    //       dispatch(getDocument(location.pathname))
    //       // const copy = structuredClone(res.payload)
    //       // setRowData((prev) => ({ ...prev, ...copy }))
    //       gridRef.current.api.deselectAll()
    //       messageApi.open({ type: 'success', content: '저장되었습니다.' })
    //     }
    //   })
    //   .catch((error) => {
    //     console.log('postDocument error: ', error)
    //   })
    //   .finally(() => {
    //     setSelectedRows([])
    //     setLoading(false)
    //   })
  }

  const getRowId = useCallback(
    (params) => {
      return String(params.data.id)
    },
    [rowData]
  )

  const sum = useCallback(
    (key) => {
      const sum = rowData.reduce((sum, item) => sum + item[key], 0)
      return sum
    },
    [rowData]
  )

  const pinnedBottomRowData = useMemo(() => {
    return clientId
      ? [
          {
            cl_bk_price: sum('cl_bk_price').toLocaleString('en-US'),
            bk_supply_price: sum('bk_supply_price').toLocaleString('en-US'),
            cl_bk_supply_price: sum('cl_bk_supply_price').toLocaleString('en-US'),
            cl_total_payment: sum('cl_total_payment').toLocaleString('en-US'),
            cl_our_revenue_rate: ((sum('cl_our_revenue') / sum('cl_bk_price')) * 100).toFixed(2) + '%',
            cl_our_revenue: sum('cl_our_revenue').toLocaleString('en-US'),
          },
        ]
      : []
  }, [rowData])

  if (rowData.length === 0) {
    return (
      <EmptyContainer>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </EmptyContainer>
    ) // 데이터 없으면 로딩 표시
  }

  return (
    <Wrapper>
      {notificationContextHolder}
      <AgGridReact
        theme={theme}
        loading={loading}
        getRowId={getRowId}
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        rowSelection={{
          mode: clientId || vendorId || markClientId ? null : 'multiRow',
        }}
        rowClassRules={{
          'rag-amber-outer': (params) => {
            return params.data.b_close_status
          },
        }}
        defaultColDef={defaultColDef}
        resetRowDataOnUpdate={true}
        animateRows={true}
        onCellValueChanged={onCellValueChanged}
        onSelectionChanged={onRowSelected}
        tooltipShowDelay={500}
        getRowStyle={(params) => {
          if (params.node.rowPinned) {
            return { fontWeight: 'bold', textAlign: 'right' }
          }
        }}
        pinnedBottomRowData={pinnedBottomRowData}
        // onGridReady={onGridReady}
      />
      <ButtonWrapper disabled={clientId || vendorId || markClientId} size="mdeium" variant="outlined" color="default" onClick={onAddRow}>
        Add a row +
      </ButtonWrapper>
      {contextHolder}
      <ActionHandler columns={columnDefs} rowData={rowData} selected={selected} onRemoveRows={onRemoveRows} onSave={onSave} />
    </Wrapper>
  )
}

export default TableSection

const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #666666;
`

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  gap: 18px;
  flex-direction: column;
  height: 100%;

  & .rag-amber-outer {
    background-color: #d1eeff;
  }
`

const ButtonWrapper = styled(Button)`
  width: 100%;
`
