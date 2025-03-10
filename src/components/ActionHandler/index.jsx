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
  const selectedFormat = useSelector((state) => state.format)
    const formatKey = useSelector((state) => state.modals.formatter.key)
    const selectedFormat = useSelector((state) =>
      selectFormatItemByKey(state, formatKey)
    )

  useEffect(() => {
    const parentName = documentId
      ? OVERVIEW_TABLES.find((table) => table.key === documentId).label
      : org.name
    const childName = ""
    setFileName(`${parentName}${childName ? `_${childName}` : ""}`)
  }),
    [documentId, organizationId, org]

  useEffect(() => {
    // console.log("rowData: ", rowData)
  }, [rowData])

  useEffect(() => {
    // console.log("columns: ", columns)
  }, [columns])

  const downloadExcel = async () => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet(`${fileName}`)
    worksheet.properties.defaultRowHeight = 24

    // ✅ 컬럼 설정
    worksheet.columns = columns.map((col) => ({
      header: col.headerName,
      key: col.field,
      width: col.cellDataType === "date" ? 20 : 15,
    }))

    // ✅ 데이터 추가
    // 해당 부분에서 스타일 추가가 불가능 (cell.style NO)
    // 데이터를 모두 넣은 뒤 "worksheet" 객체를 통해서만 스타일 적용
    rowData.forEach((row) => {
      for (const key in row) {
        row[key] = row[key] === null ? "" : row[key]
      }
      worksheet.addRow(row)
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
        cell.alignment = { horizontal: "center", vertical: "middle" }
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

    // ✅ Excel 파일 저장
    const yyyymmdd = DateTime.now().toFormat("yyyyMMdd")
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })

    console.log("selectedFormat: ", selectedFormat)

    // saveAs(blob, `${yyyymmdd}_${fileName}.xlsx`)
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
          disabled={!rowData.length || }
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
