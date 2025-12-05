import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useLogout } from "@/hooks/use-auth";
import type { FormEvent } from "react";
import { LogOut } from "lucide-react";

const LogoutAlert = ({ props }: { props?: string }) => {
  const { mutate: logout } = useLogout();
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            variant={"destructive"}
            className={`text-gray-100 cursor-pointer hover:bg-chart-1 transition-all active:scale-95 w-full ${props}`}
          >
            Logout <LogOut className="w-4 h-4 text-white" />
          </Button>
        </DialogTrigger>
        <DialogContent
          aria-labelledby="logout-dialog-title"
          aria-describedby="logout-dialog-desc"
          className="sm:max-w-[425px] py-8">
          <DialogHeader>
            <DialogTitle
              id="logout-dialog-title"
              className="text-center">
              Are you sure you want to log out?
            </DialogTitle>
            <DialogDescription
              id="logout-dialog-desc"
              className="text-center my-3">
              We’ll keep your data safe. You can log back in anytime.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row gap-2 justify-center sm:justify-center">
            <DialogClose asChild>
              <Button variant="secondary" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              type="submit"
              className="cursor-pointer"
              onClick={handleFormSubmit}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default LogoutAlert;
