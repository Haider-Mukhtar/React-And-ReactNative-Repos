import { Navigate, Route, Routes } from "react-router"

import Login from "./pages/login"
import Register from "./pages/register"
import Home from "./pages/home"
import RouteGuard from "./components/route-guard"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<RouteGuard />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App