import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Thunks
export const getAllClientInfo = createAsyncThunk('client-info/get', async () => {
  const result = await axios
    .get('/client')
    .then((res) => res.data)
    .catch((error) => console.log('error: ', error))
  console.log('client get result: ', result)
  return result
})

export const createClient = createAsyncThunk('client-info/create', async (data) => {
  const result = await axios
    .post('/client', { data })
    .then((res) => res.data)
    .catch((error) => console.log('error: ', error))
  console.log('client post result: ', result)
  return result
})

export const updateClient = createAsyncThunk('client-info/update', async (payload) => {
  console.log('payload: ', payload)
  const result = await axios
    .put(`/client/${payload.id}`, { data: { ...payload } })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error('error: ', error)
    })
  console.log('client put result: ', result)
  const { id, ...rest } = result
  return { id, changes: { ...rest } }
})

// Adapter
const infoAdapter = createEntityAdapter({
  selectId: (name) => name.id,
})

// Initial State
const initialState = infoAdapter.getInitialState()

export const clientInfoSlice = createSlice({
  name: 'clientInfo',
  initialState,
  extraReducers: (builder) => {
    // GET
    builder.addCase(getAllClientInfo.fulfilled, infoAdapter.setAll)
    // POST
    builder.addCase(createClient.fulfilled, infoAdapter.addOne)
    // PUT
    builder.addCase(updateClient.fulfilled, infoAdapter.updateOne)
  },
})

export const { updateClientById } = clientInfoSlice.actions

// Selectors
export const {
  selectAll: selectAllClientInfo,
  selectById: selectClientInfoById,
  selectIds: selectClientIds,
} = infoAdapter.getSelectors((state) => state.clientInfo)

export default clientInfoSlice.reducer
