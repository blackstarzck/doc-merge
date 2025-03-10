import { configureStore } from "@reduxjs/toolkit"

import documentSliceReducer from "./document/documentSlice"
import formatSliceReducer from "./format/formatSlice"
import formatItemsReducer from "./formatItems/formatItemsSlice"
import thunk from "./middleware/thunk"
import modalsSliceReducer from "./modals/modalsSlice"
import orgNamesSliceReducer from "./organizationNames/organizationNamesSlice"
import selectedRowSliceReducer from "./selectedRows/selectedRowIdSlice"

export default configureStore({
  reducer: {
    document: documentSliceReducer,
    selectedRows: selectedRowSliceReducer,
    orgnames: orgNamesSliceReducer,
    modals: modalsSliceReducer,
    formatItems: formatItemsReducer,
    format: formatSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})
