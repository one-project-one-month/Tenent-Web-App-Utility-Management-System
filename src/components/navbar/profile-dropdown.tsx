import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router";
import { ChevronRight, LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useLogout } from "@/hooks/useAuth";

const ProfileDropdown = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { mutate: logout } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer flex items-center gap-2 outline-none md:mr-4">
        <h3 className="text-primary">
          Hi, <span className="text-foreground">{user?.user_name}</span>
        </h3>
        <Avatar className="w-9 h-9 ring-2 ring-ring shadow-sm hover:scale-105 transition">
          <AvatarImage src={""} />
          <AvatarFallback className="bg-gray-200 text-foreground font-bold">
            {user?.user_name?.charAt(0)}{user?.user_name?.charAt(1)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 space-y-2">
        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center">
            View My Profile <ChevronRight className="w-4 h-4 ml-auto" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer !bg-destructive focus:!bg-destructive/90 text-white" onClick={() => logout()}>
          Logout <LogOut className="w-4 h-4 ml-auto text-white" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
