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

export const paginateInvoiceData = (
    data: InvoiceField[],
    page: number,
    itemsPerPage: number = 10
): { paginatedData: InvoiceField[]; totalPages: number } => {
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    return {paginatedData, totalPages};
};
