import { Button } from "@/components/ui/button";
import { Outlet, useLocation, useNavigate } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const MyBilling = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const navigate = useNavigate();

  return (
    <div>
      <Breadcrumb className="mt-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/my-billing">My Billing</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary">
              {pathName === "/my-billing" ? "Latest Bill" : "Billing History"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
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
