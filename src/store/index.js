import { configureStore } from "@reduxjs/toolkit";

import documentSliceReducer from "./document/documentSlice";
import thunk from "./middleware/thunk";
import modalsSliceReducer from "./modals/modalsSlice";
import orgNamesSliceReducer from "./organizationNames/organizationNamesSlice";
import selectedRowSliceReducer from "./selectedRows/selectedRowIdSlice";

export default configureStore({
  reducer: {
    document: documentSliceReducer,
    selectedRows: selectedRowSliceReducer,
    orgnames: orgNamesSliceReducer,
    modals: modalsSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
