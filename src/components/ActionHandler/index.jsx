import { DownloadOutlined } from "@ant-design/icons";
import { Button, Flex, Popconfirm } from "antd";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { OVERVIEW_TABLES } from "../../constants/menu";
import { DEFAULT_FORMAT_ITEMS } from "../../constants/options";
import { useDocumentId } from "../../hooks/useDocumentId";
import { selectNameById } from "../../store/organizationNames/organizationNamesSlice";

const getAllCells = (keyCount, rowNumber = 1) => {
  const cells = [];
  for (let i = 1; i <= keyCount; i++) {
    const columnLabel = numberToColumnLabel(i);
    cells.push(`${columnLabel}${rowNumber}`);
  }
  return cells;
};

// 숫자를 Excel 열 레이블로 변환
const numberToColumnLabel = (num) => {
  let label = "";
  while (num > 0) {
    const remainder = (num - 1) % 26;
    label = String.fromCharCode(65 + remainder) + label;
    num = Math.floor((num - 1) / 26);
  }
  return label;
};

const ActionHandler = ({
  columns,
  rowData,
  selected,
  onRemoveRows,
  onSave,
}) => {
  const { documentId, organizationId } = useDocumentId();
  const [fileName, setFileName] = useState("");
  const org = useSelector((state) => selectNameById(state, organizationId));

  // Selected Format: Type-A
  const selectedFormat = DEFAULT_FORMAT_ITEMS.find(
    (item) => item.key === "typeA"
  );

  useEffect(() => {
    const parentName = documentId
      ? OVERVIEW_TABLES.find((table) => table.key === documentId).label
      : org.name;
    const childName = "";
    setFileName(`${parentName}${childName ? `_${childName}` : ""}`);
  }),
    [documentId, organizationId, org];

  useEffect(() => {
    console.log("rowData: ", rowData);
  }, [rowData]);

  useEffect(() => {
    console.log("columns: ", columns);
  }, [columns]);

  const downloadExcel = async () => {
    const {
      all,
      first_columns_repeat,
      second_columns_repeat,
      first_rows_repeat,
      second_rows_repeat,
      last_column,
      first_column,
      header_row,
      footer_row,
    } = selectedFormat.elements;

    console.log("Elements: ", selectedFormat.elements);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`${fileName}`);

    console.log("columns: ", columns);

    // ✅ 컬럼 설정
    worksheet.columns = columns.map((col) => {
      const parts = col.field.split("_");
      const isAmoutField =
        parts[parts.length - 1] === "cost" ||
        parts[parts.length - 1] === "price";
      const isRateField = parts[parts.length - 1] === "rate";

      return {
        header: col.headerName,
        key: col.field,
        width: col.cellDataType === "date" ? 20 : 15,
        style: isAmoutField ? { numFmt: "#,##0" } : undefined,
      };
    });

    // ✅ 데이터 추가
    rowData.forEach((row, index) => {
      for (const key in row) {
        row[key] = row[key] === null ? "" : row[key];
      }
      worksheet.addRow(row);
      const addedRow = worksheet.getRow(index + 2);
      addedRow.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        cell.alignment = { horizontal: "center", vertical: "middle" };
      });
    });

    const mapper = {};

    for (const key in selectedFormat.elements) {
      const item = selectedFormat.elements[key];

      if (item) {
        mapper[key] = {
          styles: {
            backgroundColor: item.styles.backgroundColor,
            color: item.styles.color,
          },
          cells: [],
        };
        console.log(JSON.parse(item.styles.textDecorationLine));
        const temp1 = JSON.parse(item.styles.fontSize);
        for (const k in temp1) {
          mapper[key].styles[k] = temp1[k];
        }
        const temp2 = JSON.parse(item.styles.fontStyle);
        for (const k in temp2) {
          mapper[key].styles[k] = temp2[k];
        }
        const temp3 = JSON.parse(item.styles.textDecorationLine);
        for (const k in temp3) {
          mapper[key].styles[k] = temp3[k];
        }
      }
    }

    worksheet.columns.forEach((item, index) => {
      const number = index + 1;
      const col = worksheet.getColumn(number);

      // column repeat style
      if (first_columns_repeat && number % 2 === 0) {
        col.eachCell({ includeEmpty: true }, (cell) =>
          mapper.first_column_repeat.cells.push(cell)
        );
      } else if (second_columns_repeat && number % 2 === 1) {
        col.eachCell({ includeEmpty: true }, (cell) =>
          mapper.second_columns_repeat.cells.push(cell)
        );
      }

      // column first & second style
      if (first_column && number === 1) {
        col.eachCell({ includeEmpty: true }, (cell) =>
          mapper.first_column.cells.push(cell)
        );
      } else if (last_column && number === worksheet.columns.length) {
        col.eachCell({ includeEmpty: true }, (cell) =>
          mapper.last_column.cells.push(cell)
        );
      }

      col.eachCell({ includeEmpty: true }, (cell, rowNumber) => {
        const row = worksheet.getRow(rowNumber);
        row.height = 22;
        // row repeat style
        if (first_rows_repeat && rowNumber % 2 === 0) {
          mapper.first_rows_repeat.cells.push(cell);
        } else if (second_rows_repeat && rowNumber % 2 === 1) {
          mapper.second_rows_repeat.cells.push(cell);
        }

        // row first & last style
        if (header_row && rowNumber === 1) {
          mapper.header_row.cells.push(cell);
        } else if (footer_row && rowNumber === worksheet.rowCount) {
          mapper.footer_row.cells.push(cell);
        }
      });
    });

    console.log("mapper: ", mapper);

    for (const element in mapper) {
      const cells = mapper[element].cells;
      const styles = mapper[element].styles;

      cells.forEach((cell) => {
        cell.font = {
          color: { argb: styles.color.replace("#", "") },
          size: styles.fontSize.replace("px", ""),
          bold: styles.fontWeight === "bold",
          italic: styles.fontStyle === "italic",
          underline: styles.textDecorationLine === "underline",
          strike: styles.textDecorationLine === "line-through",
        };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: styles.backgroundColor.replace("#", "") },
        };
        cell.alignment = { horizontal: "center", vertical: "middle" };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    }

    // ✅ 첫 번째 행 고정 (Freeze)
    const keyCount = columns.length;
    const headerCellRange = getAllCells(keyCount, 1);
    worksheet.views = [{ state: "frozen", ySplit: 1 }];
    worksheet.autoFilter = {
      from: headerCellRange[0],
      to: headerCellRange[keyCount - 1],
    };

    // ✅ Excel 파일 저장
    const yyyymmdd = DateTime.now().toFormat("yyyyMMdd");
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, `${yyyymmdd}_${fileName}.xlsx`);
  };

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
          disabled={!rowData.length}
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
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ExcelButton = styled(Button)`
  &:not(:disabled) {
    background-color: #1d6f42 !important;
    box-shadow: none !important;
    color: white;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export default ActionHandler;
