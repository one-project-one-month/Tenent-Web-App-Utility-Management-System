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

const CustomerService = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const navigate = useNavigate();

  return (
    <div>
      <Breadcrumb className="mt-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/customer-service">
              Customer Service
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary">
              {pathName === "/customer-service"
                ? "New Request"
                : "Service History"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
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
