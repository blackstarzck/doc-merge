import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import api from '../../api/api'

// Thunks
export const getVendorLedger = createAsyncThunk('vendor-ledger-info/get', async (payload) => {
  const { id } = payload
  const result = await api
    .get(`/vendor_ledger/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw new Error('error: ', error)
    })
  return result
})

export const postVendorLedger = createAsyncThunk('vendor-ledger-info/create', async (data) => {
  const result = await api
    .post('/vendor_ledger', { data })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error('error: ', error)
    })
  console.log('vendor-ledger post result: ', result)
  return result
})

// Adapter
const infoAdapter = createEntityAdapter({
  selectId: (ledger) => ledger.id,
  sortComparer: (a, b) => a.id - b.id, // 오름차순 정렬 (ASC)
})

// Initial State
const initialState = infoAdapter.getInitialState({
  get: { loading: false, error: null },
  post: { loading: false, error: null },
})

export const vendorLedgerSlice = createSlice({
  name: 'vendorLedger',
  initialState,
  extraReducers: (builder) => {
    // GET
    builder.addCase(getVendorLedger.fulfilled, infoAdapter.setAll)
    // POST
    builder.addCase(postVendorLedger.fulfilled, infoAdapter.addOne)
  },
})

// Selectors
export const { selectAll: selectVendorLedger, selectById: selectVendorLedgerById } = infoAdapter.getSelectors((state) => state.vendorLedger)

export default vendorLedgerSlice.reducer
