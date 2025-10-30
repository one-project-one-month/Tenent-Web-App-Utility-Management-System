import {useMemo} from "react";
import {useSelector} from "react-redux";
import type {RootState} from "@/store/store";
import infoIcon from "@/assets/web_tenants_icons/info.svg";
import billIcon from "@/assets/web_tenants_icons/bill.svg";
import electricIcon from "@/assets/web_tenants_icons/electric_meter.svg";
import waterIcon from "@/assets/web_tenants_icons/water.svg";
import wifiIcon from "@/assets/web_tenants_icons/wifi.svg";
import cleaningIcon from "@/assets/web_tenants_icons/cleaning.svg";
import rentIcon from "@/assets/web_tenants_icons/Property.svg";
import analyticsIcon from "@/assets/web_tenants_icons/analytics.svg";
import historyIcon from "@/assets/web_tenants_icons/history.svg";
import {Badge} from "@/components/ui/badge";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import CardWrapper from "@/pages/my-billing/components/CardWrapper";
import OverviewCard from "@/pages/my-billing/components/OverviewCard";
import BillingHistory from "@/pages/my-billing/components/BillingHistory";
import TabsContentCard from "@/pages/my-billing/components/TabsContentCard";
import BillingCard from "@/pages/my-billing/components/BillingCard";
import {getUtilityDataFromBills} from "@/pages/my-billing/utils/billingDataUtils";
import {useBillingData} from "@/hooks/use-billing";
import {FourSquare} from "react-loading-indicators";

// Styles
const tabTriggerStyle =
    "px-2 py-1 transition data-[state=active]:bg-[#3E70FF] data-[state=active]:text-white text-[#4F4F4F] text-base hover:bg-[#3E70FF]/10 cursor-pointer";

export type Status = "Paid" | "Pending" | "Overdue";
const statusColors: Record<Status, string> = {
    Paid: "bg-[#58DA8F80] text-[#11321F]",
    Pending: "bg-[#F5D47080] text-[#605020]",
    Overdue: "bg-[#F87171]/20 text-[#B91C1C]",
};
const toNum = (val?: string | null) => Number(val ?? 0);

// Main Billing Component
const Billing = () => {
    const tenantId = useSelector((state: RootState) => state.auth.user?.tenantId);
    // const tenantId = "a86215cd-f4e7-4553-8bd9-9ce4933198f2";
    const {history, isLoading, isError, error} = useBillingData(tenantId);
    const {electricData, waterData, chart, currentBill} = useMemo(
        () => getUtilityDataFromBills(history),
        [history]
    );

    const otherFee = currentBill
        ? toNum(currentBill.groundFee) +
        toNum(currentBill.carParkingFee) +
        toNum(currentBill.fineFee)
        : 0;

    if (isLoading) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <FourSquare
                    color="#2563eb"
                    size="medium"
                    text="Loading Billing Data..."
                    textColor=""
                />
            </div>
        );
    }
    if (!history) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <h2 className="text-2xl font-bold text-primary">
                    No Billing Data For this Tenant Yet!
                </h2>
            </div>
        );
    }
    if (isError)
        return (
            <div className="h-full w-full flex items-center justify-center">
                <h2 className="text-2xl font-bold text-primary">
                    Error: {error?.message || "Failed to load data"}
                </h2>
            </div>
        );

    return (
        <section>
            <div className="flex flex-col gap-6 py-5 lg:py-7 lg:px-4">
                <header className="flex gap-24 items-center lg:gap-0 md:justify-between">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-2xl font-bold">My Billing</h1>
                        <p className="text-md">
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
                    totalAmount={toNum(currentBill?.totalAmount)}
                    createDate={currentBill?.createdAt ?? undefined}
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
                            amount={toNum(currentBill?.electricityFee)}
                        />
                        <BillingCard
                            icon={waterIcon}
                            title="Water"
                            amount={toNum(currentBill?.waterFee)}
                        />
                        <BillingCard
                            icon={wifiIcon}
                            title="WiFi"
                            amount={toNum(currentBill?.wifiFee)}
                        />
                        <BillingCard
                            icon={cleaningIcon}
                            title="Service"
                            amount={toNum(currentBill?.serviceFee)}
                        />
                        <BillingCard
                            icon={rentIcon}
                            title="Rent"
                            amount={toNum(currentBill?.rentalFee)}
                        />
                        {otherFee && (
                            <BillingCard icon={infoIcon} title="Other" amount={otherFee}/>
                        )}
                        <div
                            className="bg-[#F5F5F5] border border-[#E0E0E0] rounded-lg flex justify-between items-center px-3 py-4">
                            <p className="text-[#3E70FF] text-xl lg:text-2xl font-medium">
                                Total Amount Due
                            </p>
                            <p className="text-[#3E70FF] text-xl lg:text-2xl font-medium">
                                {toNum(currentBill?.totalAmount).toLocaleString()} MMK
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
                                title="Last 4 months electric consumption"
                            />
                            <TabsContentCard
                                value="water"
                                data={waterData}
                                chartData={chart.waterUsage}
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
                    />
                </CardWrapper>
            </div>
        </section>
    );
};

export default Billing;
