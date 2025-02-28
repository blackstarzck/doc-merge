import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { postApi } from "../../api"

export const updateDocument = createAsyncThunk(
  "document/update",
  async (payload) => {
    console.log("payload: ", payload)
    const response = await postApi[payload.documentId](payload)
    return response
  }
)

const initialState = {
  data: null,
  loading: false,
  error: null,
}

export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    setDocument: (state, action) => {
      console.log("setDocument dispatch: ", action.payload)
      state.data = action.payload
    },
    setLoading: (state, action) => {
      state.loading = true
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    // pending 상태
    builder.addCase(updateDocument.pending, (state) => {
      state.loading = true
      state.error = null
    })
    // fulfilled 상태
    builder.addCase(updateDocument.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })
    // rejected 상태
    builder.addCase(updateDocument.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload ?? "Something went wrong"
    })
  },
})

// Action creators are generated for each case reducer function
export const { setDocument, setLoading, setError } = documentSlice.actions

export default documentSlice.reducer
