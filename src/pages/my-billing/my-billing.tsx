import { Button } from "@/components/ui/button";
import { Outlet, useLocation, useNavigate } from "react-router";
import BreadCrumb from "@/components/common/bread-crumb";
import { useMemo } from "react";

const MyBilling = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const navigate = useNavigate();

  const isLatestBill = useMemo(() => pathName === "/my-billing", [pathName]);
  const isBillingHistory = useMemo(
    () => pathName === "/my-billing/billing-history",
    [pathName]
  );

  return (
    <div className="pt-4 mb-12 lg:py-9 lg:px-4 xl:px-0">
      <section
        className="flex flex-col gap-11 lg:gap-14"
        aria-label="Billing Section"
      >
        <header className="flex flex-col gap-9 lg:gap-20">
          <nav aria-label="Breadcrumb">
            <BreadCrumb />
          </nav>
          <h1 className="text-h1 text-center text-[#333333]">
            {isLatestBill ? "Billing Details" : "Billing History"}
          </h1>
        </header>
        <div
          className="w-fit flex justify-between bg-white rounded-lg p-2 xl:mx-26 border border-gray-200"
          role="tablist"
        >
          <Button
            size="sm"
            onClick={() => navigate("/my-billing")}
            className={
              isLatestBill
                ? "bg-primary border-none hover:bg-primary text-white"
                : "bg-white hover:bg-white text-black border-none"
            }
            aria-selected={isLatestBill}
            role="tab"
            aria-label="View Latest Bill"
          >
            Latest Bill
          </Button>
          <Button
            size="sm"
            onClick={() => navigate("/my-billing/billing-history")}
            className={
              isBillingHistory
                ? "bg-primary border-none hover:bg-primary text-white"
                : "bg-white hover:bg-white text-black border-none"
            }
            aria-selected={isBillingHistory}
            role="tab"
            aria-label="View Billing History"
          >
            Billing History
          </Button>
        </div>
        <main>
          <Outlet />
        </main>
      </section>
    </div>
  );
};

export default MyBilling;
