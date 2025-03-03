import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Route, Routes } from "react-router-dom";

import BuilderPage from "./pages/BuilderPage";

ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  return (
    <Routes>
      <Route path="/" element={<BuilderPage />} />
      <Route path="/:documentId" element={<BuilderPage />}>
        <Route path=":organizationId" element={<BuilderPage />} />
      </Route>
    </Routes>
  );
}

export default App;
