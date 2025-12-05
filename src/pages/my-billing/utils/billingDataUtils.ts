import type {Bill} from "@/types/bill";

interface UsageItem {
    title: string;
    amount: number;
    unit: string;
}

interface UsageData {
    month: string;
    value: number;
    unit: string;
}

interface UtilityData {
    electricData: UsageItem[];
    waterData: UsageItem[];
    chart: { electricUsage: UsageData[]; waterUsage: UsageData[] };
    currentBill: Bill | null;
}

export const getUtilityDataFromBills = (bills: Bill[]): UtilityData => {
    const sortedBills = [...bills].sort(
        (a, b) =>
            new Date(b.createdAt ?? 0).getTime() -
            new Date(a.createdAt ?? 0).getTime()
    );
    const lastFourMonths = sortedBills.slice(0, 4);
    const currentBill = sortedBills[0] || null;

    const avgElectricRate =
        lastFourMonths.reduce(
            (sum, bill) => sum + (Number(bill.electricityFee) || 0),
            0
        ) / (lastFourMonths.length || 1);
    const avgWaterRate =
        lastFourMonths.reduce(
            (sum, bill) => sum + (Number(bill.waterFee) || 0),
            0
        ) / (lastFourMonths.length || 1);

    const electricData: UsageItem[] = [
        {
            title: "Current Electric Unit",
            amount: Number(currentBill?.totalUnit?.electricityUnits ?? 0),
            unit: "Units",
        },
        {
            title: "Current Electric Bill",
            amount: Number(currentBill?.electricityFee ?? 0),
            unit: "MMK",
        },
        {
            title: "Average Rate",
            amount: Math.round(avgElectricRate),
            unit: "MMK",
        },
    ];

    const waterData: UsageItem[] = [
        {
            title: "Current Water Unit",
            amount: Number(currentBill?.totalUnit?.waterUnits ?? 0),
            unit: "Liters(L)",
        },
        {
            title: "Current Water Bill",
            amount: Number(currentBill?.waterFee ?? 0),
            unit: "MMK",
        },
        {
            title: "Average Rate",
            amount: Math.round(avgWaterRate),
            unit: "MMK",
        },
    ];

    const chart = {
        electricUsage: lastFourMonths
            .map((bill) => ({
                month: bill.createdAt
                    ? new Date(bill.createdAt).toLocaleString("en-US", {month: "short"})
                    : "Unknown",
                value: Number(bill.totalUnit?.electricityUnits ?? 0),
                unit: "Units",
            }))
            .reverse(),
        waterUsage: lastFourMonths
            .map((bill) => ({
                month: bill.createdAt
                    ? new Date(bill.createdAt).toLocaleString("en-US", {month: "short"})
                    : "Unknown",
                value: Number(bill.totalUnit?.waterUnits ?? 0),
                unit: "Liters(L)",
            }))
            .reverse(),
    };

    return {electricData, waterData, chart, currentBill};
};
