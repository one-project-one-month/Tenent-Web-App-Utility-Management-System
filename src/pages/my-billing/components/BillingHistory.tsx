import { useState, useMemo, useEffect } from "react";
import type { SetURLSearchParams } from "react-router";
import type { Bill } from "@/types/bill";
import { Dialog } from "@/components/ui/dialog";
import CustomPagination from "@/pages/my-billing/components/Pagination";
import InvoiceTable from "@/pages/my-billing/components/InvoiceTable";
import Receipt from "@/pages/my-billing/components/Receipt";
import {
  getInvoiceTableData,
  paginateInvoiceData,
} from "@/pages/my-billing/utils/tableDataUtils";
import { Spinner } from "@/components/ui/spinner";

const headerField = [
  { tableHead: "Invoice No" },
  { tableHead: "Invoice Date" },
  { tableHead: "Due Date" },
  { tableHead: "Total Amount" },
  { tableHead: "Status" },
  { tableHead: "Action" },
];

interface BillingHistoryProps {
  history: Bill[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setSearchParams: SetURLSearchParams;
}

const BillingHistory = ({
  history,
  currentPage,
  setCurrentPage,
  setSearchParams,
}: BillingHistoryProps) => {
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);

  const invoiceData = useMemo(() => getInvoiceTableData(history), [history]);
  const { paginatedData, totalPages } = useMemo(
    () => paginateInvoiceData(invoiceData, currentPage),
    [invoiceData, currentPage]
  );

  // Control transition timing
  useEffect(() => {
    setIsPageTransitioning(true);
    const timer = setTimeout(() => setIsPageTransitioning(false), 100);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const getReceiptProps = (bill: Bill) => {
    const fees = [
      { name: "Rent Fee", fee: Number(bill.rentalFee) || 0 },
      { name: "Electricity Fee", fee: Number(bill.electricityFee) || 0 },
      { name: "Water Fee", fee: Number(bill.waterFee) || 0 },
      { name: "WiFi Fee", fee: Number(bill.wifiFee) || 0 },
      { name: "Service Fee", fee: Number(bill.serviceFee) || 0 },
      { name: "Fine Fee", fee: Number(bill.fineFee) || 0 },
      { name: "Car Parking Fee", fee: Number(bill.carParkingFee) || 0 },
      { name: "Ground Fee", fee: Number(bill.groundFee) || 0 },
    ].filter((fee) => fee.fee > 0);

    return {
      invoiceNo: bill.invoice?.invoiceNo ?? "N/A",
      paidDate: bill.invoice?.receipt?.paidDate,
      totalAmount: bill.totalAmount ?? undefined,
      billTo: {
        name: bill.room?.tenant?.name ?? "Unknown",
        email: bill.room?.tenant?.email ?? "N/A",
      },
      billFrom: {
        name: "Property Management",
      },
      fees,
    };
  };

  const handleAction = (id: string) => {
    const bill = history.find(
      (b) =>
        (b.invoice?.invoiceNo ?? b.id) === id && b.invoice?.status === "Paid"
    );
    if (bill) {
      setSelectedBill(bill);
    }
  };

  const handlePageChange = (page: number) => {
    setIsPageTransitioning(true);
    setCurrentPage(page);
    setSearchParams({ page: page.toString() });
  };

  return (
    <>
      <div className="overflow-x-auto transition-opacity duration-300">
        <Dialog
          open={!!selectedBill}
          onOpenChange={(open) => !open && setSelectedBill(null)}
        >
          {isPageTransitioning ? (
            <div className="w-full py-[60px]">
              <Spinner className="mx-auto size-6" />
            </div>
          ) : paginatedData && paginatedData.length > 0 ? (
            <InvoiceTable
              key={`page-${currentPage}`}
              headerField={headerField}
              paginatedData={paginatedData}
              onAction={handleAction}
            />
          ) : (
            <div className="w-full py-4">
              <p className="mx-auto">No billing history available</p>
            </div>
          )}

          {selectedBill && <Receipt {...getReceiptProps(selectedBill)} />}
        </Dialog>
      </div>
      <div>
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default BillingHistory;
