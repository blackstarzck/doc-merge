import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import api from '../../api/api'

// Thunks
export const getClientLedger = createAsyncThunk('client-ledger-info/get', async (payload) => {
  const { id } = payload
  const result = await api
    .get(`/client_ledger/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw new Error('error: ', error)
    })
  return result
})

export const postClientLedger = createAsyncThunk('client-ledger-info/create', async (data) => {
  const result = await api
    .post('/client_ledger', { data })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error('error: ', error)
    })
  console.log('client-ledger post result: ', result)
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

export const clientLedgerSlice = createSlice({
  name: 'clientLedger',
  initialState,
  extraReducers: (builder) => {
    // GET
    builder.addCase(getClientLedger.fulfilled, infoAdapter.setAll)
    // POST
    builder.addCase(postClientLedger.fulfilled, infoAdapter.addOne)
  },
})

// Selectors
export const { selectAll: selectClientLedger, selectById: selectClientLedgerById } = infoAdapter.getSelectors((state) => state.clientLedger)

export default clientLedgerSlice.reducer
