import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const NewBillAlert = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenAlert = localStorage.getItem("hasSeenNewBillAlert") === "true";
    if (hasSeenAlert) return;

    const timer = setTimeout(() => {
      setOpen(true);
      localStorage.setItem("hasSeenNewBillAlert", "true");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewBill = () => {
    setOpen(false);
    navigate("/my-billing");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="text-text-primary w-[500px]">
        <DialogHeader >
          <DialogTitle className="text-h3 text-center">New Bill Has Arrived!</DialogTitle>
          <DialogDescription className="text-base mt-2 text-center">
            Hi Jenny! Your utility bill for September has been generated and is
            now ready for payment. Please view the details before the due date
            25.10.2025 to avoid any late fees.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:flex-row sm:justify-center mt-4">
          <Button variant="secondary" onClick={handleClose} className="bg-gray-300 font-normal">
            Close
          </Button>
          <Button onClick={handleViewBill} className="text-white font-normal">View Bill Details</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewBillAlert;
