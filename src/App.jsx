import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Navigate, Route, Routes } from "react-router-dom";

import { OVERVIEW_TABLES } from "./constants/menu";
import BuilderPage from "./pages/BuilderPage";

ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={`/${OVERVIEW_TABLES[0].key}`} replace />}
      />
      <Route path="/:documentId" element={<BuilderPage />} />
      <Route path="/organization" element={<Navigate to="1" replace />} />
      <Route path="/organization/:organizationId" element={<BuilderPage />} />
    </Routes>
  );
}

export default App;
