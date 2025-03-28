export const OVERVIEW_TABLES = [
  { label: '도서납품현황', key: 'book_delivery' },
  { label: '용역, 물품납품', key: 'service_delivery' },
  { label: '장서점검+도서폐기', key: 'book_disposal' },
  { label: '물류알바(대구, 창원, 대전)', key: 'logistics_job' },
  { label: '화물사용', key: 'cargo_usage' },
]

// TODO: 도서납품현황에서 매출처, 매입처에 곂치는 컬럼들 빼기.
export const TABLE_COLUMNS = [
  {
    label: '도서납품현황',
    key: 'book_delivery',
    columns: [
      {
        name: '행 아이디',
        key: 'id',
        type: 'number',
        hide: true,
        editable: false,
        suppressNavigable: true,
      },
      { name: '연번', key: 'no', type: 'text', editable: false, width: 100 },
      { name: '마감', key: 'b_close_status', type: 'boolean', width: 100 },
      { name: '계산서발행상태', key: 'invoice_received', type: 'boolean', width: 100 },
      {
        name: '날짜',
        key: 'continue_type',
        type: 'text',
        headerTooltip: '"연간"으로 설정한 행은 매출처/매입처에 저장되지 않습니다.',
        width: 150,
      },
      { name: '입찰기관', key: 'bid_org', type: 'text' },
      { name: '매출사업자', key: 'sales_company', type: 'text' },
      { name: '낙찰업체', key: 'win_company', type: 'text' },
      { name: '상위사업자', key: 'parent_company', type: 'text' },
      { name: '기관명', key: 'org_name', type: 'text' },
      { name: '매입가확정', key: 'purchase_price', type: 'text', width: 160 },
      { name: '마크장비', key: 'mark_equip', type: 'text' },
      { name: '대체여부', key: 'sub_status', type: 'text' },
      { name: '특이사항', key: 'notes', type: 'text' },
      { name: '외주업체', key: 'outsourcing_company', type: 'text' },
      { name: '진행담당자', key: 'role_person', type: 'text', width: 130 },
      { name: '공고번호', key: 'bid_number', type: 'text' },
      { name: '계약일자', key: 'contract_date', type: 'date', width: 130 },
      { name: '납품기한', key: 'delivery_deadline', type: 'date', width: 130 },
      { name: '총권수', key: 'total_bks', type: 'text', width: 100 },
      { name: '낙찰금액', key: 'win_price', type: 'text', width: 150 },
      { name: '낙찰율', key: 'win_rate', type: 'text', width: 130 },
      { name: '도서원가율', key: 'bk_cost_rate', type: 'text' },
      { name: '업체이익금', key: 'company_revenue', type: 'text' },
      { name: '업체이익율(낙찰가기준)', key: 'company_revenue_rate', type: 'text' },
      { name: '기관마,장단가(권당)', key: 'org_m_price', type: 'text' },
      { name: '기관마,장비납품가', key: 'org_m_equip_price', type: 'text' },
      { name: '마장공급단가', key: 'm_supply_price', type: 'text' },
      { name: '마장공급합가', key: 'm_supply_total_price', type: 'text' },
      { name: '품절정가(간접할인등)', key: 'out_of_stock_price', type: 'text' },
      { name: '품절권수', key: 'out_of_stock_bks', type: 'text' },
      { name: '최종납품권수', key: 'final_delivery_bks', type: 'text' },
      { name: '마장최종매출액', key: 'm_final_sales', type: 'text' },
      { name: '선입금액', key: 'pre_payment', type: 'text' },
      { name: '잔금', key: 'balance', type: 'text' },
      { name: '잔금일자', key: 'balance_date', type: 'date' },
      { name: '예정잔금', key: 'expected_balance', type: 'text' },
      { name: '최종납품정가', key: 'final_delivery_price', type: 'text' },
      { name: '최종도서매출액', key: 'final_bk_sales', type: 'text' },
      { name: '행정담당자연락처', key: 'admin_contact', type: 'text' },
      { name: '사서연락처', key: 'lib_contact', type: 'text' },
      { name: '기간', key: 'd_day', type: 'text' },
      { name: '오늘날짜', key: 'today_date', type: 'date' },
    ],
  },
  {
    label: '용역, 물품납품',
    key: 'service_delivery',
    columns: [
      {
        name: '행 아이디',
        key: 'id',
        type: 'number',
        hide: true,
        editable: false,
        suppressNavigable: true,
      },
      { name: '연번', key: 'no', type: 'text' },
      { name: '날짜', key: 'date', type: 'date' },
      { name: '입찰기관', key: 'bid_org', type: 'text' },
      { name: '낙찰업체', key: 'win_company', type: 'text' },
      { name: '상위사업자', key: 'parent_company', type: 'text' },
      { name: '기관명', key: 'org_name', type: 'text' },
      { name: '특이사항', key: 'notes', type: 'text' },
      { name: '진행담당자', key: 'role_person', type: 'text' },
      { name: '공고연번', key: 'bid_num', type: 'text' },
      { name: '계약일자', key: 'contract_date', type: 'date' },
      { name: '납품일자', key: 'delivery_date', type: 'date' },
      { name: '마크장비', key: 'mark_equip', type: 'text' },
      { name: '기초금액', key: 'base_price', type: 'number' },
      { name: '낙찰금액', key: 'win_price', type: 'number' },
      { name: '낙찰율(%)', key: 'win_rate', type: 'number' },
      { name: '매입원가', key: 'purchase_cost', type: 'number' },
      { name: '최종납품권수', key: 'final_delivery_quantity', type: 'number' },
      { name: '최종매출액', key: 'final_sales', type: 'number' },
      { name: '결제방식', key: 'payment_method', type: 'text' },
      { name: '선금일자', key: 'pre_payment_date', type: 'date' },
      { name: '선입금액', key: 'pre_payment', type: 'number' },
      { name: '예정잔금', key: 'expected_balance', type: 'number' },
      { name: '잔금', key: 'balance', type: 'number' },
      { name: '잔금일자', key: 'balance_date', type: 'date' },
      { name: '총입금액', key: 'total_payment', type: 'number' },
      { name: '최종납품정가', key: 'final_delivery_price', type: 'number' },
      { name: '최종도서매출액', key: 'final_bk_sales', type: 'number' },
      { name: '수익금', key: 'revenue', type: 'number' },
      { name: '순이익금', key: 'net_revenue', type: 'number' },
      { name: '업체연락처', key: 'company_contact', type: 'text' },
      { name: '업체담당자', key: 'company_person', type: 'text' },
      { name: '행정담당자연락처', key: 'admin_contact', type: 'text' },
      { name: '행정담당자', key: 'admin_person', type: 'text' },
      { name: '사서연락처', key: 'lib_contact', type: 'text' },
      { name: '사서담당자', key: 'lib_person', type: 'text' },
    ],
  },
  {
    label: '장서점검+도서폐기',
    key: 'book_disposal',
    columns: [
      {
        name: '행 아이디',
        key: 'id',
        type: 'number',
        hide: true,
        editable: false,
        suppressNavigable: true,
      },
      { name: '연번', key: 'no', type: 'number' },
      { name: '날짜', key: 'date', type: 'date' },
      { name: '낙찰업체', key: 'win_company', type: 'text' },
      { name: '상위사업자', key: 'parent_company', type: 'text' },
      { name: '구분', key: 'category', type: 'text' },
      { name: '기관명', key: 'org_name', type: 'text' },
      { name: '진행', key: 'status', type: 'text' },
      { name: '비용', key: 'cost', type: 'text' },
      { name: '특이사항', key: 'notes', type: 'text' },
      { name: '진행담당자', key: 'role_person', type: 'text' },
      { name: '마크장비', key: 'mark_equip', type: 'text' },
      { name: '최종납품권수', key: 'final_delivery_bks', type: 'number' },
      { name: '최종매출액', key: 'final_sales', type: 'number' },
      { name: '지출비용', key: 'expend_cost', type: 'number' },
      { name: '선금일자', key: 'pre_payment_date', type: 'date' },
      { name: '선입금액', key: 'pre_payment', type: 'number' },
      { name: '예정잔금', key: 'expected_balance', type: 'number' },
      { name: '잔금', key: 'balance', type: 'number' },
      { name: '잔금일자', key: 'balance_date', type: 'date' },
      { name: '총입금액', key: 'total_payment', type: 'number' },
      { name: '수익금', key: 'revenue', type: 'number' },
      { name: '업체연락처', key: 'company_contact', type: 'text' },
      { name: '업체담당자', key: 'company_person', type: 'text' },
      { name: '행정담당자연락처', key: 'admin_contact', type: 'text' },
      { name: '행정담당자', key: 'admin_person', type: 'text' },
      { name: '사서연락처', key: 'lib_contact', type: 'text' },
      { name: '사서담당자', key: 'lib_person', type: 'text' },
    ],
  },
  {
    label: '물류알바(대구, 창원, 대전)',
    key: 'logistics_job',
    columns: [
      {
        name: '행 아이디',
        key: 'id',
        type: 'number',
        hide: true,
        editable: false,
        suppressNavigable: true,
      },
      { name: '연번', key: 'no', type: 'text' },
      { name: '작성자', key: 'author', type: 'text' },
      { name: '진행건', key: 'progress_item', type: 'text' },
      { name: '수량', key: 'quantity', type: 'text' },
      { name: '발송일자', key: 'shipment_date', type: 'date' },
      { name: '진행인원', key: 'progress_person', type: 'text' },
      { name: '납품일자', key: 'delivery_date', type: 'date' },
      { name: '수수료', key: 'commission', type: 'number' },
      { name: '추가비용', key: 'additional_cost', type: 'number' },
      { name: '정산비용', key: 'settlement_cost', type: 'number' },
      { name: '정산일자', key: 'settlement_date', type: 'date' },
      { name: '발송방법', key: 'shipping_method', type: 'text' },
      { name: '송장연번', key: 'tracking_number', type: 'text' },
      { name: '비고', key: 'remarks', type: 'text' },
    ],
  },
  {
    label: '화물사용',
    key: 'cargo_usage',
    columns: [
      {
        name: '행 아이디',
        key: 'id',
        type: 'number',
        hide: true,
        editable: false,
        suppressNavigable: true,
      },
      { name: '연번', key: 'no', type: 'text' },
      { name: '작성자', key: 'author', type: 'text' },
      { name: '도착지', key: 'destination', type: 'text' },
      { name: '진행건', key: 'progress_item', type: 'text' },
      { name: '수량', key: 'quantity', type: 'text' },
      { name: '발송일자', key: 'shipment_date', type: 'date' },
      { name: '업체', key: 'company', type: 'text' },
      { name: '납품일자', key: 'delivery_date', type: 'date' },
      { name: '요금', key: 'cost', type: 'number' },
      { name: '추가비용', key: 'additional_cost', type: 'text' },
      { name: '정산비용', key: 'settlement_cost', type: 'number' },
      { name: '정산일자', key: 'settlement_date', type: 'date' },
      { name: '차량', key: 'vehicle', type: 'text' },
      { name: '비고', key: 'remarks', type: 'text' },
    ],
  },
  {
    label: '기관',
    key: 'organization',
    columns: [
      {
        name: '아이디',
        key: 'id',
        hide: true,
        type: 'number',
        editable: false,
        suppressNavigable: true,
      },
      {
        name: '입력타이틀',
        key: 'sheet_name',
        hide: true,
        type: 'text',
        editable: false,
        suppressNavigable: true,
      },
      {
        name: '타이틀별연번',
        key: 'sheet_data_num',
        hide: true,
        type: 'number',
        editable: false,
        suppressNavigable: true,
      },
      { name: '연번', key: 'no', type: 'number' },
      { name: '연도', key: 'year', type: 'text' },
      { name: '기관명', key: 'org_name', type: 'text' },
      { name: '마감', key: 'b_close_status', type: 'boolean' },
      { name: '계산서', key: 'invoice_received', type: 'boolean' },
      { name: '낙찰업체', key: 'win_company', type: 'text' },
      { name: '상위사업자', key: 'parent_company', type: 'text' },
      { name: '구분', key: 'category', type: 'text' },
      { name: '특이사항', key: 'notes', type: 'text' },
      { name: '진행담당', key: 'role_person', type: 'text' },
      { name: '원가율확정', key: 'cost_rate', type: 'text' },
      { name: '발주일자', key: 'order_date', type: 'date' },
      { name: '납품일자', key: 'delivery_date', type: 'date' },
      { name: '총 권수', key: 'total_bks', type: 'number' },
      { name: '마크장비', key: 'mark_equip', type: 'text' },
      { name: '도서정가', key: 'bk_price', type: 'number' },
      {
        name: '낙찰금액',
        key: 'win_price',
        type: 'number',
        calc: {
          text: '도서정가 * 낙찰율(%)',
          equation: 'floor(bk_price * win_rate)',
        },
      },
      { name: '낙찰율(%)', key: 'win_rate', type: 'number' },
      {
        name: '도서공급단가',
        key: 'bk_supply_price',
        type: 'number',
        calc: {
          text: '도서정가 * 도서공급율',
          equation: 'floor(bk_price * bk_supply_rate)',
        },
      },
      { name: '도서공급율', key: 'bk_supply_rate', type: 'number' },
      {
        name: '매입원가',
        key: 'purchase_cost',
        type: 'number',
        calc: {
          text: '도서정가 * 도서원가율',
          equation: 'bk_price * bk_cost_late',
        },
      },
      { name: '도서원가율', key: 'bk_cost_late', type: 'number' },
      { name: '기관마,장단가(권당)', key: 'org_m_per_price', type: 'number' },
      {
        name: '기관마,장비정가',
        key: 'org_m_price',
        type: 'number',
        calc: {
          text: '총 권수 * 기관마,장단가(권당)',
          equation: 'total_bks * org_m_per_price',
        },
      },
      {
        name: '마장공급단가',
        key: 'm_supply_price',
        type: 'number',
        calc: {
          text: '총 권수 * 마장공급단가',
          equation: 'total_bks * m_supply_price',
        },
      },
      { name: '마장공급합가', key: 'm_supply_total_price', type: 'number' },
      { name: '품절정가(간접할인등)', key: 'out_of_stock_price', type: 'number' },
      { name: '품절권수', key: 'out_of_stock_bks', type: 'number' },
      {
        name: '최종납품권수',
        key: 'final_delivery_quantity',
        type: 'number',
        calc: {
          text: '총 권수 - 품절권수',
          equation: 'total_bks - out_of_stock_bks',
        },
      },
      {
        name: '마장최종매출액',
        key: 'm_final_sales',
        type: 'number',
        calc: {
          text: '마장공급단가 * 마장공급단가',
          equation: 'm_supply_price * m_supply_price',
        },
      },
      { name: '결제방식', key: 'payment_method', type: 'text' },
      { name: '선입금액', key: 'pre_payment', type: 'number' },
      { name: '선금일자', key: 'pre_payment_date', type: 'date' },
      { name: '잔금', key: 'balance', type: 'number' },
      { name: '잔금일자', key: 'balance_date', type: 'date' },
      {
        name: '예정잔금',
        key: 'expected_balance',
        type: 'number',
        calc: {
          text: '도서공급단가 + 마장공급합가 - 선입금액 - 잔금',
          equation: 'floor(bk_supply_price + m_supply_total_price - pre_payment - balance)',
        },
      },
      { name: '총입금액', key: 'total_payment', type: 'number' },
      {
        name: '최종납품정가',
        key: 'final_delivery_price',
        type: 'number',
        calc: {
          text: '도서정가 - 품절권수',
          equation: 'bk_price - out_of_stock_bks',
        },
      },
      {
        name: '최종도서매출액',
        key: 'final_bk_sales',
        type: 'number',
        calc: {
          text: '도서공급율 * 마장공급단가',
          equation: 'bk_supply_rate * m_supply_price',
        },
      },
      {
        name: '도서수익금',
        key: 'bk_revenue',
        type: 'number',
        calc: {
          text: '최종도서매출액 - (마장공급단가 * 도서원가율)',
          equation: 'final_bk_sales - (m_supply_price * bk_cost_late)',
        },
      },
      {
        name: '남은기간',
        key: 'd_day',
        type: 'number',
        calc: {
          text: '납품일 - 이익율',
          equation: 'd-day(delivery_date - revenue_rate)',
        },
      },
      { name: '오늘날짜', key: 'today_date', type: 'date' },
      { name: '순이익금', key: 'net_revenue', type: 'number' },
      { name: '이익율', key: 'revenue_rate', type: 'number' },
    ],
  },
  {
    label: '매입처 원장',
    key: 'vendor_ledger',
    columns: [
      {
        name: '아이디',
        key: 'id',
        hide: true,
        type: 'number',
        editable: false,
        suppressNavigable: true,
      },
      { name: '작성자', key: 'author', type: 'text' },
      { name: '매입처', key: 'vendor', type: 'text', hide: true },
      { name: '발주건', key: 'order_item', type: 'text' },
      { name: '발주일자', key: 'vl_order_date', type: 'date' },
      { name: '기초금액', key: 'vl_base_price', type: 'number' },
      { name: '도서공급단가', key: 'vl_bk_supply_price', type: 'number' },
      { name: '매입가', key: 'vl_purchase_price', type: 'number' },
      { name: '매입율', key: 'vl_purchase_rate', type: 'number' },
      { name: '자사이익금', key: 'vl_our_revenue', type: 'number' },
      { name: '자사이익률', key: 'vl_our_revenue_rate', type: 'number' },
      { name: '현황', key: 'status', type: 'text' },
      { name: '수금일', key: 'collection_date', type: 'date' },
      { name: '송금일', key: 'remittance_date', type: 'text' },
      { name: '계산서발행일', key: 'vl_invoice_date', type: 'date' },
      { name: '계산서수신사업자', key: 'invoice_recipient', type: 'text' },
      { name: '계좌정보', key: 'account_info', type: 'text' },
      { name: '업체담당자', key: 'manager', type: 'text' },
      { name: '업체담당자전화번호', key: 'manager_phone', type: 'text' },
    ],
  },
  {
    label: '매출처 원장',
    key: 'client_ledger',
    columns: [
      {
        name: '아이디',
        key: 'id',
        hide: true,
        type: 'number',
        editable: false,
        suppressNavigable: true,
      },
      { name: '매출처', key: 'client', type: 'text', hide: true },
      { name: '내역', key: 'details', type: 'text' },
      { name: '발주상태', key: 'order_status', type: 'text' },
      { name: '발주일자', key: 'cl_order_date', type: 'date' },
      { name: '입금상태', key: 'deposit_status', type: 'text' },
      { name: '입금일자', key: 'deposit_date', type: 'date' },
      { name: '선금상태', key: 'pre_payment_status', type: 'text' },
      { name: '선금일자', key: 'cl_pre_payment_date', type: 'date' },
      { name: '도서정가', key: 'cl_bk_price', type: 'number' },
      { name: '도서공급율', key: 'cl_bk_supply_rate', type: 'number' },
      { name: '도서공급단가', key: 'bk_supply_price', type: 'number' },
      { name: '총입금액', key: 'cl_total_payment', type: 'number' },
      { name: '매입율', key: 'cl_purchase_rate', type: 'number' },
      { name: '매입가', key: 'cl_purchase_price', type: 'number' },
      { name: '자사이익율', key: 'cl_our_revenue_rate', type: 'number' },
      { name: '자사이익금', key: 'cl_our_revenue', type: 'number' },
      { name: '잔액', key: 'expected_balance', type: 'number' },
      { name: '계산서발행일', key: 'cl_invoice_date', type: 'date' },
      { name: '비고', key: 'remarks', type: 'text' },
    ],
  },
  {
    label: '마크장비 납품 현황',
    key: 'mark_status',
    columns: [
      {
        name: '아이디',
        key: 'id',
        hide: true,
        type: 'number',
        editable: false,
        suppressNavigable: true,
      },
      { name: '연번', key: 'number', type: 'number' },
      { name: '기재일', key: 'entry_date', type: 'date' },
      { name: '장비', key: 'equipment', type: 'text' },
      { name: '구분', key: 'category', type: 'text' },
      { name: '마크팀', key: 'name', type: 'text' },
      { name: '완료월', key: 'completion_month', type: 'text' },
      { name: '납품지역', key: 'region', type: 'text' },
      { name: '납품처', key: 'destination', type: 'text' },
      { name: '계약업체', key: 'contracted_company', type: 'text' },
      { name: '수량', key: 'quantity', type: 'number' },
      { name: '최종정산수량', key: 'final_settlement_quantity', type: 'number' },
      { name: '정산금액', key: 'settlement_amount', type: 'number' },
      { name: '정산월', key: 'settlement_month', type: 'text' },
      { name: '매출액', key: 'sales_amount', type: 'number' },
      { name: '입금일', key: 'deposit_date', type: 'date' },
      { name: '발주', key: 'order', type: 'text' },
      { name: '납품기한', key: 'delivery_deadline', type: 'date' },
      { name: '(마크장비)비고', key: 'notes', type: 'text' },
      { name: '(마크장비)목록전달', key: 'list_delivery', type: 'date' },
      { name: '(마크장비)규격(IP 전달)', key: 'ip_delivery', type: 'date' },
      { name: '(마크장비)마크요청', key: 'mark_request', type: 'date' },
      { name: '(마크장비)마크완료', key: 'mark_completion', type: 'date' },
      { name: '(마크장비)품절전달', key: 'out_of_stock', type: 'date' },
      { name: '(마크장비)장비 시작', key: 'equipment_start', type: 'date' },
      { name: '(마크장비)투입인원수', key: 'personnel_count', type: 'number' },
      { name: '(마크장비)장비 완료', key: 'completion', type: 'date' },
      { name: '(마크장비)품절처리', key: 'out_of_stock_status', type: 'text' },
      { name: '(도서관 담당자)연락처/이메일', key: 'contact', type: 'text' },
      { name: '(도서관 담당자)담당자', key: 'manager', type: 'text' },
    ],
  },
]

