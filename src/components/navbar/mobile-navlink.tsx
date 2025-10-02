import { pages } from "@/lib/pages";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link, NavLink } from "react-router";
import { ChevronRight, LogOut, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MobileNavlink = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Menu className="w-6 h-6 cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="right" className="w-64 ">
          <div className="flex flex-col gap-6 mt-6 mx-6 ">
            {/* Profile */}
            <div className="flex items-center gap-3 mt-14">
              <Avatar className="w-12 h-12 ring-2 ring-gray-300 shadow-sm">
                <AvatarImage src={""} />
                <AvatarFallback className="bg-gray-200 text-black font-bold">
                  JW
                </AvatarFallback>
              </Avatar>
              <h3 className="text-blue-500">
                Hi, <span className="text-black">Jenny Wilson</span>
              </h3>
            </div>

            {/* Nav Links */}
            <div className="flex flex-col gap-8 mt-5">
              {pages.map((page) => (
                <NavLink
                  key={page.name}
                  to={page.path}
                  className={({ isActive }) =>
                    `hover:text-primary ${
                      isActive ? "font-bold text-primary" : ""
                    }`
                  }
                >
                  {page.name}
                </NavLink>
              ))}
            </div>

            <div className="absolute bottom-3 right-0 px-4 space-y-6 w-full ">
              <hr />
              {/* Logout */}
              <Link
                to="/profile"
                className="flex items-center justify-center gap-2"
              >
                View My Profile
                <ChevronRight className="w-4 h-4" />
              </Link>

              <button className="w-full flex items-center justify-center gap-2 bg-destructive text-secondary py-2 rounded-md hover:bg-destructive/90">
                Logout
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNavlink;
