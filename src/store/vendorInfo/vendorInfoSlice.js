import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Thunks
export const getAllVendorInfo = createAsyncThunk('vendor-info/get', async () => {
  const result = await axios
    .get('/vendor')
    .then((res) => res.data)
    .catch((error) => console.log('error: ', error))
  console.log('vendor result: ', result)
  return result
})

// Adapter
const infoAdapter = createEntityAdapter({
  selectId: (name) => name.id,
})

// Initial State
const initialState = infoAdapter.getInitialState()

export const vendorInfoSlice = createSlice({
  name: 'vendorInfo',
  initialState,
  extraReducers: (builder) => {
    // GET
    builder.addCase(getAllVendorInfo.fulfilled, infoAdapter.setAll)
  },
})

// Selectors
export const {
  selectAll: selectAllVendorInfo,
  selectById: selectVendorInfoById,
  selectIds: selectVendorIds,
} = infoAdapter.getSelectors((state) => state.vendorInfo)

export default vendorInfoSlice.reducer
