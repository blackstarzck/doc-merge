import { configureStore } from '@reduxjs/toolkit'

import clientReducer from './client/clientSlice'
import documentReducer from './document/documentSlice'
import formatReducer from './format/formatSlice'
import formatItemsReducer from './formatItems/formatItemsSlice'
import markClientInfoReducer from './markClient/markClientSlice'
import thunk from './middleware/thunk'
import modalsReducer from './modals/modalsSlice'
import organizationInfoReducer from './organization/organizationSlice'
import selectedRowReducer from './selectedRows/selectedRowIdSlice'
import vendorReducer from './vendor/vendorSlice'

export default configureStore({
  reducer: {
    document: documentReducer,
    selectedRows: selectedRowReducer,
    organization: organizationInfoReducer,
    vendor: vendorReducer,
    client: clientReducer,
    markClient: markClientInfoReducer,
    modals: modalsReducer,
    formatItems: formatItemsReducer,
    format: formatReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})
