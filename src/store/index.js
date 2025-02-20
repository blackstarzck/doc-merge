import { configureStore } from "@reduxjs/toolkit";

import documentSliceReducer from "./documents/documentSlice";
import thunk from "./middleware/thunk";
import modalsSliceReducer from "./modals/modalsSlice";
import selectedRowSliceReducer from "./selectedRows/selectedRowIdSlice";

export default configureStore({
  reducer: {
    documents: documentSliceReducer,
    selectedRows: selectedRowSliceReducer,
    modals: modalsSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
