import { Button } from "@/components/ui/button";
import { toast } from "sonner";


const Home = () => {
  return (
    <div>
      <h1 className="bg-primary text-primary-foreground">Home</h1>
      <Button
        className=" my-2"
        onClick={() => {
          toast.success("Welcome");
        }}
      >
        Click Me Updated
  
      </Button>
      <h1 className="text-h1">Additional Text to see the effect of font proterty</h1>

    </div>
  );
};

export default Home;
