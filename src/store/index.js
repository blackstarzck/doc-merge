import { configureStore } from "@reduxjs/toolkit"

import thunk from "./middleware/thunk"
import modalsSliceReducer from "./modals/modalsSlice"
import organizationsSliceReducer from "./organizations/organizationsSlice"
import selectedRowSliceReducer from "./selectedRows/selectedRowIdSlice"

export default configureStore({
  reducer: {
    organizations: organizationsSliceReducer,
    selectedRows: selectedRowSliceReducer,
    modals: modalsSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})
