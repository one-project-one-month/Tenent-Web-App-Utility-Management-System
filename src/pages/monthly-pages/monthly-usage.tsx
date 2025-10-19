import BreadCrumb from "@/components/common/bread-crumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { MoveLeft } from "lucide-react";
import { Link } from "react-router";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

interface UsageData {
  month: string;
  value: number;
}

interface UsagePageProps {
  title: string;
  totalLabel: string;
  totalValue: string;
  chartData: UsageData[];
  unit: string;
  buttonText?: string;
  buttonLink?: string;
  iconLink: string;
}

const MonthlyUsage = ({
  title,
  totalLabel,
  totalValue,
  chartData,
  unit,
  buttonText,
  buttonLink,
  iconLink,
}: UsagePageProps) => {
  const chartConfig = {
    usage: {
      label: title,
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <section className="mt-10 max-w-7xl">
      {/* Breadcrumb */}
      <BreadCrumb />

      {/* Page Title */}
      <h2 className="text-4xl font-extrabold text-center mt-12">{title}</h2>

      {/* Content Layout */}
      <div className="flex flex-col md:flex-row items-center justify-center mt-12 gap-10">
        {/* Left Label — shown only on desktop */}
        <div className="hidden md:flex md:flex-1 md:justify-end md:pr-10">
          <h3 className="text-4xl font-extrabold leading-snug text-center md:text-left">
            Monthly <br />
            {title}
          </h3>
        </div>

        {/* Chart Card */}
        <div className="w-full md:w-[65%]">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Monthly {title} Comparison
                <span className="block text-muted-foreground text-sm mt-1">
                  {totalLabel}: {totalValue}
                </span>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="var(--color-usage)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>

            <CardFooter className="flex items-center justify-center">
              <ul className="text-md text-muted-foreground space-y-1">
                {chartData.map(({ month, value }) => (
                  <li
                    key={month}
                    className="w-72 flex items-center justify-around"
                  >
                    <p>
                      {month} {title}
                    </p>
                    :{" "}
                    <p className="font-bold text-black">
                      {value} {unit}
                    </p>
                  </li>
                ))}
              </ul>
            </CardFooter>
          </Card>

          {/* Bottom Label — shown only on small screens */}
          <div className="flex md:hidden items-center justify-center mt-8">
            <h3 className="text-3xl font-extrabold leading-snug text-center">
              Monthly <br />
              {title}
            </h3>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="mt-12 flex items-center justify-between max-w-7xl mx-auto mb-10 px-4">
        <Link
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          to={iconLink}
        >
          <MoveLeft className="h-4 w-4" />
          Back
        </Link>

        {buttonText && (
          <Link to={buttonLink || ""}>
            <Button className="px-6 py-2 text-sm font-medium shadow-md text-background">
              {buttonText}
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default MonthlyUsage;
