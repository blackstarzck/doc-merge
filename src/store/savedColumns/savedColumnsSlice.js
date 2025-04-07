import { createSlice } from '@reduxjs/toolkit'
import { LOCAL_STORAGE_COLUMN_KEY } from '../../components/keys'
import { TABLE_COLUMNS } from '../../constants/tables'

// Initial State
const tablesColumns = Object.fromEntries(TABLE_COLUMNS.map((table) => [table.key, { label: table.label, key: table.key, columns: table.columns }]))

const setLocalStorageColumns = () => {
  if (!localStorage.getItem(LOCAL_STORAGE_COLUMN_KEY)) {
    localStorage.setItem(LOCAL_STORAGE_COLUMN_KEY, JSON.stringify(tablesColumns))
  }
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_COLUMN_KEY))
}

const initialState = {
  loading: 'idle',
  data: setLocalStorageColumns(),
}

export const SavedColumnsSlice = createSlice({
  name: 'savedColumns',
  initialState,
  reducers: {
    setTableColumns: (state, action) => {
      state.data = action.payload
      localStorage.setItem(LOCAL_STORAGE_COLUMN_KEY, JSON.stringify(action.payload))
    },
  },
})

export const { setTableColumns } = SavedColumnsSlice.actions

// Selectors
export const selectAllTableColumns = (state) => state.savedColumns.data || []

export default SavedColumnsSlice.reducer
