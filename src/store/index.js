import { configureStore } from '@reduxjs/toolkit'

import clientInfoReducer from './clientInfo/clientInfoSlice'
import documentReducer from './document/documentSlice'
import formatReducer from './format/formatSlice'
import formatItemsReducer from './formatItems/formatItemsSlice'
import thunk from './middleware/thunk'
import modalsReducer from './modals/modalsSlice'
import organizationInfoReducer from './organizationInfo/organizationInfoSlice'
import selectedRowReducer from './selectedRows/selectedRowIdSlice'
import vendorInfoReducer from './vendorInfo/vendorInfoSlice'

export default configureStore({
  reducer: {
    document: documentReducer,
    selectedRows: selectedRowReducer,
    organizationInfo: organizationInfoReducer,
    vendorInfo: vendorInfoReducer,
    clientInfo: clientInfoReducer,
    modals: modalsReducer,
    formatItems: formatItemsReducer,
    format: formatReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})
