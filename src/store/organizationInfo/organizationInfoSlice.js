import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Thunks
export const getAllOrganizationInfo = createAsyncThunk('organization-info/get', async () => {
  const result = await axios.get('/organization/info').then((res) => res.data)
  // console.log("result: ", result);
  return result
})

// Adapter
const infoAdapter = createEntityAdapter({
  selectId: (name) => name.id,
})

// Initial State
const initialState = infoAdapter.getInitialState()

// Slice
export const organizationInfoSlice = createSlice({
  name: 'organizationInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET
    builder.addCase(getAllOrganizationInfo.fulfilled, infoAdapter.setAll)
  },
})

// Action creators
// export const {} = organizationInfoSlice.actions;

// Selectors
export const {
  selectAll: selectAllOrganizationInfo,
  selectById: selectOrganizationInfoById,
  selectIds: selectOrganizationIds,
} = infoAdapter.getSelectors((state) => state.organizationInfo)

export default organizationInfoSlice.reducer
