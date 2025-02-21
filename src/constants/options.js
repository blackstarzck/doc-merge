export const TABLE_ELEMENTS = [
  { key: "all", styles: null, isSelected: false, label: "전체 표" },
  {
    key: "fst-columns-repeat",
    styles: null,
    isSelected: false,
    label: "열 줄무늬",
  },
  {
    key: "scnd-columns-repeat",
    styles: null,
    isSelected: false,
    label: "둘째 열 줄무늬",
  },
  {
    key: "fst-rows-repeat",
    styles: null,
    isSelected: false,
    label: "첫 행 줄무늬",
  },
  {
    key: "scnd-rows-repeat",
    styles: null,
    isSelected: false,
    label: "둘째 행 줄무늬",
  },
  { key: "lst-column", styles: null, isSelected: false, label: "마지막 열" },
  { key: "fst-column", styles: null, isSelected: false, label: "첫째 열" },
  { key: "fst-row", styles: null, isSelected: false, label: "머리글 행" },
  { key: "lst-row", styles: null, isSelected: false, label: "요약 행" },
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
    label: "Type-A",
    styles: null,
  },
  {
    key: "Type-B",
    label: "Type-B",
    styles: null,
  },
  {
    key: "Type-C",
    label: "Type-C",
    styles: null,
  },
];
