import { DownloadOutlined } from "@ant-design/icons"
import { Button, Flex, Popconfirm } from "antd"
import ExcelJS from "exceljs"
import { saveAs } from "file-saver"
import { DateTime } from "luxon"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"

import { OVERVIEW_TABLES } from "../../constants/menu"
import { useDocumentId } from "../../hooks/useDocumentId"
import { selectNameById } from "../../store/organizationNames/organizationNamesSlice"

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
  let label = ""
  while (num > 0) {
    const remainder = (num - 1) % 26
    label = String.fromCharCode(65 + remainder) + label
    num = Math.floor((num - 1) / 26)
  }
  return label
}

const ActionHandler = ({
  columns,
  rowData,
  selected,
  onRemoveRows,
  onSave,
}) => {
  const { documentId, organizationId } = useDocumentId()
  const [fileName, setFileName] = useState("")
  const org = useSelector((state) => selectNameById(state, organizationId))

  useEffect(() => {
    const parentName = documentId
      ? OVERVIEW_TABLES.find((table) => table.key === documentId).label
      : org.name
    const childName = ""
    setFileName(`${parentName}_${childName}`)
  }),
    [documentId, organizationId, org]

  useEffect(() => {
    console.log("rowData: ", rowData)
  }, [rowData])

  useEffect(() => {
    console.log("columns: ", columns)
  }, [columns])

  const downloadExcel = async () => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet(`${fileName}`, {
      pageSetup: {
        horizontalCentered: true,
        verticalCentered: true,
      },
    })
    worksheet.properties.defaultRowHeight = 30

    // ✅ 컬럼 설정
    worksheet.columns = columns.map((col) => ({
      header: col.headerName,
      key: col.field,
      // width: 10,
    }))

    // ✅ 데이터 추가
    rowData.forEach((row) => {
      for (const key in row) {
        row[key] = row[key] === null ? "" : row[key]
      }
      const newRow = worksheet.addRow(row)

      newRow.eachCell((cell) => {
        cell.alignment = { vertical: "middle", horizontal: "center" }
      })
    })

    // ✅ 헤더 스타일 적용
    // worksheet.getRow(1).height = 30
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "000000" } } // 흰색 글씨
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "BFBFBF" }, // 배경색
      }
      cell.alignment = { vertical: "middle", horizontal: "center" }
    })

    // ✅ 데이터 셀 스타일 적용 (테두리 추가)
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        }
        cell.alignment = { horizontal: "center" }
      })
    })

    // ✅ 첫 번째 행 고정 (Freeze)
    const keyCount = columns.length
    const headerCellRange = getAllCells(keyCount, 1)
    worksheet.views = [{ state: "frozen", ySplit: 1 }]
    worksheet.autoFilter = {
      from: headerCellRange[0],
      to: headerCellRange[keyCount - 1],
    }

    console.log(headerCellRange[0], headerCellRange[keyCount - 1])

    // ✅ Excel 파일 저장
    const yyyymmdd = DateTime.now().toFormat("yyyyMMdd")
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })

    saveAs(blob, `${yyyymmdd}.xlsx`)
  }

  return (
    <Wrapper>
      <Popconfirm
        title="삭제하시겠습니까?"
        onConfirm={onRemoveRows}
        okText="Yes"
        cancelText="No"
      >
        <Button disabled={!selected.length} size="large" danger type="text">
          삭제
        </Button>
      </Popconfirm>
      <Flex gap="middle">
        <Button size="large" type="primary" onClick={onSave}>
          저장
        </Button>
        <ExcelButton
          color="default"
          variant="filled"
          icon={<DownloadOutlined />}
          size="large"
          onClick={downloadExcel}
        >
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
  background-color: #1d6f42 !important;
  box-shadow: none !important;
  color: white;

  &:hover {
    opacity: 0.8;
  }
`

export default ActionHandler
