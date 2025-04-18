import { DownloadOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Flex, Popconfirm } from 'antd'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { useIdsFromParams } from '../../hooks/useIdsFromParams'
import { useSetFileName } from '../../hooks/useSetFileName'
const getAllCells = (keyCount, rowNumber = 1) => {
  const cells = []
  for (let i = 1; i <= keyCount; i++) {
    const columnLabel = numberToColumnLabel(i)
    cells.push(`${columnLabel}${rowNumber}`)
  }
  return cells
}

// 숫자를 Excel 열 레이블로 변환
const numberToColumnLabel = (num) => {
  let label = ''
  while (num > 0) {
    const remainder = (num - 1) % 26
    label = String.fromCharCode(65 + remainder) + label
    num = Math.floor((num - 1) / 26)
  }
  return label
}

const ActionHandler = ({ columns, rowData, selected, onRemoveRows, onSave }) => {
  const { documentId, organizationId, clientId, vendorId, markClientId } = useIdsFromParams()
  const selectedFormat = useSelector((state) => state.format)
  const fileName = useSetFileName()

  const downloadExcel = async () => {
    const { all, first_columns_repeat, second_columns_repeat, first_rows_repeat, second_rows_repeat, last_column, first_column, header_row, footer_row } =
      selectedFormat.elements

    console.log('selectedFormat: ', selectedFormat)
    console.log('columns: ', columns)

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet(fileName ? fileName.split('_')[1] : 'Sheet1')

    // ✅ 컬럼 설정
    worksheet.columns = columns.map((col) => {
      const parts = col.field.split('_')
      const isAmoutField = parts[parts.length - 1] === 'cost' || parts[parts.length - 1] === 'price'
      const isRateField = parts[parts.length - 1] === 'rate'

      return {
        header: col.headerName,
        key: col.field,
        width: col.cellDataType === 'date' ? 20 : 15,
        style: isAmoutField ? { numFmt: '#,##0' } : undefined,
      }
    })

    // ✅ 데이터 추가
    rowData.forEach((row, index) => {
      for (const key in row) {
        row[key] = row[key] === null ? '' : row[key]
      }
      worksheet.addRow(row)
      const addedRow = worksheet.getRow(index + 2)
      addedRow.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        }
        cell.alignment = { horizontal: 'center', vertical: 'middle' }
      })
    })

    const mapper = {}

    console.log('elements: ', selectedFormat.elements)

    for (const key in selectedFormat.elements) {
      const item = selectedFormat.elements[key]

      console.log('item: ', item)

      if (item) {
        mapper[key] = {
          styles: {
            backgroundColor: item.backgroundColor,
            color: item.color,
          },
          cells: [],
        }
        const temp1 = JSON.parse(item.fontSize)
        for (const k in temp1) {
          mapper[key].styles[k] = temp1[k]
        }
        const temp2 = JSON.parse(item.fontStyle)
        for (const k in temp2) {
          mapper[key].styles[k] = temp2[k]
        }
        const temp3 = JSON.parse(item.textDecorationLine)
        for (const k in temp3) {
          mapper[key].styles[k] = temp3[k]
        }
      }
    }

    console.log('mapper: ', mapper)

    worksheet.columns.forEach((item, index) => {
      const number = index + 1
      const col = worksheet.getColumn(number)

      if (all) {
        col.eachCell({ includeEmpty: true }, (cell) => mapper.all.cells.push(cell))
      }

      // column repeat style
      if (first_columns_repeat && number % 2 === 0) {
        col.eachCell({ includeEmpty: true }, (cell) => mapper.first_columns_repeat.cells.push(cell))
      } else if (second_columns_repeat && number % 2 === 1) {
        col.eachCell({ includeEmpty: true }, (cell) => mapper.second_columns_repeat.cells.push(cell))
      }

      // column first & second style
      if (first_column && number === 1) {
        col.eachCell({ includeEmpty: true }, (cell) => mapper.first_column.cells.push(cell))
      } else if (last_column && number === worksheet.columns.length) {
        col.eachCell({ includeEmpty: true }, (cell) => mapper.last_column.cells.push(cell))
      }

      col.eachCell({ includeEmpty: true }, (cell, rowNumber) => {
        const row = worksheet.getRow(rowNumber)
        row.height = 22
        // row repeat style
        if (first_rows_repeat && rowNumber % 2 === 0) {
          mapper.first_rows_repeat.cells.push(cell)
        } else if (second_rows_repeat && rowNumber % 2 === 1) {
          mapper.second_rows_repeat.cells.push(cell)
        }

        // row first & last style
        if (header_row && rowNumber === 1) {
          mapper.header_row.cells.push(cell)
        } else if (footer_row && rowNumber === worksheet.rowCount) {
          mapper.footer_row.cells.push(cell)
        }
      })
    })

    console.log('mapper: ', mapper)

    for (const element in mapper) {
      const cells = mapper[element].cells
      const styles = mapper[element].styles

      cells.forEach((cell) => {
        cell.font = {
          color: { argb: styles.color.replace('#', '') },
          size: styles.fontSize.replace('px', ''),
          bold: styles.fontWeight === 'bold',
          italic: styles.fontStyle === 'italic',
          underline: styles.textDecorationLine === 'underline',
          strike: styles.textDecorationLine === 'line-through',
        }
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: styles.backgroundColor.replace('#', '') },
        }
        cell.alignment = { horizontal: 'center', vertical: 'middle' }
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        }
      })
      // if(element === "all") break;
    }

    // ✅ 첫 번째 행 고정 (Freeze)
    const keyCount = columns.length
    const headerCellRange = getAllCells(keyCount, 1)
    worksheet.views = [{ state: 'frozen', ySplit: 1 }]
    worksheet.autoFilter = {
      from: headerCellRange[0],
      to: headerCellRange[keyCount - 1],
    }

    // ✅ Excel 파일 저장
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })

    saveAs(blob, `${fileName}.xlsx`)
  }

  return (
    <Wrapper>
      <Popconfirm
        title="삭제하시겠습니까?"
        description="삭제된 데이터는 다시 불러올 수 없습니다."
        onConfirm={onRemoveRows}
        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
        okText="Yes"
        cancelText="No"
      >
        <Button disabled={clientId || vendorId || markClientId || !selected.length} size="large" danger type="text">
          삭제
        </Button>
      </Popconfirm>
      <Flex gap="middle">
        <Button size="large" type="primary" disabled={clientId || vendorId || markClientId} onClick={onSave}>
          저장
        </Button>
        <ExcelButton disabled={rowData.length === 0} color="default" variant="filled" icon={<DownloadOutlined />} size="large" onClick={downloadExcel}>
          Excel 다운로드
        </ExcelButton>
      </Flex>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const ExcelButton = styled(Button)`
  &:not(:disabled) {
    background-color: #1d6f42 !important;
    box-shadow: none !important;
    color: white;

    &:hover {
      opacity: 0.8;
    }
  }
`

export default ActionHandler
