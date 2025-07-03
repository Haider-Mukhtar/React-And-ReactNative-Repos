import { type ReactNode } from "react";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { type RootState } from "@/store";

const RouteGuard = ({ children }: { children: ReactNode }) => {
  const { token } = useSelector((state: RootState) => state.global);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RouteGuard;
