import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

export const selectedRowSlice = createSlice({
  name: "selectedRows",
  initialState,
  reducers: {
    setSelectedRow: (state, action) => {
      console.log("action.payload: ", action.payload);
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedRow } = selectedRowSlice.actions;

export default selectedRowSlice.reducer;
