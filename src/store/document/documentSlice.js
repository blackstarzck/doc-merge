import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import api from '../../api/api'

// Thunks
export const getDocument = createAsyncThunk('document/get', async (path) => {
  console.log('path: ', path)
  return await api
    .get(path)
    .then((res) => res.data)
    .catch((error) => {
      throw new Error('GET-ERROR. 콘솔로그를 확인해주세요.')
    })
})

export const postDocument = createAsyncThunk('document/update', async (payload, { rejectWithValue }) => {
  const { path, document } = payload
  const result = await api
    .post(path, { document })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error('GET-ERROR. 콘솔로그를 확인해주세요.')
    })
  return result
})

export const deleteDocument = createAsyncThunk('document/delete', async (payload) => {
  const { path, ids } = payload
  console.log('payload: ', payload)
  const result = await api
    .post(`${path}/delete`, { ids })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error('GET-ERROR. 콘솔로그를 확인해주세요.')
    })
  return result
})

// Adapter
const documentAdapter = createEntityAdapter({
  selectId: (doc) => doc.id,
})

// Initial State
const initialState = documentAdapter.getInitialState({
  get: { loading: false, error: null },
  post: { loading: false, error: null },
  delete: { loading: false, error: null },
})

// Slice
export const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET
    builder
      .addCase(getDocument.pending, (state) => {
        state.get.loading = true
        state.get.error = null
      })
      .addCase(getDocument.fulfilled, (state, action) => {
        state.get.loading = false
        documentAdapter.setAll(state, action.payload) // 배열로 전체 설정
      })
      .addCase(getDocument.rejected, (state, action) => {
        state.get.loading = false
        state.get.error = action.payload ?? 'Failed to get document'
      })

    // POST
    builder
      .addCase(postDocument.pending, (state) => {
        state.post.loading = true
        state.post.error = null
      })
      .addCase(postDocument.fulfilled, (state, action) => {
        console.log('fulfilled payload.data:', action.payload)
        state.post.loading = false
        documentAdapter.upsertMany(state, action.payload) // 배열로 추가/업데이트
      })
      .addCase(postDocument.rejected, (state, action) => {
        state.post.loading = false
        state.post.error = action.payload ?? 'Failed to update document'
      })

    // DELETE
    builder
      .addCase(deleteDocument.pending, (state) => {
        state.delete.loading = true
        state.delete.error = null
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.delete.loading = false
        documentAdapter.removeMany(state, action.payload) // 배열로 추가/업데이트
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.delete.loading = false
        state.delete.error = action.payload ?? 'Failed to update document'
      })
  },
})

// Action creators
export const { setDocuments, addDocuments } = documentSlice.actions

// Selectors
export const {
  selectAll: selectAllDocuments,
  selectById: selectDocumentById,
  selectIds: selectDocumentIds,
} = documentAdapter.getSelectors((state) => state.document)

export default documentSlice.reducer
