import { Route, Routes } from "react-router-dom";

import AuthLayout from "./components/auth-layout";
import GlobalLayout from "./components/global-layout";
import RouteGuard from "./components/route-guard";
import AddBusiness from "./pages/add-business";
import BusinessDetails from "./pages/business-details";
import Businesses from "./pages/businesses";
import Dashboard from "./pages/dashboard";
import EditBusiness from "./pages/edit-business";
import Login from "./pages/login";
import Tickets from "./pages/tickets";

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<Login />} />
      </Route>
      <Route
        element={
          <RouteGuard>
            <GlobalLayout />
          </RouteGuard>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/agents" element={<Businesses />} />
        <Route path="/agents/:id" element={<BusinessDetails />} />
        <Route path="/agents/add-agent" element={<AddBusiness />} />
        <Route path="/agents/edit-agent/:id" element={<EditBusiness />} />
        <Route path="/tickets" element={<Tickets />} />
      </Route>
    </Routes>
  );
};

export default App;
