// React and other library imports
import { Download, Eye } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { useSearchParams } from "react-router";
import { useState, useMemo, useEffect } from "react";
import billIcon from "@/assets/web_tenants_icons/bill.svg";
import electricIcon from "@/assets/web_tenants_icons/electric_meter.svg";
import waterIcon from "@/assets/web_tenants_icons/water.svg";
import wifiIcon from "@/assets/web_tenants_icons/wifi.svg";
import cleaningIcon from "@/assets/web_tenants_icons/cleaning.svg";
import rentIcon from "@/assets/web_tenants_icons/Property.svg";
import analyticsIcon from "@/assets/web_tenants_icons/analytics.svg";
import historyIcon from "@/assets/web_tenants_icons/history.svg";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Receipt from "./receipt";

// Styles
const tabTriggerStyle =
  "px-2 py-1 transition data-[state=active]:bg-[#3E70FF] data-[state=active]:text-white text-[#4F4F4F] text-base hover:bg-[#3E70FF]/10 cursor-pointer";

const tableCellStyle = "w-[156px] text-base text-[#333333] text-center";

const cardStyle =
  "flex flex-col gap-6 lg:gap-8 p-4 lg:py-8 rounded-[8px] shadow-double bg-[#FFFAFA] border border-[#E0E0E0]";

const commonCard = "bg-[#F5F5F5] border border-[#E0E0E0] rounded-[8px]";

// TypeScript interfaces for props
interface BillingCardProps {
  icon: string;
  title: string;
  amount: number;
}

interface UsageItem {
  title: string;
  amount: number | string;
  unit?: string;
}

interface TabsContentProps {
  value: string;
  data: UsageItem[];
  chartData: UsageData[];
  unit: string;
  title: string;
}

interface InvoiceField {
  ID: string;
  date: string;
  due_date: string;
  amount: string | number;
  status: Status;
}

interface HeaderField {
  tableHead: string;
}

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

// Data Types
type Data = {
  electricUsage: { month: string; value: number; unit: string }[];
  waterUsage: { month: string; value: number; unit: string }[];
  wifiUsage: { month: string; value: number; unit: string }[];
};

type Status = "Paid" | "Unpaid";

// Sample Data
const electricData = [
  { title: "Electric Usage", amount: 85, unit: "Unit" },
  { title: "Electric Bill", amount: 2500, unit: "MMK" },
  { title: "Avg. Rate", amount: 15000, unit: "MMK" },
];

const waterData = [
  { title: "Current Month", amount: 1450, unit: "liters(L)" },
  { title: "Cost", amount: 1000, unit: "MMK" },
  { title: "Avg. Rate", amount: 1000, unit: "MMK" },
];

const wifiData = [
  { title: "Current Month", amount: 25, unit: "Mbps" },
  { title: "Cost", amount: 25000, unit: "MMK" },
  { title: "Avg. Rate", amount: 25000, unit: "MMK" },
];

const Chartdata: Data = {
  electricUsage: [
    { month: "May", value: 80, unit: "Units" },
    { month: "June", value: 90, unit: "Units" },
    { month: "July", value: 112, unit: "Units" },
    { month: "August", value: 85, unit: "Units" },
  ],
  waterUsage: [
    { month: "May", value: 1200, unit: "Liters(L)" },
    { month: "June", value: 1450, unit: "Liters(L)" },
    { month: "July", value: 1500, unit: "Liters(L)" },
    { month: "August", value: 1450, unit: "Liters(L)" },
  ],
  wifiUsage: [
    { month: "May", value: 25, unit: "Mbps" },
    { month: "June", value: 25, unit: "Mbps" },
    { month: "July", value: 25, unit: "Mbps" },
    { month: "August", value: 25, unit: "Mbps" },
  ],
};

const headerField: HeaderField[] = [
  { tableHead: "Invoice No" },
  { tableHead: "Invoice Date" },
  { tableHead: "Due Date" },
  { tableHead: "Total Amount" },
  { tableHead: "Status" },
  { tableHead: "Action" },
];

