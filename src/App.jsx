import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { App as AntdApp } from 'antd'
import { Navigate, Route, Routes } from 'react-router-dom'

import { TABLE_COLUMNS } from './constants/tables'
import BuilderPage from './pages/BuilderPage'

ModuleRegistry.registerModules([AllCommunityModule])

function App() {
  return (
    <AntdApp>
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

        <Route path="/mark_status" element={<Navigate to="1" replace />} />
        <Route path="/mark_status/:markClientId" element={<BuilderPage />} />

        <Route path="*" element={<Navigate to={`/overview/${TABLE_COLUMNS[0].key}`} replace />} />
      </Routes>
    </AntdApp>
  )
}

export default App
