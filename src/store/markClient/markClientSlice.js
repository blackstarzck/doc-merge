import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import api from '../../api/api'

// Thunks
export const getAllMarkClient = createAsyncThunk('mark-client/get', async () => {
  const result = await api
    .get('/mark_info/client')
    .then((res) => res.data)
    .catch((error) => {
      throw new Error('error: ', error)
    })
  console.log('mark client get result: ', result)
  return result
})

export const createMarkClient = createAsyncThunk('mark-client/create', async (data) => {
  console.log('create mark client data: ', data)
  const result = await api
    .post('/mark_info/client', { data })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error('error: ', error)
    })
  console.log('mark client post result: ', result)
  return result
})

export const updateMarkClient = createAsyncThunk('mark-client/update', async (payload) => {
  const result = await api
    .put(`/mark_info/client/${payload.id}`, { data: { ...payload } })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error('error: ', error)
    })
  console.log('mark client put result: ', result)
  const { id, ...rest } = result
  return { id, changes: { ...rest } }
})

// Adapter
const infoAdapter = createEntityAdapter({
  selectId: (client) => client.id,
})

// Initial State
const initialState = infoAdapter.getInitialState()

export const markClientSlice = createSlice({
  name: 'markClient',
  initialState,
  extraReducers: (builder) => {
    // GET
    builder.addCase(getAllMarkClient.fulfilled, infoAdapter.setAll)
    // POST
    builder.addCase(createMarkClient.fulfilled, infoAdapter.addOne)
    // PUT
    builder.addCase(updateMarkClient.fulfilled, infoAdapter.updateOne)
  },
})

// Selectors
export const {
  selectAll: selectAllMarkClient,
  selectById: selectMarkClientById,
  selectIds: selectMarkClientIds,
} = infoAdapter.getSelectors((state) => state.markClient)

export default markClientSlice.reducer
