import { Route, Routes } from "react-router-dom"

import BuilderPage from "./pages/BuilderPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<BuilderPage />} />
      <Route path="/:organizationId" element={<BuilderPage />}>
        <Route path=":sheetId" element={<BuilderPage />} />
      </Route>
    </Routes>
  )
}

export default App
