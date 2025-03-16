import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

// Thunks
export const getAllVendor = createAsyncThunk('vendor-info/get', async () => {
  const result = await api
    .get('/vendor')
    .then((res) => res.data)
    .catch((error) => {
      throw new Error('error: ', error)
    })
  console.log('vendor get result: ', result)
  return result
})

export const createVendor = createAsyncThunk('vendor-info/create', async (data) => {
  const result = await api
    .post('/vendor', { data })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error('error: ', error)
    })
  console.log('vendor post result: ', result)
  return result
})

export const updateVendor = createAsyncThunk('vendor-info/update', async (payload) => {
  const result = await api
    .put(`/vendor/${payload.id}`, { data: { ...payload } })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error('error: ', error)
    })
  console.log('vendor put result: ', result)
  const { id, ...rest } = result
  return { id, changes: { ...rest } }
})

// Adapter
const infoAdapter = createEntityAdapter({
  selectId: (vendor) => vendor.id,
})

// Initial State
const initialState = infoAdapter.getInitialState()

export const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  extraReducers: (builder) => {
    // GET
    builder.addCase(getAllVendor.fulfilled, infoAdapter.setAll)
    // POST
    builder.addCase(createVendor.fulfilled, infoAdapter.addOne)
    // PUT
    builder.addCase(updateVendor.fulfilled, infoAdapter.updateOne)
  },
})

// Selectors
export const { selectAll: selectAllVendor, selectById: selectVendorById, selectIds: selectVendorIds } = infoAdapter.getSelectors((state) => state.vendor)

export default vendorSlice.reducer
