import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

// Thunks
export const getAllClient = createAsyncThunk('client-info/get', async () => {
  const result = await api
    .get('/client')
    .then((res) => res.data)
    .catch((error) => {
      throw new Error('error: ', error)
    })
  console.log('client get result: ', result)
  return result
})

export const createClient = createAsyncThunk('client-info/create', async (data) => {
  const result = await api
    .post('/client', { data })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error('error: ', error)
    })
  console.log('client post result: ', result)
  return result
})

export const updateClient = createAsyncThunk('client-info/update', async (payload) => {
  const result = await api
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
  selectId: (client) => client.id,
})

// Initial State
const initialState = infoAdapter.getInitialState()

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  extraReducers: (builder) => {
    // GET
    builder.addCase(getAllClient.fulfilled, infoAdapter.setAll)
    // POST
    builder.addCase(createClient.fulfilled, infoAdapter.addOne)
    // PUT
    builder.addCase(updateClient.fulfilled, infoAdapter.updateOne)
  },
})

export const { updateClientById } = clientSlice.actions

// Selectors
export const { selectAll: selectAllClient, selectById: selectClientById, selectIds: selectClientIds } = infoAdapter.getSelectors((state) => state.client)

export default clientSlice.reducer
