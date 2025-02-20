import { Route, Routes } from "react-router-dom";

import BuilderPage from "./pages/BuilderPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BuilderPage />} />
      <Route path="/:documentId" element={<BuilderPage />} />
    </Routes>
  );
}

export default App;
