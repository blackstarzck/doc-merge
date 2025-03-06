export const OVERVIEW_TABLES = [
  {
    label: "도서납품현황",
    key: "book_delivery",
    columns: [
      { name: "연번", key: "no", type: "number" },
      { name: "마감", key: "b_close_status", type: "boolean" },
      { name: "계산서", key: "b_invoice", type: "boolean" },
      { name: "날짜", key: "continue_type", type: "string" },
      { name: "입찰기관", key: "bid_org", type: "string" },
      { name: "매출사업자", key: "sales_company", type: "string" },
      { name: "낙찰업체", key: "win_company", type: "string" },
      { name: "상위사업자", key: "parent_company", type: "string" },
      { name: "기관명", key: "org_name", type: "string" },
      { name: "매입가확정", key: "purchase_price", type: "string" },
      { name: "마크장비", key: "mark_equip", type: "string" },
      { name: "대체여부", key: "sub_status", type: "string" },
      { name: "외주업체", key: "outsourcing_company", type: "string" },
      { name: "특이사항", key: "notes", type: "string" },
      { name: "진행담당자", key: "role_person", type: "string" },
      { name: "공고번호", key: "bid_number", type: "string" },
      { name: "계약일자", key: "contract_date", type: "date" },
      { name: "발주일자", key: "order_date", type: "date" },
      { name: "납품기한", key: "delivery_deadline", type: "date" },
      { name: "총권수", key: "total_bks", type: "number" },
      { name: "기초금액", key: "base_price", type: "number" },
      { name: "낙찰금액", key: "win_price", type: "number" },
      { name: "낙찰율(%)", key: "win_rate", type: "number" },
      { name: "도서정가", key: "bk_price", type: "number" },
      { name: "도서공급단가", key: "bk_supply_price", type: "number" },
      { name: "도서공급율", key: "bk_supply_rate", type: "string" },
      { name: "도서원가율", key: "bk_cost_rate", type: "number" },
      { name: "업체이익금", key: "company_revenue", type: "number" },
      {
        name: "업체이익율(낙찰가기준)",
        key: "company_revenue_rate",
        type: "number",
      },
      {
        name: "자사이익율(낙찰가기준)",
        key: "our_revenue_rate",
        type: "number",
      },
      { name: "기관마,장단가(권당)", key: "org_m_price", type: "number" },
      { name: "기관마,장비납품가", key: "org_m_equip_price", type: "number" },
      { name: "마장공급단가", key: "m_supply_price", type: "number" },
      { name: "마장공급합가", key: "m_supply_total_price", type: "number" },
      {
        name: "품절정가(간접할인등)",
        key: "out_of_stock_price",
        type: "number",
      },
      { name: "품절권수", key: "out_of_stock_bks", type: "number" },
      { name: "최종납품권수", key: "final_delivery_bks", type: "number" },
      { name: "마장최종매출액", key: "m_final_sales", type: "number" },
      { name: "선입금", key: "pre_payment", type: "number" },
      { name: "선입금일자", key: "pre_payment_date", type: "date" },
      { name: "잔금", key: "balance", type: "number" },
      { name: "잔금일자", key: "balance_date", type: "date" },
      { name: "총입금액", key: "total_payment", type: "number" },
      { name: "예정잔금", key: "expected_balance", type: "number" },
      { name: "최종납품정가", key: "final_delivery_price", type: "number" },
      { name: "최종도서매출액", key: "final_bk_sales", type: "number" },
      { name: "자사수익금", key: "our_revenue", type: "number" },
      { name: "행정담당자연락처", key: "admin_contact", type: "string" },
      { name: "사서연락처", key: "lib_contact", type: "string" },
      { name: "기간", key: "d_day", type: "number" },
      { name: "오늘날짜", key: "today_date", type: "date" },
    ],
  },
  {
    label: "용역, 물품납품",
    key: "service_delivery",
    columns: [
      { name: "번호", key: "no", type: "string" },
      { name: "날짜", key: "date", type: "date" },
      { name: "입찰기관", key: "bid_org", type: "string" },
      { name: "낙찰업체", key: "win_company", type: "string" },
      { name: "상위사업자", key: "parent_company", type: "string" },
      { name: "기관명", key: "org_name", type: "string" },
      { name: "특이사항", key: "notes", type: "string" },
      { name: "진행담당자", key: "role_person", type: "string" },
      { name: "공고번호", key: "bid_num", type: "string" },
      { name: "계약일자", key: "contract_date", type: "date" },
      { name: "납품일자", key: "delivery_date", type: "date" },
      { name: "마크장비", key: "mark_equip", type: "string" },
      { name: "기초금액", key: "base_price", type: "number" },
      { name: "낙찰금액", key: "win_price", type: "number" },
      { name: "낙찰율(%)", key: "win_rate", type: "number" },
      { name: "매입원가", key: "purchase_cost", type: "number" },
      { name: "최종납품권수", key: "final_delivery_quantity", type: "number" },
      { name: "최종매출액", key: "final_sales", type: "number" },
      { name: "결제방식", key: "payment_method", type: "string" },
      { name: "선입금일자", key: "pre_payment_date", type: "date" },
      { name: "선입금", key: "pre_payment", type: "number" },
      { name: "예정잔금", key: "expected_balance", type: "number" },
      { name: "잔금", key: "balance", type: "number" },
      { name: "잔금일자", key: "balance_date", type: "date" },
      { name: "총입금액", key: "total_payment", type: "number" },
      { name: "최종납품정가", key: "final_delivery_price", type: "number" },
      { name: "최종도서매출액", key: "final_bk_sales", type: "number" },
      { name: "수익금", key: "revenue", type: "number" },
      { name: "순이익금", key: "net_revenue", type: "number" },
      { name: "업체연락처", key: "company_contact", type: "string" },
      { name: "업체담당자", key: "company_person", type: "string" },
      { name: "행정담당자연락처", key: "admin_contact", type: "string" },
      { name: "행정담당자", key: "admin_person", type: "string" },
      { name: "사서연락처", key: "lib_contact", type: "string" },
      { name: "사서담당자", key: "lib_person", type: "string" },
    ],
  },
  {
    label: "장서점검+도서폐기",
    key: "book_disposal",
    columns: [
      { name: "번호", key: "no", type: "number" },
      { name: "날짜", key: "date", type: "date" },
      { name: "낙찰업체", key: "win_company", type: "string" },
      { name: "상위사업자", key: "parent_company", type: "string" },
      { name: "구분", key: "category", type: "string" },
      { name: "기관명", key: "org_name", type: "string" },
      { name: "진행", key: "status", type: "string" },
      { name: "비용", key: "cost", type: "string" },
      { name: "특이사항", key: "notes", type: "string" },
      { name: "진행담당자", key: "role_person", type: "string" },
      { name: "마크장비", key: "mark_equip", type: "string" },
      { name: "최종납품권수", key: "final_delivery_bks", type: "number" },
      { name: "최종매출액", key: "final_sales", type: "number" },
      { name: "지출비용", key: "expend_cost", type: "number" },
      { name: "선입금일자", key: "pre_payment_date", type: "date" },
      { name: "선입금", key: "pre_payment", type: "number" },
      { name: "예정잔금", key: "expected_balance", type: "number" },
      { name: "잔금", key: "balance", type: "number" },
      { name: "잔금일자", key: "balance_date", type: "date" },
      { name: "총입금액", key: "total_payment", type: "number" },
      { name: "수익금", key: "revenue", type: "number" },
      { name: "업체연락처", key: "company_contact", type: "string" },
      { name: "업체담당자", key: "company_person", type: "string" },
      { name: "행정담당자연락처", key: "admin_contact", type: "string" },
      { name: "행정담당자", key: "admin_person", type: "string" },
      { name: "사서연락처", key: "lib_contact", type: "string" },
      { name: "사서담당자", key: "lib_person", type: "string" },
    ],
  },
  {
    label: "물류알바(대구, 창원, 대전)",
    key: "logistics_job",
    columns: [
      { name: "연번", key: "no", type: "string" },
      { name: "작성자", key: "author", type: "string" },
      { name: "진행건", key: "progress_item", type: "string" },
      { name: "수량", key: "quantity", type: "string" },
      { name: "발송일자", key: "shipment_date", type: "date" },
      { name: "진행인원", key: "progress_person", type: "string" },
      { name: "납품일자", key: "delivery_date", type: "date" },
      { name: "수수료", key: "commission", type: "number" },
      { name: "추가비용", key: "additional_cost", type: "number" },
      { name: "정산비용", key: "settlement_cost", type: "number" },
      { name: "정산일자", key: "settlement_date", type: "date" },
      { name: "발송방법", key: "shipping_method", type: "string" },
      { name: "송장번호", key: "tracking_number", type: "string" },
      { name: "비고", key: "remarks", type: "string" },
    ],
  },
  {
    label: "화물사용",
    key: "cargo_usage",
    columns: [
      { name: "연번", key: "no", type: "string" },
      { name: "작성자", key: "author", type: "string" },
      { name: "도착지", key: "destination", type: "string" },
      { name: "진행건", key: "progress_item", type: "string" },
      { name: "수량", key: "quantity", type: "string" },
      { name: "발송일자", key: "shipment_date", type: "date" },
      { name: "업체", key: "company", type: "string" },
      { name: "납품일자", key: "delivery_date", type: "date" },
      { name: "요금", key: "cost", type: "number" },
      { name: "추가비용", key: "additional_cost", type: "string" },
      { name: "정산비용", key: "settlement_cost", type: "number" },
      { name: "정산일자", key: "settlement_date", type: "date" },
      { name: "차량", key: "vehicle", type: "string" },
      { name: "비고", key: "remarks", type: "string" },
    ],
  },
];

