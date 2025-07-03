import { Outlet } from "react-router-dom";

import MaxWidthWrapper from "./max-width-wrapper";
import Navbar from "./navbar";

const GlobalLayout = () => {
  return (
    <div className="flex w-full flex-col items-start justify-start md:h-screen">
      <Navbar />
      <div className="mt-16 w-full p-5 md:h-[calc(100vh-64px)] md:p-5">
        <MaxWidthWrapper>
          <Outlet />
        </MaxWidthWrapper>
      </div>
    </div>
  );
};

export default GlobalLayout;
