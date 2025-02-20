import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formatter: {
    visible: false,
  },
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setVisibleState: (state, action) => {
      const { modalName, visible } = action.payload;

      state[modalName].visible = visible;
    },
  },
});

export const { setVisibleState } = modalsSlice.actions;

export default modalsSlice.reducer;
