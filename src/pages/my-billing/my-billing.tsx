import { Button } from "@/components/ui/button";
import { Outlet, useLocation, useNavigate } from "react-router";
import BreadCrumb from "@/components/common/bread-crumb";

const MyBilling = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const navigate = useNavigate();

  return (
    <div>
      <BreadCrumb />
      <h1 className="text-h1 my-10 text-center">{pathName === "/my-billing" ? "Latest Bill" : "Billing History"}</h1>
      <div className="w-55 flex justify-between bg-white rounded-lg p-2 border-1 border-gray-200">
        <Button
          size="sm"
          onClick={() => navigate("/my-billing")}
          className={
            pathName === "/my-billing"
              ? "bg-primary border-none hover:bg-primary text-white"
              : "bg-white hover:bg-white text-black border-none"
          }
        >
          Latest Bill
        </Button>
        <Button
          size="sm"
          onClick={() => navigate("/my-billing/billing-history")}
          className={
            pathName === "/my-billing/billing-history"
              ? "bg-primary border-none hover:bg-primary text-white"
              : "bg-white hover:bg-white text-black border-none"
          }
        >
          Billing History
        </Button>
      </div>
      <Outlet />
    </div>
  );
};

export default MyBilling;
