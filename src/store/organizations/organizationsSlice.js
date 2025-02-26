import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: null,
  loading: false,
  error: null,
}

export const organizationsSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {
    setOrganizations: (state, action) => {
      state.data = action.payload
    },
    setLoading: (state, action) => {
      state.loading = true
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setOrganizations, setLoading, setError } =
  organizationsSlice.actions

export default organizationsSlice.reducer
