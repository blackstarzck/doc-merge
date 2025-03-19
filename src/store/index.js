import { configureStore } from '@reduxjs/toolkit'

import accessReducer from './access/accessSlice'
import clientReducer from './client/clientSlice'
import clientLedgerReducer from './clientLedger/clientLedgerSlice'
import documentReducer from './document/documentSlice'
import formatReducer from './format/formatSlice'
import formatItemsReducer from './formatItems/formatItemsSlice'
import markClientInfoReducer from './markClient/markClientSlice'
import thunk from './middleware/thunk'
import modalsReducer from './modals/modalsSlice'
import organizationInfoReducer from './organization/organizationSlice'
import selectedRowReducer from './selectedRows/selectedRowIdSlice'
import vendorReducer from './vendor/vendorSlice'
import vendorLedgerReducer from './vendorLedger/vendorLedgerSlice'

export default configureStore({
  reducer: {
    document: documentReducer,
    selectedRows: selectedRowReducer,
    organization: organizationInfoReducer,
    vendor: vendorReducer,
    vendorLedger: vendorLedgerReducer,
    client: clientReducer,
    clientLedger: clientLedgerReducer,
    markClient: markClientInfoReducer,
    modals: modalsReducer,
    formatItems: formatItemsReducer,
    format: formatReducer,
    access: accessReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})
