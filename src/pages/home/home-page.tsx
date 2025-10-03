import { Button } from "@/components/ui/button";
import { toast } from "sonner";

//testing
const Home = () => {
  return (
    <div>
      <h1 className="bg-blue-500 text-white">Home</h1>
      <Button
        className="bg-blue-600 my-2"
        onClick={() => {
          toast.success("Welcome");
        }}
      >
        Click Me Updated
      </Button>
    </div>
  );
};
// test
export default Home;
