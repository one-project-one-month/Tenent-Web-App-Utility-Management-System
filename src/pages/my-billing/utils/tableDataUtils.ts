import type {Bill} from "@/types/bill";
import type {Status} from "@/pages/my-billing";

interface InvoiceField {
    ID?: string;
    date: string;
    due_date: string;
    amount: number;
    status?: Status;
}

export const formatDate = (isoDate?: string): string => {
    if (!isoDate) return "-";
    return new Date(isoDate).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
    });
};

export const getInvoiceTableData = (bills: Bill[] = []): InvoiceField[] => {
    return bills
        .filter((bill): bill is Bill => !!bill.id)
        .map((bill) => ({
            ID: bill.invoice?.invoiceNo,
            date: formatDate(bill.createdAt ?? undefined),
            due_date: formatDate(bill.dueDate ?? undefined),
            amount: Number(bill.totalAmount ?? 0),
            status: (bill.invoice?.status as Status) ?? "Pending",
        }));
};

export const getReceiptProps = (bill: Bill) => {
    const fees = [
        {name: "Rent Fee", fee: Number(bill.rentalFee) || 0},
        {name: "Electricity Fee", fee: Number(bill.electricityFee) || 0},
        {name: "Water Fee", fee: Number(bill.waterFee) || 0},
        {name: "WiFi Fee", fee: Number(bill.wifiFee) || 0},
        {name: "Service Fee", fee: Number(bill.serviceFee) || 0},
        {name: "Fine Fee", fee: Number(bill.fineFee) || 0},
        {name: "Car Parking Fee", fee: Number(bill.carParkingFee) || 0},
        {name: "Ground Fee", fee: Number(bill.groundFee) || 0},
    ].filter((fee) => fee.fee > 0);

    return {
        invoiceNo: bill.invoice?.invoiceNo,
        paidDate: bill.receipt?.paidDate,
        totalAmount: Number(bill.totalAmount),
        billTo: {
            name: bill.tenant?.name ?? "Unknown",
            email: bill.tenant?.email ?? "N/A",
        },
        billFrom: "Property Management",
        fees,
    };
};