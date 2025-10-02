import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router";
import { ChevronRight, LogOut } from "lucide-react";

const ProfileDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer flex items-center gap-2 outline-none md:mr-4">
        <h3 className="text-primary">
          Hi, <span className="text-foreground">Jenny Wilson</span>
        </h3>
        <Avatar className="w-9 h-9 ring-2 ring-ring shadow-sm hover:scale-105 transition">
          <AvatarImage src={""} />
          <AvatarFallback className="bg-gray-200 text-foreground font-bold">
            JW
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 space-y-2">
        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center">
            View My Profile <ChevronRight className="w-4 h-4 ml-auto" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer !bg-destructive focus:!bg-destructive/90 text-white">
          Logout <LogOut className="w-4 h-4 ml-auto text-white" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
