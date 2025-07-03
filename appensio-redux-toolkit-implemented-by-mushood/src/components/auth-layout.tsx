import { Outlet } from "react-router-dom";

import LoginImage from "@/assets/img/login.svg";

const AuthLayout = () => {
  return (
    <div className="grid h-screen w-full grid-cols-1 overflow-hidden md:grid-cols-2">
      <div className="col-span-1 hidden h-full w-full md:flex">
        <img
          src={LoginImage}
          alt="login-image"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="col-span-1 h-full w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
