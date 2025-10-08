import { Button } from "@/components/ui/button";
import { Outlet, useLocation, useNavigate } from "react-router";
import BreadCrumb from "@/components/common/bread-crumb";

const CustomerService = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const navigate = useNavigate();

  return (
    <div>
      <BreadCrumb />
      <h1 className="text-h1 my-10 text-center">Customer Service</h1>
      <div className="w-65 flex justify-between bg-white rounded-lg p-2 border-1 border-gray-200">
        <Button
          size="sm"
          onClick={() => navigate("/customer-service")}
          className={
            pathName === "/customer-service"
              ? "bg-primary border-none hover:bg-primary text-white"
              : "bg-white hover:bg-white text-black border-none"
          }
        >
          New Request
        </Button>
        <Button
          size="sm"
          onClick={() => navigate("/customer-service/service-history")}
          className={
            pathName === "/customer-service/service-history"
              ? "bg-primary border-none hover:bg-primary text-white"
              : "bg-white hover:bg-white text-black border-none"
          }
        >
          Service History
        </Button>
      </div>
      <Outlet />
    </div>
  );
};

export default CustomerService;
