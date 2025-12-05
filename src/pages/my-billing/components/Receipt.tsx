import {Download, FileText} from "lucide-react";
import {Button} from "@/components/ui/button";
import {DialogContent, DialogTitle} from "@/components/ui/dialog";
import {formatDate} from "@/pages/my-billing/utils/tableDataUtils";
import {
    generateReceiptPDF,
    generateReceiptText,
} from "@/pages/my-billing/utils/receiptUtils";

// Styles
const textPrimary = "text-base text-[#333333]";
const textSecondary = "text-base text-[#4F4F4F]";
const textLarge = "text-lg font-semibold text-[#333333]";
const sectionPadding = "px-4 py-2";
const borderBottom = "border-b border-[#E0E0E0]";

interface Fee {
    name: string;
    fee: number;
}

interface ReceiptProps {
    invoiceNo?: string;
    paidDate?: string;
    totalAmount?: number;
    billTo?: { name: string; email: string };
    billFrom?: string;
    fees?: Fee[];
}

const Receipt = ({
                     invoiceNo = "N/A",
                     paidDate = "N/A",
                     totalAmount = 0,
                     billTo = {name: "Unknown", email: "N/A"},
                     billFrom = "Property Management",
                     fees = [],
                 }: ReceiptProps) => {
    return (
        <DialogContent
            className="bg-[#FFFAFA] flex flex-col gap-5 p-4 max-h-[95vh] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 pr-2"
            aria-describedby="receipt-description"
        >
            <section className={`flex flex-col gap-5 ${sectionPadding} mt-7`}>
                <DialogTitle className="flex flex-col gap-2 py-2">
                    <div className="flex items-center justify-between">
                        <h4 className="text-primary text-2xl font-semibold">Receipt</h4>
                        <p className={textSecondary}>Paid Date</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className={textSecondary}>{invoiceNo}</p>
                        <p className={textPrimary}>
                            {paidDate ? formatDate(paidDate) : "N/A"}
                        </p>
                    </div>
                </DialogTitle>

                <div className={`flex flex-col gap-2 py-2 ${borderBottom}`}>
                    <h6 className={textLarge}>{billTo.name}</h6>
                    <p className={textSecondary}>{billTo.email}</p>
                </div>

                <div className={`flex flex-col gap-2 py-2 ${borderBottom}`}>
                    <span className={textPrimary}>Bill From:</span>
                    <span className={textLarge}>{billFrom}</span>
                </div>

                {fees.length > 0 ? (
                    fees.map((field, i) => (
                        <div
                            key={i}
                            className={`flex items-center justify-between py-2 ${
                                i === fees.length - 1 ? borderBottom : ""
                            }`}
                        >
                            <h4 className={textPrimary}>{field.name}</h4>
                            <p className={textSecondary}>{field.fee.toLocaleString()} MMK</p>
                        </div>
                    ))
                ) : (
                    <p className={textSecondary}>No fees available</p>
                )}

                <div className={`flex items-center justify-between py-2`}>
                    <h4 className={textPrimary}>Total Amount:</h4>
                    <p className={textSecondary}>
                        {totalAmount?.toLocaleString()} MMK
                    </p>
                </div>
            </section>

            <section className="flex flex-col gap-8 px-4 pb-8">
                <h4 className="text-xl text-[#333333] font-medium">Download Options</h4>
                <div className="flex gap-8">
                    <Button
                        variant="outline"
                        className=" flex-1 flex items-center px-8 py-6"
                        aria-label="Save receipt as text"
                        onClick={() =>
                            generateReceiptText({
                                invoiceNo,
                                paidDate,
                                totalAmount,
                                billTo,
                                billFrom,
                                fees,
                            })
                        }
                    >
                        <FileText className="mr-2"/>
                        Save as Text
                    </Button>

                    <Button
                        className="bg-primary flex-1 flex items-center text-white px-8 py-6"
                        aria-label="Download receipt as PDF"
                        onClick={() =>
                            generateReceiptPDF({
                                invoiceNo,
                                paidDate,
                                totalAmount,
                                billTo,
                                billFrom,
                                fees,
                            })
                        }
                    >
                        <Download className="mr-2"/>
                        Download PDF
                    </Button>
                </div>
            </section>
        </DialogContent>
    );
};

export default Receipt;
