import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Overview = () => {
  return (
    <div className="h-screen">
      <h1 className="bg-blue-500 text-white">OverView</h1>
      <Button
        className="bg-blue-600 my-2"
        onClick={() => {
          toast.success("Welcome overView");
        }}
      >
        Click Me Updated
      </Button>
    </div>
  );
};

export default Overview;