export const FORM_FILEDS = {
  client: [{ name: '거래처명', key: 'name', type: 'input', required: true, errMsg: '거래처명을 입력해주세요.' }],
  vendor: [
    { name: '업체명', key: 'name', type: 'input', required: true, errMsg: '업체명을 입력해주세요.' },
    { name: '대표', key: 'representative', type: 'input', required: true, errMsg: '대표 성함을 입력해주세요' },
    { name: '휴대전화', key: 'mobile_phone', type: 'textarea', required: false, errMsg: '' },
    { name: '사무실대표연번', key: 'office_phone', type: 'textarea', required: false, errMsg: '' },
    { name: '이메일', key: 'email', type: 'textarea', required: false, errMsg: '' },
    { name: '출고율', key: 'shipping_rate', type: 'textarea', required: false, errMsg: '' },
    { name: '결제', key: 'payment', type: 'input', required: false, errMsg: '' },
    { name: '특징', key: 'notes', type: 'textarea', required: false, errMsg: '' },
  ],
  mark_info: [
    { name: '거래처명', key: 'name', type: 'input', required: true, errMsg: '거래처명을 입력해주세요.' },
    { name: '아이피 주소', key: 'ip_address', type: 'input', required: false, errMsg: '' },
    { name: '전화연번', key: 'phone', type: 'input', required: false, errMsg: '' },
    { name: '이메일', key: 'email', type: 'input', required: false, errMsg: '' },
    { name: '주소', key: 'address', type: 'textarea', required: false, errMsg: '' },
    { name: '특징', key: 'notes', type: 'textarea', required: false, errMsg: '' },
  ],
  organization: [
    { name: '연간', key: 'year', type: 'inputnumber', required: true, errMsg: '연도를 선택해주세요' },
    { name: '기관명', key: 'name', type: 'input', required: true, errMsg: '기관명을 입력해주세요' },
  ],
}
