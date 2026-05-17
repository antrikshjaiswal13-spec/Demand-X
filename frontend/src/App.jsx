import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Prediction from "./pages/Prediction"
import Warehouse from "./pages/Warehouse"
import Analytics from "./pages/Analytics"

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/prediction" element={<Prediction />} />

        <Route path="/warehouse" element={<Warehouse />} />

        <Route path="/analytics" element={<Analytics />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App