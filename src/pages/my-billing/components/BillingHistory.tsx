import {useState, useMemo} from "react";
import type {Bill} from "@/types/bill";
import {Dialog} from "@/components/ui/dialog";
import InvoiceTable from "@/pages/my-billing/components/InvoiceTable";
import Receipt from "@/pages/my-billing/components/Receipt";
import {
    getInvoiceTableData,
} from "@/pages/my-billing/utils/tableDataUtils";

const headerField = [
    {tableHead: "Invoice No"},
    {tableHead: "Invoice Date"},
    {tableHead: "Due Date"},
    {tableHead: "Total Amount"},
    {tableHead: "Status"},
    {tableHead: "Action"},
];

const BillingHistory = ({history}: { history: Bill[] }) => {
    const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
    const tableData = useMemo(() => getInvoiceTableData(history), [history]);

    const getReceiptProps = (bill: Bill) => {
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
            invoiceNo: bill.invoice?.invoiceNo ?? "N/A",
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

    const handleAction = (id?: string) => {
        const bill = history.find(
            (b) =>
                (b.invoice?.invoiceNo ?? b.id) === id && b.invoice?.status === "Paid"
        );
        if (bill) {
            setSelectedBill(bill);
        }
    };

    return (
        <>
            <div className="overflow-x-auto transition-opacity duration-300">
                <Dialog
                    open={!!selectedBill}
                    onOpenChange={(open) => !open && setSelectedBill(null)}
                >
                    <InvoiceTable
                        headerField={headerField}
                        paginatedData={tableData}
                        onAction={handleAction}
                    />

                    {selectedBill && <Receipt {...getReceiptProps(selectedBill)} />}
                </Dialog>
            </div>
        </>
    );
};

export default BillingHistory;
