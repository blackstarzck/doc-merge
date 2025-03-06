import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit"

import { deleteApi, getApi, postApi } from "../../api"

// Thunks
export const getDocument = createAsyncThunk("document/get", async (payload) => {
  console.log("getDocument payload: ", payload)
  const { path, documentId } = payload
  return await getApi[path](documentId)
})

export const postDocument = createAsyncThunk(
  "document/update",
  async (payload, { rejectWithValue }) => {
    const { documentId, document } = payload
    try {
      const res = await postApi[documentId](document)
      console.log("from slice post: ", res)
      return res // { data: [...] } 가정
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to update"
      )
    }
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
        console.log("getDocument payload:", action.payload)
        state.get.loading = false
        documentAdapter.setAll(state, action.payload) // 배열로 전체 설정
      })
      .addCase(getDocument.rejected, (state, action) => {
        state.get.loading = false
        state.get.error = action.payload ?? "Failed to get document"
      })

    // POST
    builder
      .addCase(postDocument.pending, (state) => {
        state.post.loading = true
        state.post.error = null
      })
      .addCase(postDocument.fulfilled, (state, action) => {
        console.log("fulfilled payload.data:", action.payload)
        state.post.loading = false
        documentAdapter.upsertMany(state, action.payload) // 배열로 추가/업데이트
      })
      .addCase(postDocument.rejected, (state, action) => {
        state.post.loading = false
        state.post.error = action.payload ?? "Failed to update document"
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
        state.delete.error = action.payload ?? "Failed to update document"
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
