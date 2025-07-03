import { useNavigate } from "react-router";
import MaxWidthWrapper from "./max-width-wrapper"

import { useSelector } from "react-redux";
import type { RootState } from "../store";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.global);

  const handleLogout = () => {
    localStorage.clear();
    void navigate("/");
  };

  return (
    <div className="bg-violet-700">
      <MaxWidthWrapper>
        <div className="flex flex-row justify-between items-center px-8 py-4 text-white">
          <h1 className="text-3xl font-bold">Redux</h1>
          <div className="flex flex-row gap-4">
            <button
              className="bg-red-100 hover:bg-red-200 text-red-700 font-semibold px-4 py-1 rounded transition"
              onClick={() => {handleLogout()}}
            >
              Log out
            </button>
            <div className="flex flex-col bg-violet-900 p-2 rounded">
              <p>{user?.first_name} {user?.last_name}</p>
              <p>{user?.email}</p>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default Navbar