const invoiceField: InvoiceField[] = [
  {
    ID: "INV-0001",
    date: "1.10.2025",
    due_date: "5.10.2025",
    amount: 642000,
    status: "Paid",
  },
  {
    ID: "INV-0002",
    date: "1.10.2025",
    due_date: "5.10.2025",
    amount: 600000,
    status: "Paid",
  },
  {
    ID: "INV-0003",
    date: "1.10.2025",
    due_date: "5.10.2025",
    amount: 550000,
    status: "Unpaid",
  },
  {
    ID: "INV-0004",
    date: "1.10.2025",
    due_date: "5.10.2025",
    amount: 670000,
    status: "Paid",
  },
  {
    ID: "INV-0005",
    date: "1.10.2025",
    due_date: "5.10.2025",
    amount: 580000,
    status: "Paid",
  },
  {
    ID: "INV-0006",
    date: "1.10.2025",
    due_date: "5.10.2025",
    amount: 621000,
    status: "Unpaid",
  },
  {
    ID: "INV-0007",
    date: "1.10.2025",
    due_date: "5.10.2025",
    amount: 640000,
    status: "Paid",
  },
  {
    ID: "INV-0008",
    date: "1.10.2025",
    due_date: "5.10.2025",
    amount: 700000,
    status: "Paid",
  },
  {
    ID: "INV-0009",
    date: "1.10.2025",
    due_date: "5.10.2025",
    amount: 610000,
    status: "Unpaid",
  },
  {
    ID: "INV-0010",
    date: "1.10.2025",
    due_date: "5.10.2025",
    amount: 580000,
    status: "Paid",
  },
  {
    ID: "INV-0011",
    date: "1.10.2025",
    due_date: "5.10.2025",
    amount: 625000,
    status: "Unpaid",
  },
  {
    ID: "INV-0012",
    date: "1.10.2025",
    due_date: "5.10.2025",
    amount: 660000,
    status: "Paid",
  },
  {
    ID: "INV-0013",
    date: "1.10.2025",
    due_date: "5.10.2025",
    amount: 660000,
    status: "Paid",
  },
];

// status colors
const statusColors: Record<Status, string> = {
  Paid: "bg-[#58DA8F80] text-[#11321F]",
  Unpaid: "bg-[#F5D47080] text-[#605020]",
};

// BillingCard Component
const BillingCard = ({ icon, title, amount }: BillingCardProps) => (
  <div className={`${commonCard} flex justify-between items-center px-3 py-4`}>
    <div className="flex gap-3 items-center">
      <div className="rounded-[8px] bg-[#3E70FF] py-2 px-3">
        <img src={icon} alt={`${title} Icon`} />
      </div>
      <p className="text-lg font-medium text-[#4F4F4F]">{title}</p>
    </div>
    <p className="text-xl font-medium text-[#333333]">
      {amount.toLocaleString()} MMK
    </p>
  </div>
);

// TabsContentCard Component
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
            {item.amount.toLocaleString()} {item.unit}
          </p>
        </div>
      ))}
    </div>

    {/* chart placeholder */}
    <div className="-mx-4 lg:-mx-0">
      <MonthlyUsageChart
        title={title}
        subTitle="Usage Trend"
        chartData={chartData || []}
        unit={unit}
      />
    </div>
  </TabsContent>
);

