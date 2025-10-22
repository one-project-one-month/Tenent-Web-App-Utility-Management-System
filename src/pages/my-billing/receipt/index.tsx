import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";

// Styles
const textPrimary = "text-base text-[#333333]";
const textSecondary = "text-base text-[#4F4F4F]";
const textLarge = "text-lg font-semibold text-[#333333]";
const sectionPadding = "px-4 py-2";
const borderBottom = "border-b border-[#E0E0E0]";

// Data
const exampleFee = [
  { name: "Electric Fee", fee: 15000 },
  { name: "Water Fee", fee: 1000 },
  { name: "Wifi Fee", fee: 25000 },
  { name: "Cleaning Fee", fee: 1000 },
  { name: "Rent Fee", fee: 600000 },
];

// Types
interface Fee {
  name: string;
  fee: number;
}

interface ReceiptProps {
  receiptId?: string;
  date?: string;
  billTo?: { name: string; address: string };
  billFrom?: { name: string; address: string };
  fees?: Fee[];
}

const Receipt = ({
  receiptId = "#REC-2024-001",
  date = "August 25, 2025",
  billTo = {
    name: "Katona Beatrix",
    address: "1234 Business Ave, Suite 100, Tech City, TC 12345",
  },
  billFrom = {
    name: "Jenny Wilson",
    address: "1234 Business Ave, Suite 100, Tech City, TC 12345",
  },
  fees = exampleFee,
}: ReceiptProps) => {
  const totalAmount = fees.reduce((sum, { fee }) => sum + fee, 0);

  return (
    <DialogContent
      className="bg-[#FFFAFA] flex flex-col gap-5 p-4 overflow-y-auto max-h-[95vh]"
      aria-describedby="receipt-description"
    >
      {/* Receipt detail card */}
      <section className={`flex flex-col gap-5 ${sectionPadding} mt-7`}>
        {/* Billing date */}
        <DialogTitle className="flex flex-col gap-2 py-2">
          <div className="flex items-center justify-between">
            <h4 className="text-primary text-2xl font-semibold">Receipt</h4>
            <p className={textSecondary}>Date</p>
          </div>
          <div className="flex items-center justify-between">
            <p className={textSecondary}>{receiptId}</p>
            <p className={textPrimary}>{date}</p>
          </div>
        </DialogTitle>
        <div className={`flex flex-col gap-2 py-2 ${borderBottom}`}>
          <h6 className={textLarge}>{billTo.name}</h6>
          <p className={textSecondary}>{billTo.address}</p>
        </div>
        <div className={`flex flex-col gap-2 py-2 ${borderBottom}`}>
          <span className={textPrimary}>Bill From:</span>
          <span className={textLarge}>{billFrom.name}</span>
          <span className={textSecondary}>{billFrom.address}</span>
        </div>

        {fees.map((field, i) => (
          <div
            key={i}
            className={`flex items-center justify-between py-2 ${
              i === fees.length - 1 ? borderBottom : ""
            }`}
          >
            <h4 className={textPrimary}>{field.name}:</h4>
            <p className={textSecondary}>{field.fee.toLocaleString()} MMK</p>
          </div>
        ))}

        <div className={`flex items-center justify-between py-2`}>
          <h4 className={textPrimary}>Total Amount:</h4>
          <p className={textSecondary}>{totalAmount.toLocaleString()} MMK</p>
        </div>
      </section>
      <section className="flex flex-col gap-8 px-4 pb-8">
        <h4 className="text-xl text-[#333333] font-medium">Download Options</h4>
        <div className="flex gap-8">
          <Button
            variant="outline"
            className="bg-secondary flex-1 flex items-center px-8 py-6"
            aria-label="Save receipt as text"
            // onClick={() => console.log("Save as text")} // Replace with API logic
          >
            <FileText className="mr-2" />
            Save as Text
          </Button>
          <Button
            className="bg-primary flex-1 flex items-center text-secondary px-8 py-6"
            aria-label="Download receipt as PDF"
            // onClick={() => console.log("Download PDF")} // Replace with API logic
          >
            <Download className="mr-2" />
            Download PDF
          </Button>
        </div>
      </section>
    </DialogContent>
  );
};

export default Receipt;
