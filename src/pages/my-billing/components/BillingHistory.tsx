import {useState, useMemo} from "react";
import type {Bill} from "@/types/bill";
import {Dialog} from "@/components/ui/dialog";
import InvoiceTable from "@/pages/my-billing/components/InvoiceTable";
import Receipt from "@/pages/my-billing/components/Receipt";
import {
    getInvoiceTableData,
    getReceiptProps
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
                        invoiceData={tableData}
                        onAction={handleAction}
                    />

                    {selectedBill && <Receipt {...getReceiptProps(selectedBill)} />}
                </Dialog>
            </div>
        </>
    );
};

export default BillingHistory;
