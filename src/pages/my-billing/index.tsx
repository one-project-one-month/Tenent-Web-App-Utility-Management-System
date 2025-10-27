import { useSearchParams } from "react-router";
import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import infoIcon from "@/assets/web_tenants_icons/info.svg";
import billIcon from "@/assets/web_tenants_icons/bill.svg";
import electricIcon from "@/assets/web_tenants_icons/electric_meter.svg";
import waterIcon from "@/assets/web_tenants_icons/water.svg";
import wifiIcon from "@/assets/web_tenants_icons/wifi.svg";
import cleaningIcon from "@/assets/web_tenants_icons/cleaning.svg";
import rentIcon from "@/assets/web_tenants_icons/Property.svg";
import analyticsIcon from "@/assets/web_tenants_icons/analytics.svg";
import historyIcon from "@/assets/web_tenants_icons/history.svg";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardWrapper from "@/pages/my-billing/components/CardWrapper";
import OverviewCard from "@/pages/my-billing/components/OverviewCard";
import BillingHistory from "@/pages/my-billing/components/BillingHistory";
import TabsContentCard from "@/pages/my-billing/components/TabsContentCard";
import { getUtilityDataFromBills } from "@/pages/my-billing/utils/billingDataUtils";
import { getInvoiceTableData } from "@/pages/my-billing/utils/tableDataUtils";
import { useBillingData } from "@/hooks/use-billing";

// Styles
const tabTriggerStyle =
  "px-2 py-1 transition data-[state=active]:bg-[#3E70FF] data-[state=active]:text-white text-[#4F4F4F] text-base hover:bg-[#3E70FF]/10 cursor-pointer";
const commonCard = "bg-[#F5F5F5] border border-[#E0E0E0] rounded-[8px]";

type Status = "Paid" | "Pending" | "Overdue";
const statusColors: Record<Status, string> = {
  Paid: "bg-[#58DA8F80] text-[#11321F]",
  Pending: "bg-[#F5D47080] text-[#605020]",
  Overdue: "bg-[#F87171]/20 text-[#B91C1C]",
};

// BillingCard Component
interface BillingCardProps {
  icon: string;
  title: string;
  amount: string | number | undefined;
}

const BillingCard = ({ icon, title, amount }: BillingCardProps) => (
  <div className={`${commonCard} flex justify-between items-center px-3 py-4`}>
    <div className="flex gap-3 items-center">
      <div className="rounded-[8px] bg-[#3E70FF] py-2 px-3">
        <img src={icon} alt={`${title} Icon`} />
      </div>
      <p className="text-lg font-medium text-[#4F4F4F]">{title}</p>
    </div>
    <p className="text-xl font-medium text-[#333333]">
      {Number(amount ?? 0).toLocaleString()} MMK
    </p>
  </div>
);

