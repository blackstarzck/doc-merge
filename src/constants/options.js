export const TABLE_ELEMENTS = [
  {
    key: "all",
    label: "전체 표",
    isSelected: false,
    styles: {
      fontStyle: null,
      fontSize: null,
      uderline: null,
      color: null,
      backgroundColor: null,
    },
  },
  {
    key: "first_columns_repeat", // 0 % 2 나머지값 0 에 적용
    label: "열 줄무늬",
    isSelected: false,
    styles: {
      fontStyle: null,
      fontSize: null,
      uderline: null,
      color: null,
      backgroundColor: null,
    },
  },
  {
    key: "second_columns_repeat", // 0 % 2 나머지값 1 에 적용
    label: "둘째 열 줄무늬",
    isSelected: false,
    styles: {
      fontStyle: null,
      fontSize: null,
      uderline: null,
      color: null,
      backgroundColor: null,
    },
  },
  {
    key: "first_rows_repeat", // 0 % 2 나머지값 0 에 적용
    label: "첫 행 줄무늬",
    isSelected: false,
    styles: {
      fontStyle: null,
      fontSize: null,
      uderline: null,
      color: null,
      backgroundColor: null,
    },
  },
  {
    key: "second_rows_repeat", // 0 % 2 나머지값 1 에 적용
    label: "둘째 행 줄무늬",
    isSelected: false,
    styles: {
      fontStyle: null,
      fontSize: null,
      uderline: null,
      color: null,
      backgroundColor: null,
    },
  },
  {
    key: "last_column",
    isSelected: false,
    label: "마지막 열",
    styles: {
      fontStyle: null,
      fontSize: null,
      uderline: null,
      color: null,
      backgroundColor: null,
    },
  },
  {
    key: "first_column",
    isSelected: false,
    label: "첫째 열",
    styles: {
      fontStyle: null,
      fontSize: null,
      uderline: null,
      color: null,
      backgroundColor: null,
    },
  },
  {
    key: "header_row",
    isSelected: false,
    label: "머리글 행",
    styles: {
      fontStyle: null,
      fontSize: null,
      uderline: null,
      color: null,
      backgroundColor: null,
    },
  },
  {
    key: "footer_row",
    isSelected: false,
    label: "요약 행",
    styles: {
      fontStyle: null,
      fontSize: null,
      uderline: null,
      color: null,
      backgroundColor: null,
    },
  },
];

export const FONT_STYLE_OPTIONS = [
  {
    value: '{"fontStyle":"normal","fontWeight":"normal"}',
    label: "보통",
  },
  {
    value: '{"fontStyle":"italic","fontWeight":"normal"}',
    label: "기울임꼴",
  },
  {
    value: '{"fontStyle":"normal","fontWeight":"bold"}',
    label: "굵게",
  },
  {
    value: '{"fontStyle":"italic","fontWeight":"bold"}',
    label: "굵은 기울임꼴",
  },
];

export const FONT_SIZE_OPTIONS = Array.from({ length: 24 - 6 + 1 }, (_, i) => ({
  value: `{"fontSize": "${i + 6}px"}`,
  label: `${i + 6}px`,
}));

export const UNDERLINE_OPTIONS = [
  {
    value: '{"textDecorationLine":"none","textDecorationStyle":"none"}',
    label: "없음",
  },
  {
    value: '{"textDecorationLine":"underline","textDecorationStyle":"solid"}',
    label: "밑줄",
  },
  {
    value:
      '{"textDecorationLine":"line-through","textDecorationStyle":"solid"}',
    label: "취소선",
  },
];

export const DEFAULT_FORMAT_ITEMS = [
  {
    key: "Type-A",
    label: "typeA",
    elements: {
      all: null,
      first_columns_repeat: null,
      second_columns_repeat: null,
      first_rows_repeat: {
        style: {
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: 11,
          textDecorationLine: "none",
          color: "#000000",
          backgroundColor: "#EDEDED",
        },
      },
      second_rows_repeat: null,
      last_column: null,
      first_column: null,
      header_row: {
        style: {
          fontStyle: "normal",
          fontWeight: "bold",
          fontSize: 11,
          textDecorationLine: "none",
          color: "#000000",
          backgroundColor: "#C3C3C3",
        },
      },
      footer_row: null,
    },
  },
  {
    key: "Type-B",
    label: "typeB",
    elements: [],
  },
  {
    key: "Type-C",
    label: "typeC",
    elements: [],
  },
];
