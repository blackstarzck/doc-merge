import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const documentSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    setDocuments: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDocuments, setLoading, setError } = documentSlice.actions;

export default documentSlice.reducer;