// MonthlyUsageChart Component (will use from /common in future)
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
    <Card className="shadow-sm border-1 border-gray-200 rounded-sm">
      <CardHeader>
        <CardTitle className="flex flex-col gap-1 text-xs font-light text-[#4F4F4F]">
          {title}
          <span className="text-sm font-medium text-[#4F4F4F]">{subTitle}</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="px-0 pr-6">
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <ChartLegend
              content={() => (
                <div className="flex flex-col flex-wrap items-center gap-2 mt-2">
                  {chartData.map(({ month, value }) => (
                    <div
                      key={month}
                      className="flex items-center justify-between w-full pl-12 text-xs"
                    >
                      <div className="text-xs text-[#4F4F4F]">{month}</div>
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

// Main Billing Component
const Billing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Sort by date for future dynamic data
  const sortedHistory = useMemo(() => {
    return [...invoiceField].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }, []);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedHistory.length / itemsPerPage);

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
    if (
      !isNaN(pageFromUrl) &&
      pageFromUrl !== currentPage &&
      pageFromUrl > 0 &&
      pageFromUrl <= totalPages
    ) {
      setCurrentPage(pageFromUrl);
    }
  }, [searchParams, totalPages]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedHistory.slice(start, start + itemsPerPage);
  }, [currentPage, sortedHistory]);

  const renderPaginationItems = () => {
    const items: React.ReactNode[] = [];
    const maxPagesToShow = 3;

    for (let i = 1; i <= Math.min(maxPagesToShow, totalPages); i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={`?page=${i}`}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(i);
              setSearchParams({ page: i.toString() });
            }}
            isActive={currentPage === i}
            aria-current={currentPage === i ? "page" : undefined}
            aria-label={`Go to page ${i}`}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add ellipsis
    if (totalPages > maxPagesToShow * 2 + 1) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (
      let i = Math.max(maxPagesToShow + 1, totalPages - maxPagesToShow + 1);
      i <= totalPages;
      i++
    ) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={`?page=${i}`}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(i);
              setSearchParams({ page: i.toString() });
            }}
            isActive={currentPage === i}
            aria-current={currentPage === i ? "page" : undefined}
            aria-label={`Go to page ${i}`}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };
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
          <Badge className="py-1 px-2 h-fit bg-[#F5D47080] text-[#605020]">
            Unpaid
          </Badge>
        </header>
        <article className="flex flex-col gap-6 bg-[#FFFAFA] rounded-[8px] px-6 py-8 shadow-double border border-[#E0E0E0] lg:flex-row lg:justify-between lg:items-center">
          <div className="flex flex-col gap-2">
            <p className="text-lg text-[#4F4F4F]">Current Bill</p>
            <h3 className="text-[#1955FF] text-2xl font-medium">642,000 MMK</h3>
            <p className="text-lg text-[#4F4F4F]">October 2025</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-lg text-[#4F4F4F]">Due Date</p>
            <h3 className="text-[#1955FF] text-2xl font-medium">
              November 5, 2025
            </h3>
            <p className="text-lg text-[#EB5757]">Payment due in 4 days</p>
          </div>
          <div className="flex flex-col gap-2 lg:w-52">
            <p className="text-lg text-[#4F4F4F]">Status</p>
            <Badge className="py-1 px-2 h-fit bg-[#F5D47080] text-[#605020]">
              Unpaid
            </Badge>
          </div>
        </article>
        <article className={cardStyle}>
          <header className="flex flex-col gap-1">
            <div className="flex gap-3 py-2">
              <img src={billIcon} alt="Bill Icon" />
              <p className="text-[#333333] text-lg font-medium">
                Current Bill Breakdown
              </p>
            </div>
            <p className="text-base text-[#4F4F4F]">
              Detailed breakdown of October 2025 charges
            </p>
          </header>
          <div className="flex flex-col gap-6 lg:gap-8">
            <BillingCard
              icon={electricIcon}
              title="Electricity"
              amount={15000}
            />
            <BillingCard icon={waterIcon} title="Water" amount={1000} />
            <BillingCard icon={wifiIcon} title="WiFi" amount={25000} />
            <BillingCard icon={cleaningIcon} title="Cleaning" amount={1000} />
            <BillingCard icon={rentIcon} title="Rent" amount={600000} />
            <div
              className={`${commonCard} flex justify-between items-center  px-3 py-4`}
            >
              <p className="text-[#3E70FF] text-xl lg:text-2xl font-medium">
                Total Amount Due
              </p>
              <p className="text-[#3E70FF] text-xl lg:text-2xl font-medium">
                642,000 MMK
              </p>
            </div>
          </div>
        </article>
        <article className={cardStyle}>
          <header className="flex flex-col gap-1">
            <div className="flex gap-3 py-2">
              <img src={analyticsIcon} alt="Analytics Icon" />
              <p className="text-[#333333] text-lg font-medium">
                Usage Analytics
              </p>
            </div>
            <p className="text-[#4F4F4F] text-base">
              Track your utility consumption over time
            </p>
          </header>
          <Tabs defaultValue="electric" className="flex flex-col gap-8">
            {/* Tab buttons section */}
            <div className="py-3 px-6 bg-[#F5F5F5] rounded-[20px]">
              <TabsList className="flex justify-around w-full">
                <TabsTrigger value="electric" className={tabTriggerStyle}>
                  Electric
                </TabsTrigger>
                <TabsTrigger value="water" className={tabTriggerStyle}>
                  Water
                </TabsTrigger>
                <TabsTrigger value="wifi" className={tabTriggerStyle}>
                  WiFi
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab content section */}
            <div>
              <TabsContentCard
                value="electric"
                data={electricData}
                chartData={Chartdata.electricUsage}
                unit={Chartdata.electricUsage[0].unit || "Unknown"}
                title="Last 4 months electric consumption"
              />
              <TabsContentCard
                value="water"
                data={waterData}
                chartData={Chartdata.waterUsage}
                unit={Chartdata.waterUsage[0].unit || "Unknown"}
                title="Last 4 months water consumption"
              />
              <TabsContentCard
                value="wifi"
                data={wifiData}
                chartData={Chartdata.wifiUsage}
                unit={Chartdata.wifiUsage[0].unit || "Unknown"}
                title="Last 4 months WiFi consumption"
              />
            </div>
          </Tabs>
        </article>
        <article className={cardStyle}>
          <header className="flex flex-col gap-1">
            <div className="flex gap-3 py-2">
              <img src={historyIcon} alt="Usage History" />
              <p className="text-lg font-medium text-[#333333]">
                Invoice History
              </p>
            </div>
            <p className="text-base text-[#4F4F4F]">
              View your past invoices and payment records
            </p>
          </header>
          <div className="overflow-x-auto">
            <Table
              aria-label="Usage History Table"
              className="table-fixed w-full border-collapse"
            >
              <TableHeader className="bg-[#EBEBEB]">
                <TableRow>
                  {headerField.map((items, index) => (
                    <TableHead
                      key={index}
                      className="w-[156px] h-[44px] p-2 text-h5 text-center text-[#333333]"
                      scope="col"
                    >
                      {items.tableHead}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className="bg-[#FFFAFA]">
                {paginatedData.map((item) => (
                  <TableRow key={item.ID} className="h-[52px] border-none">
                    <TableCell className={tableCellStyle}>{item.ID}</TableCell>
                    <TableCell className={tableCellStyle}>
                      {item.date}
                    </TableCell>
                    <TableCell className={tableCellStyle}>
                      {item.due_date}
                    </TableCell>
                    <TableCell className={tableCellStyle}>
                      {item.amount.toLocaleString()} MMK
                    </TableCell>
                    <TableCell className={tableCellStyle}>
                      <Badge
                        className={`rounded-[8px] px-2 py-1 text-base ${
                          statusColors[item.status]
                        }`}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="w-[156px] text-center">
                      <div className="flex justify-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-[#3E70FF] hover:bg-[#3E70FF]/80 "
                          aria-label={`Download receipt ${item.ID}`}
                          title="Download Receipt"
                        >
                          <Download color="white" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              aria-label={`View receipt ${item.ID}`}
                              title="View Receipt"
                            >
                              <Eye />
                            </Button>
                          </DialogTrigger>
                          <Receipt />
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={
                      currentPage > 1 ? `?page=${currentPage - 1}` : undefined
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      const newPage = currentPage > 1 ? currentPage - 1 : 1;
                      setCurrentPage(newPage);
                      setSearchParams({ page: newPage.toString() });
                    }}
                    aria-disabled={currentPage === 1}
                    aria-label="Go to previous page"
                  />
                </PaginationItem>
                {renderPaginationItems()}
                <PaginationItem>
                  <PaginationNext
                    href={
                      currentPage < totalPages
                        ? `?page=${currentPage + 1}`
                        : undefined
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      const newPage =
                        currentPage < totalPages ? currentPage + 1 : totalPages;
                      setCurrentPage(newPage);
                      setSearchParams({ page: newPage.toString() });
                    }}
                    aria-disabled={currentPage === totalPages}
                    aria-label="Go to next page"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Billing;
