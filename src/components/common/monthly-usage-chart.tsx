import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

interface UsageData {
  month: string;
  value: number;
}

interface chartProps {
  title: string;
  subTitle: string;
  chartData: UsageData[];
  unit: string;
}

const MonthlyUsageChart = ({
  title,
  subTitle,
  chartData,
  unit,
}: chartProps) => {
  const chartConfig = {
    usage: {
      label: title,
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full">
      <Card className="bg-card shadow-sm border-1 border-gray-200 rounded-sm">
        <CardHeader>
          <CardTitle className="text-base font-medium">
             {title} 
            <span className="block text-muted-foreground text-sm mt-1">
              {subTitle}
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ChartContainer config={chartConfig} className=" h-[300px] w-[500px]">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <ChartLegend
                content={() => (
                  <div className="flex flex-col  flex-wrap items-center gap-2 mt-2">
                    {chartData.map(({ month, value }) => (
                      <div
                        key={month}
                        className="flex items-center justify-between w-[70%] text-xs"
                      >
                        <div className="text-muted-foreground">
                          {month} 
                        </div>
                        <div className="text-muted-foreground">
                          {value} {unit}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              />
              <Bar
                dataKey="value"
                fill="var(--color-usage)"
                radius={4}
                maxBarSize={45}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlyUsageChart;
