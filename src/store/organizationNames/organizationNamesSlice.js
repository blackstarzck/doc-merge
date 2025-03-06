import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

// Thunks
export const getOrgNames = createAsyncThunk("org-name/get", async () => {
  const result = await axios
    .get("/organizations/names")
    .then((res) => res.data);
  console.log("result: ", result);
  return result;
});

// Adapter
const orgNamesAdapter = createEntityAdapter({
  selectId: (name) => name.id,
});

// Initial State
const initialState = orgNamesAdapter.getInitialState();

// Slice
export const orgNamesSlice = createSlice({
  name: "orgnames",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET
    builder.addCase(getOrgNames.fulfilled, orgNamesAdapter.setAll);
  },
});

// Action creators
// export const {} = orgNamesSlice.actions;

// Selectors
export const {
  selectAll: selectAllNames,
  selectById: selectNameById,
  selectIds: selectNameIds,
} = orgNamesAdapter.getSelectors((state) => state.orgnames);

export default orgNamesSlice.reducer;
