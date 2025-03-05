import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit"

import { deleteApi, getApi, postApi } from "../../api"

// Thunks
export const getDocument = createAsyncThunk("document/get", async (payload) => {
  return await getApi[payload.documentId]()
})

export const updateDocument = createAsyncThunk(
  "document/update",
  async (payload) => {
    const { documentId, document } = payload
    console.log("update payload: ", payload)
    return await postApi[documentId](document)
  }
)

export const deleteDocument = createAsyncThunk(
  "document/delete",
  async (payload) => {
    const { documentId, ids } = payload
    console.log("delete payload: ", payload)
    return await deleteApi[documentId](ids)
  }
)

// Adapter
const documentAdapter = createEntityAdapter({
  selectId: (doc) => doc?.id,
})

// Initial State
const initialState = documentAdapter.getInitialState({
  get: { loading: false, error: null },
  post: { loading: false, error: null },
})

// Slice
export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    setDocuments: documentAdapter.setAll, // 리스트 전체 설정
    addDocuments: documentAdapter.addMany, // 복수 문서 추가
  },
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
        state.get.error = action.payload ?? "Failed to get document"
      })

    // POST
    builder
      .addCase(updateDocument.pending, (state) => {
        state.post.loading = true
        state.post.error = null
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.post.loading = false
        console.log("updateDocument fulfilled action.payload:", action.payload)
        documentAdapter.upsertMany(state, action.payload) // 배열로 추가/업데이트
      })
      .addCase(updateDocument.rejected, (state, action) => {
        state.post.loading = false
        state.post.error = action.payload ?? "Failed to update document"
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
