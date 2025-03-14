import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { Navigate, Route, Routes } from 'react-router-dom'

import { TABLE_COLUMNS } from './constants/menu'
import BuilderPage from './pages/BuilderPage'

ModuleRegistry.registerModules([AllCommunityModule])

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/overview/${TABLE_COLUMNS[0].key}`} replace />} />

      <Route path="/overview" element={<Navigate to="1" replace />} />
      <Route path="/overview/:documentId" element={<BuilderPage />} />

      <Route path="/organization" element={<Navigate to="1" replace />} />
      <Route path="/organization/:organizationId" element={<BuilderPage />} />

      <Route path="/client_ledger" element={<Navigate to="1" replace />} />
      <Route path="/client_ledger/:clientId" element={<BuilderPage />} />

      <Route path="/vendor_ledger" element={<Navigate to="1" replace />} />
      <Route path="/vendor_ledger/:vendorId" element={<BuilderPage />} />
    </Routes>
  )
}

export default App
