import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { pages } from "@/lib/pages";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronRight, LogOut } from "lucide-react";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between max-w-7xl mx-auto my-4">
      <div className="flex items-center gap-2">
        <img src="logo-final.svg" alt="logo" className="h-12 w-12" />
        <h2>NestFlow</h2>
      </div>
      <div className="flex items-center gap-6">
        {pages.map((page) => (
          <NavLink
            to={page.path}
            key={page.name}
            className={({ isActive }) =>
              `hover:text-blue-500 ${isActive ? "font-bold text-blue-500" : ""}`
            }
          >
            {page.name}
          </NavLink>
        ))}
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer flex items-center gap-2 outline-none">
            <h3 className="text-blue-500">
              Hi, <span className="text-black">Jenny Wilson</span>
            </h3>
            <Avatar className="w-9 h-9 ring-2 ring-gray-300 shadow-sm hover:scale-105 transition">
              <AvatarImage src={""} />
              <AvatarFallback className="bg-gray-200 text-black font-bold">
                JW
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-40 space-y-1">
            <DropdownMenuItem asChild>
              <Link to="/profile" className="flex items-center">
                View My Profile
                <ChevronRight className="w-4 h-4 ml-auto" />
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer !bg-red-600 focus:!bg-red-700 text-white">
              Logout
              <LogOut className="w-4 h-4 ml-auto text-white" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