// Main Billing Component
const Billing = () => {
  const tenantId = useSelector((state: RootState) => state.auth.user?.tenantId);
  // const tenantId = "a86215cd-f4e7-4553-8bd9-9ce4933198f2";
  const { history, isLoading, isError, error } = useBillingData(tenantId);
  const { electricData, waterData, chart, currentBill } = useMemo(
    () => getUtilityDataFromBills(history),
    [history]
  );

  const otherFee = currentBill
    ? Number(currentBill.groundFee ?? 0) +
      Number(currentBill.carParkingFee ?? 0) +
      Number(currentBill.fineFee ?? 0)
    : 0;

  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = useMemo(
    () => Math.ceil(getInvoiceTableData(history).length / 10),
    [history]
  );

  useEffect(() => {
    const pageFromUrl = Math.max(
      1,
      parseInt(searchParams.get("page") || "1", 10)
    );
    if (pageFromUrl !== currentPage && pageFromUrl <= totalPages) {
      setCurrentPage(pageFromUrl);
    } else if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
      setSearchParams({ page: totalPages.toString() });
    }
  }, [searchParams, totalPages, currentPage, setSearchParams]);

  if (isLoading) return <Spinner className="mx-auto size-6"></Spinner>;
  if (isError) return <p>Error: {error?.message || "Failed to load data"}</p>;

  return (
    <section>
      <div className="flex flex-col gap-8 lg:gap-10 xl:gap-14 py-5 lg:py-7 lg:px-4">
        <header className="flex gap-24 items-center lg:gap-0 md:justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="text-h2 text-[#333333]">My Billing</h1>
            <p className="text-h5 text-[#4F4F4F]">
              Manage your utility bills and payment history
            </p>
          </div>
          <Badge
            className={`py-1 px-2 h-fit ${
              statusColors[currentBill?.invoice?.status as Status]
            }`}
          >
            {currentBill?.invoice?.status ?? "Pending"}
          </Badge>
        </header>

        <OverviewCard
          totalAmount={currentBill?.totalAmount ?? undefined}
          dueDate={currentBill?.dueDate ?? undefined}
          status={currentBill?.invoice?.status ?? "Pending"}
        />

        <CardWrapper
          icon={billIcon}
          title="Current Bill Breakdown"
          description={`Detailed breakdown of ${new Date(
            currentBill?.createdAt ?? Date.now()
          ).toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })} charges`}
        >
          <div className="flex flex-col gap-6 lg:gap-8">
            <BillingCard
              icon={electricIcon}
              title="Electricity"
              amount={currentBill?.electricityFee ?? undefined}
            />
            <BillingCard
              icon={waterIcon}
              title="Water"
              amount={currentBill?.waterFee ?? undefined}
            />
            <BillingCard
              icon={wifiIcon}
              title="WiFi"
              amount={currentBill?.wifiFee ?? undefined}
            />
            <BillingCard
              icon={cleaningIcon}
              title="Service"
              amount={currentBill?.serviceFee ?? undefined}
            />
            <BillingCard
              icon={rentIcon}
              title="Rent"
              amount={currentBill?.rentalFee ?? undefined}
            />
            {otherFee && (
              <BillingCard icon={infoIcon} title="Other" amount={otherFee} />
            )}
            <div
              className={`${commonCard} flex justify-between items-center px-3 py-4`}
            >
              <p className="text-[#3E70FF] text-xl lg:text-2xl font-medium">
                Total Amount Due
              </p>
              <p className="text-[#3E70FF] text-xl lg:text-2xl font-medium">
                {Number(currentBill?.totalAmount ?? 0).toLocaleString()} MMK
              </p>
            </div>
          </div>
        </CardWrapper>

        <CardWrapper
          icon={analyticsIcon}
          title="Usage Analytics"
          description="Track your utility consumption over time"
        >
          <Tabs defaultValue="electric" className="flex flex-col gap-8">
            <div className="py-3 px-6 bg-[#F5F5F5] rounded-[20px]">
              <TabsList className="flex justify-around w-full">
                <TabsTrigger value="electric" className={tabTriggerStyle}>
                  Electric
                </TabsTrigger>
                <TabsTrigger value="water" className={tabTriggerStyle}>
                  Water
                </TabsTrigger>
              </TabsList>
            </div>
            <div>
              <TabsContentCard
                value="electric"
                data={electricData}
                chartData={chart.electricUsage}
                unit="Units"
                title="Last 4 months electric consumption"
              />
              <TabsContentCard
                value="water"
                data={waterData}
                chartData={chart.waterUsage}
                unit="Liters(L)"
                title="Last 4 months water consumption"
              />
            </div>
          </Tabs>
        </CardWrapper>

        <CardWrapper
          icon={historyIcon}
          title="Billing History"
          description="Your billing and payment records"
        >
          <BillingHistory
            history={history}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setSearchParams={setSearchParams}
          />
        </CardWrapper>
      </div>
    </section>
  );
};

export default Billing;
