import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

import type { RootState } from "../store";

const RouteGuard = () => {
  const { token } = useSelector((state: RootState) => state.global);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RouteGuard;
