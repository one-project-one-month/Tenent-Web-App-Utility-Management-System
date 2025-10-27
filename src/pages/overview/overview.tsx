import { data } from "@/data/mock-data";
import MonthlyUsageChart from "@/components/common/monthly-usage-chart";
import { Button } from "@/components/ui/button";
import { BadgeCheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import NewBillAlert from "@/components/overview/new-bill-alert";

const Overview = () => {
  return (
    <div className="h-full text-text-primary">
      <NewBillAlert />
      <div className="flex justify-between items-center my-10 ">
        <div>
          <h1 className="text-h2 text-gray-700 font-semibold">Overview</h1>
          <h3 className="text-h6 text-gray-700 font-medium">
            Your utility usage and billing summary for  <br /> September 2025
          </h3>
        </div>
        <Badge
          variant="default"
          className="bg-secondary text-black font-light text-sm font-normal px-4 py-2"
        >
          <BadgeCheckIcon style={{width:"15px", height:"15px"}} />
          All Payment Current
        </Badge>
      </div>
      <div className="flex justify-between items-center border-1 border-gray-200 p-4 mb-10 rounded-sm shadow-sm w-full bg-card">
        <div className="flex flex-col gap-2">
          <p className="text-md text-gray-500">Total Amount Due</p>
          <p className="text-body-1">642,000 MMK</p>
          <p className="text-md text-gray-500">Due Date: October 25, 2025</p>
        </div>
        <Button className="text-white text-sm font-light">
          View Billing Details
        </Button>
      </div>
      <div className="mb-10 flex gap-3">
        <MonthlyUsageChart
          title="Last 4 Months Electric Consumption"
          subTitle="Usage Trends"
          chartData={data.electricUsage}
          unit="Units"
        />
        <MonthlyUsageChart
          title="Total monthly charges including all utilities"
          subTitle="Monthly Spending"
          chartData={data.monthlySpending}
          unit="Lakhs"
        />
      </div>
    </div>
  );
};

export default Overview;
