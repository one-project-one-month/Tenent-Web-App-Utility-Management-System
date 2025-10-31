import {
    Bar,
    BarChart,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    Legend,
} from "recharts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";

interface UsageData {
    month: string;
    value: number;
    unit: string;
}

interface ChartProps {
    title: string;
    subTitle: string;
    chartData: UsageData[];
    name: string;
}

export const MonthlyUsageChart = ({
                                      title,
                                      subTitle,
                                      chartData,
                                      name,
                                  }: ChartProps) => {
    const chartConfig = {
        usage: {
            label: title,
            color: "#2563eb",
        },
    } satisfies ChartConfig;

    return (
        <Card className="shadow-sm border border-gray-200 rounded-sm">
            <CardHeader>
                <CardTitle className="flex flex-col gap-1 text-xs font-light text-[#4F4F4F]">
                    {title}
                    <span className="text-sm font-medium text-[#4F4F4F]">{subTitle}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pr-6">
                <ChartContainer config={chartConfig} className="w-full h-[300px]">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false}/>
                        <XAxis dataKey="month"/>
                        <YAxis/>
                        <Tooltip content={<ChartTooltipContent/>}/>
                        <Legend
                            content={() => (
                                <div className="flex flex-col flex-wrap items-center gap-2 mt-2">
                                    {chartData.map(({month, value, unit}) => (
                                        <div
                                            key={month}
                                            className="flex items-center justify-between w-full pl-12 text-xs"
                                        >
                                            <div className="text-xs text-[#4F4F4F]">
                                                {month} {name} usage
                                            </div>
                                            <div className="text-xs font-medium text-[#333333]">
                                                {value.toLocaleString()} {unit}
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
    );
};
