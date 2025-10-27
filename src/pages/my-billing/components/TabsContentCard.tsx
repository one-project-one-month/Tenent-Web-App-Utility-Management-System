import { MonthlyUsageChart } from "@/pages/my-billing/components/MonthlyUsageChart";
import { TabsContent } from "@/components/ui/tabs";

interface UsageItem {
  title: string;
  amount: number | string;
  unit: string;
}

interface UsageData {
  month: string;
  value: number;
}

interface TabsContentProps {
  value: string;
  data: UsageItem[];
  chartData: UsageData[];
  unit: string;
  title: string;
}

const TabsContentCard = ({
  value,
  data,
  chartData,
  unit,
  title,
}: TabsContentProps) => (
  <TabsContent
    value={value}
    className="grid grid-cols-1 lg:grid-cols-[1fr_2.3fr] xl:grid-cols-[1fr_1.3fr] gap-5  lg:px-5"
  >
    {/* cards */}
    <div className="flex flex-col gap-9">
      {data.map((item, index) => (
        <div
          key={index}
          className="py-3 px-4 rounded-[8px] bg-[#F5F5F5] border border-[#3E70FF]"
        >
          <h3 className="text-base text-[#4F4F4F]">{item.title}</h3>
          <p className="text-lg font-medium text-[#333333]">
            {item.amount.toLocaleString() ?? 0} {item.unit ?? ""}
          </p>
        </div>
      ))}
    </div>

    {/* chart */}
    <div className="-mx-4 lg:-mx-0">
      <MonthlyUsageChart
        title={title}
        subTitle="Usage Trend"
        chartData={chartData || []}
        unit={unit}
        name={value}
      />
    </div>
  </TabsContent>
);

export default TabsContentCard;
