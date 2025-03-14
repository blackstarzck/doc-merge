import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Thunks
export const getAllClientInfo = createAsyncThunk('client-info/get', async () => {
  const result = await axios
    .get('/client')
    .then((res) => res.data)
    .catch((error) => console.log('error: ', error))
  console.log('client result: ', result)
  return result
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
  },
})

// Selectors
export const {
  selectAll: selectAllClientInfo,
  selectById: selectClientInfoById,
  selectIds: selectClientIds,
} = infoAdapter.getSelectors((state) => state.clientInfo)

export default clientInfoSlice.reducer
