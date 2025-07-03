import { useState } from "react";

import { LogoutCurve, User } from "iconsax-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { navItems } from "@/lib/constants";
import { cn } from "@/lib/utils";

import MaxWidthWrapper from "./max-width-wrapper";
import { Avatar } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import WarningModal from "./warning-modal";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [logout, setLogout] = useState<boolean>(false);

  return (
    <>
      <nav className="fixed top-0 z-50 h-16 w-full">
        <MaxWidthWrapper className="flex items-center justify-between border-b bg-white px-5 xl:px-0">
          <div className="flex items-center justify-center gap-10">
            {navItems.map((item) => (
              <Link
                to={item.link}
                key={item.id}
                className={cn("text-[16px] leading-[16px] font-bold", {
                  "text-primary":
                    pathname === item.link ||
                    pathname.startsWith(`${item.link}/`),
                })}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="flex items-center justify-center bg-gray-200">
                <User size={20} color="#000000" />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLogout(true)}>
                <LogoutCurve size={20} color="#000000" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </MaxWidthWrapper>
      </nav>
      <WarningModal
        open={logout}
        title="Are you Sure"
        text={
          <span>
            You want to Logout? <br />
            You can always log back in.
          </span>
        }
        setOpen={setLogout}
        cta={() => {
          localStorage.clear();
          void navigate("/");
        }}
      />
    </>
  );
};

export default Navbar;
