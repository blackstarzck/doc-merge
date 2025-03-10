import { createSlice } from "@reduxjs/toolkit"

// 기본 모달 속성 정의
const defaultModalState = {
  key: null,
  label: null,
  visible: false,
  elements: {
    all: null,
    first_columns_repeat: null,
    second_columns_repeat: null,
    first_rows_repeat: null,
    second_rows_repeat: null,
    last_column: null,
    first_column: null,
    header_row: null,
    footer_row: null,
  },
}

// 초기 상태: 모달 이름별 객체
const initialState = {
  modals: {
    formatter: { ...defaultModalState },
  },
}

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    updateContents: (state, action) => {
      console.log("updateContents: ", action.payload)
      const { modalName, key, label, visible, elements } = action.payload
      state.modals[modalName] = {
        ...state.modals[modalName],
        modalName,
        key,
        label,
        visible,
        elements: elements || state.modals[modalName].elements, // elements 유지 가능
      }
    },
    // 모달 초기화 리듀서 추가
    resetModal: (state, action) => {
      const { modalName } = action.payload
      state.modals[modalName] = { ...defaultModalState }
    },
  },
})

export const { updateContents, resetModal } = modalsSlice.actions

export default modalsSlice.reducer