export const ORGANIZATION_COLUMNS = [
  {
    name: "입력타이틀",
    key: "sheet_name",
    type: "string",
    editable: false,
    suppressNavigable: true,
  },
  {
    name: "타이틀별번호",
    key: "sheet_data_num",
    type: "number",
    editable: false,
    suppressNavigable: true,
  },
  { name: "번호", key: "row_num", type: "number" },
  { name: "기관명", key: "org_name", type: "string" },
  { name: "마감", key: "b_close_date", type: "boolean" },
  { name: "계산서", key: "b_invoice", type: "boolean" },
  { name: "낙찰업체", key: "win_company", type: "string" },
  { name: "상위사업자", key: "parent_company", type: "string" },
  { name: "구분", key: "category", type: "string" },
  { name: "특이사항", key: "notes", type: "string" },
  { name: "담당", key: "role_person", type: "string" },
  { name: "원가율확정", key: "cost_rate", type: "string" },
  { name: "발주일", key: "order_date", type: "date" },
  { name: "납품일", key: "delivery_date", type: "date" },
  { name: "총권수", key: "total_bks", type: "number" },
  { name: "마크장비", key: "mark_equip", type: "string" },
  { name: "도서정가", key: "bk_price", type: "number" },
  {
    name: "낙찰금액",
    key: "win_price",
    type: "number",
    calc: {
      text: "도서정가 * 낙찰율(%)",
      equation: "floor(bk_price * win_rate)",
    },
  },
  { name: "낙찰율(%)", key: "win_rate", type: "number" },
  {
    name: "도서공급단가",
    key: "bk_supply_price",
    type: "number",
    calc: {
      text: "도서정가 * 도서공급율",
      equation: "floor(bk_price * bk_supply_rate)",
    },
  },
  { name: "도서공급율", key: "bk_supply_rate", type: "number" },
  {
    name: "매입원가",
    key: "purchase_cost",
    type: "number",
    calc: {
      text: "도서정가 * 도서원가율",
      equation: "bk_price * bk_cost_late",
    },
  },
  { name: "도서원가율", key: "bk_cost_late", type: "number" },
  { name: "기관마,장단가(권당)", key: "org_m_per_price", type: "number" },
  {
    name: "기관마,장비정가",
    key: "org_m_price",
    type: "number",
    calc: {
      text: "총권수 * 기관마,장단가(권당)",
      equation: "total_bks * org_m_per_price",
    },
  },
  {
    name: "마장공급단가",
    key: "m_supply_price",
    type: "number",
    calc: {
      text: "총권수 * 마장공급단가",
      equation: "total_bks * m_supply_price",
    },
  },
  { name: "마장공급합가", key: "m_supply_total_price", type: "number" },
  { name: "품절정가(간접할인등)", key: "out_of_stock_price", type: "number" },
  { name: "품절권수", key: "out_of_stock_bks", type: "number" },
  {
    name: "최종납품권수",
    key: "final_delivery_quantity",
    type: "number",
    calc: {
      text: "총권수 - 품절권수",
      equation: "total_bks - out_of_stock_bks",
    },
  },
  {
    name: "마장최종매출액",
    key: "m_final_sales",
    type: "number",
    calc: {
      text: "마장공급단가 * 마장공급단가",
      equation: "m_supply_price * m_supply_price",
    },
  },
  { name: "결제방식", key: "payment_method", type: "string" },
  { name: "선입금", key: "payment", type: "number" },
  { name: "선입금일자", key: "pre_payment_date", type: "date" },
  { name: "잔금", key: "balance", type: "number" },
  { name: "잔금일자", key: "balance_date", type: "date" },
  {
    name: "예정잔금",
    key: "expected_balance",
    type: "number",
    calc: {
      text: "도서공급단가 + 마장공급합가 - 선입금 - 잔금",
      equation:
        "floor(bk_supply_price + m_supply_total_price - pre_payment - balance)",
    },
  },
  { name: "총입금액", key: "total_payment", type: "number" },
  {
    name: "최종납품정가",
    key: "final_delivery_price",
    type: "number",
    calc: {
      text: "도서정가 - 품절권수",
      equation: "bk_price - out_of_stock_bks",
    },
  },
  {
    name: "최종도서매출액",
    key: "final_bk_sales",
    type: "number",
    calc: {
      text: "도서공급율 * 마장공급단가",
      equation: "bk_supply_rate * m_supply_price",
    },
  },
  {
    name: "도서수익금",
    key: "bk_revenue",
    type: "number",
    calc: {
      text: "최종도서매출액 - (마장공급단가 * 도서원가율)",
      equation: "final_bk_sales - (m_supply_price * bk_cost_late)",
    },
  },
  {
    name: "남은기간",
    key: "d_day",
    type: "number",
    calc: {
      text: "납품일 - 이익율",
      equation: "d-day(delivery_date - revenue_rate)",
    },
  },
  { name: "오늘날짜", key: "today_date", type: "date" },
  { name: "순이익금", key: "net_revenue", type: "number" },
  { name: "이익율", key: "revenue_rate", type: "number" },
];
