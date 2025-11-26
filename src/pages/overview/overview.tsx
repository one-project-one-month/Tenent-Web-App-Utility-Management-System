import MonthlyUsageChart from "@/components/common/monthly-usage-chart";
import { Button } from "@/components/ui/button";
import { BadgeCheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import NewBillAlert from "@/components/overview/new-bill-alert";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import useChartData from "@/hooks/use-chart-data";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { FourSquare } from "react-loading-indicators";

const Overview = () => {
  const tenantId = useSelector((state: RootState) => state.auth.user?.tenantId);
  const navigate = useNavigate();
  const { data, isLoading, isError } = useChartData(tenantId);

  // Format date to month name (e.g., "September 2025")
  const formatMonth = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long" });
  };

  // Transform bills data for electricity consumption chart
  const electricityChartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    return data
      .slice(0, 4) // Get last 4 months
      .map((bill) => ({
        month: formatMonth(bill?.createdAt ?? ""),
        value: bill.totalUnit?.electricityUnits
          ? parseFloat(bill.totalUnit.electricityUnits)
          : 0,
      }))
      .reverse(); // Show oldest to newest
  }, [data]);

  // Transform bills data for monthly spending chart (in lakhs)
  const monthlySpendingChartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    return data
      .slice(0, 4) // Get last 4 months
      .map((bill) => ({
        month: formatMonth(bill?.createdAt ?? ""),
        value: parseFloat(bill.totalAmount ?? "0") / 100000, // Convert to lakhs
      }))
      .reverse(); // Show oldest to newest  
  }, [data]);

  // Get latest bill for summary
  const latestBill = data?.[0];

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <FourSquare
          color="#2563eb"
          size="medium"
          text="Loading Overview..."
          textColor=""
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-full text-text-primary flex items-center justify-center">
        <p>Error loading data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="h-full text-text-primary">
      <NewBillAlert />
      <div className="flex flex-col sm:flex-row gap-4 items-start md:items-center justify-between enter my-5 ">
        <div>
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold">Overview</h1>
            <p className="text-md">
              Your utility usage and billing summary for <br />{" "}
              {latestBill
                && formatMonth(latestBill?.createdAt ?? "")
              }
            </p>
          </div>
        </div>
        <Badge
          variant="default"
          className="bg-secondary text-black  text-sm font-normal px-4 py-2"
        >
          <BadgeCheckIcon style={{ width: "15px", height: "15px" }} />
          All Payment Current
        </Badge>
      </div>
      {/* Billing overview */}
      <div className="flex flex-wrap gap-4 justify-between items-start md:items-center border border-gray-200 p-4 mb-10 rounded-sm shadow-sm w-full bg-card">
        <div className="flex flex-col gap-2">
          <p className="text-md text-gray-500">Total Amount Due</p>
          <p className="text-body-1">
            {latestBill
              ? `${parseFloat(latestBill?.totalAmount ?? "0").toLocaleString()} MMK`
              : "0 MMK"}
          </p>
          <p className="text-md text-gray-500">
            Due Date:{" "}
            {latestBill
              ? new Date(latestBill?.dueDate ?? "").toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
              : ""}
          </p>
        </div>
        <Button onClick={() => navigate("/my-billing")} className="text-white text-sm font-light w-full md:w-fit">View Billing Details</Button>
      </div>
      {/* Chart overview */}
      <div className="mb-10 flex w-full flex-col gap-4 md:flex-row md:flex-wrap">
        {electricityChartData.length > 0 && (
          <MonthlyUsageChart
            title="Last 4 Months Electric Consumption"
            subTitle="Usage Trends"
            chartData={electricityChartData}
            unit="Units"
          />
        )}
        {monthlySpendingChartData.length > 0 && (
          <MonthlyUsageChart
            title="Total monthly charges including all utilities"
            subTitle="Monthly Spending"
            chartData={monthlySpendingChartData}
            unit="Lakhs"
          />
        )}
      </div>
    </div>
  );
};

export default Overview;
