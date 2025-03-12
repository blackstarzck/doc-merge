import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"

import { LOCAL_STORAGE_KEY } from "../../components/keys"
import { DEFAULT_FORMAT_ITEMS } from "../../constants/options"

// Adapter
const formatAdapter = createEntityAdapter({
  selectId: (format) => format.key,
})

// Initial State

const localStorageFormatItems = localStorage.getItem(LOCAL_STORAGE_KEY)
const initialState = formatAdapter.getInitialState(
  {
    loading: "idle", // 두 번째 인자에 entity 가 될 수 있는 객체를 넣어줘야 함
  },
  localStorageFormatItems
    ? JSON.parse(localStorageFormatItems)
    : DEFAULT_FORMAT_ITEMS
)

export const FORMATTER_MODAL_NAME = "formatter"

export const formatItemsSlice = createSlice({
  name: "formatItems",
  initialState,
  reducers: {
    setFormatItems: formatAdapter.setAll,
    addFormatItem: (state, action) => {
      formatAdapter.addOne(state, action.payload)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.entities))
    },
    removeFormatItem: (state, action) => {
      formatAdapter.removeOne(state, action.payload)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.entities))
    },
    updateFormatItem: (state, action) => {
      formatAdapter.updateOne(state, action.payload)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.entities))
    },
  },
})

export const {
  setFormatItems,
  addFormatItem,
  removeFormatItem,
  updateFormatItem,
} = formatItemsSlice.actions

// Selectors
export const {
  selectAll: selectAllFormatItems,
  selectById: selectFormatItemByKey,
} = formatAdapter.getSelectors((state) => state.formatItems)

export default formatItemsSlice.reducer
