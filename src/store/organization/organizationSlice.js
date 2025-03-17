import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import api from '../../api/api'

// Thunks
export const getAllOrganization = createAsyncThunk('organization-info/get', async () => {
  const result = await api
    .get('/organization/info')
    .then((res) => res.data)
    .catch((error) => {
      throw new Error('error: ', error)
    })
  return result
})

export const createOrganization = createAsyncThunk('organization-info/create', async (data) => {
  const result = await api
    .post('/organization/register', { data })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error('error: ', error)
    })
  console.log('organization info post result: ', result)
  return result
})

export const updateOrganization = createAsyncThunk('organization-info/update', async (payload) => {
  const result = await api
    .put(`/organization/update/${payload.id}`, { data: { ...payload } })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error('error: ', error)
    })
  console.log('organization info put result: ', result)
  const { id, ...rest } = result
  return { id, changes: { ...rest } }
})

// Adapter
const infoAdapter = createEntityAdapter({
  selectId: (org) => org.id,
})

// Initial State
const initialState = infoAdapter.getInitialState({
  error: null, // 에러 상태 추가
})

// Slice
export const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET
    builder.addCase(getAllOrganization.fulfilled, infoAdapter.setAll).addCase(getAllOrganization.rejected, (state, action) => {
      state.error = action.error.message // 에러 메시지 저장
    })

    // POST
    builder.addCase(createOrganization.fulfilled, infoAdapter.addOne).addCase(createOrganization.rejected, (state, action) => {
      state.error = action.error.message // 에러 메시지 저장
    })

    // PUT
    builder.addCase(updateOrganization.fulfilled, infoAdapter.updateOne).addCase(updateOrganization.rejected, (state, action) => {
      state.error = action.error.message // 에러 메시지 저장
    })
  },
})

// Action creators
// export const {} = organizationSlice.actions;

// Selectors
export const {
  selectAll: selectAllOrganization,
  selectById: selectOrganizationById,
  selectIds: selectOrganizationIds,
} = infoAdapter.getSelectors((state) => state.organization)

export default organizationSlice.reducer
