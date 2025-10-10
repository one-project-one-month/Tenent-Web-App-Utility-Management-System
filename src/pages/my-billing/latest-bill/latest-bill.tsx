import { useMemo } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import billEmpty from "../../../assets/bill-empty-state-ill.png";

interface BillingField {
  label: string;
  value: string;
}

const billingFields: BillingField[] = [
  { label: "Invoice ID", value: "INV001209107" },
  { label: "Invoice Date", value: "25.7.2025" },
  { label: "Name", value: "Jenny Wilson" },
  { label: "Your Id", value: "T-0001" },
  { label: "Email", value: "Jenny4207@gmail.com" },
  { label: "Electric Fee", value: "15,000 MMK" },
  { label: "Water Fee", value: "1,000 MMK" },
  { label: "Wifi Fee", value: "25,000 MMK" },
  { label: "Cleaning Fee", value: "1,000 MMK" },
  { label: "Rent Fee", value: "600,000 MMK" },
];

// const billingFields: BillingField[] = []; // Empty for demo; replace with actual data source

const LatestBill: React.FC = () => {
  const memoizedFields = useMemo(() => billingFields, []);
  const navigate = useNavigate();

  return (
    <section
      className="flex flex-col lg:flex-row gap-6 xl:gap-5 lg:py-9 justify-center"
      aria-label="Latest Bill Details"
    >
      {memoizedFields.length > 0 ? (
        <>
          <header className="flex flex-col gap-2 text-center lg:text-left xl:w-[380px]">
            <h2 className="text-h2 text-[#333333]" id="billing-title">
              My Billing
            </h2>
            <p className="text-h4 text-[#4F4F4F]">Here's your Bill</p>
          </header>
          <article
            className="bg-[#FFFAFA] rounded-[8px] px-2 lg:px-5 py-4 lg:w-[45vw] lg:max-w-[558px]"
            aria-labelledby="billing-title"
          >
            <div className="pb-3 border-b border-b-[#E0E0E0]">
              {memoizedFields.map((field, index) => (
                <dl
                  key={index}
                  className={`flex justify-between items-center py-2 ${
                    index === 4 ? "border-b border-b-[#E0E0E0]" : ""
                  }`}
                  aria-label={`Billing field: ${field.label}`}
                >
                  <dt className="text-sub-heading text-[#828282]">
                    {field.label}:
                  </dt>
                  <dd
                    role="definition"
                    className="text-sub-heading text-[#4F4F4F]"
                  >
                    {field.value}
                  </dd>
                </dl>
              ))}
            </div>
            <dl
              className="flex justify-between items-center pt-3 pb-2"
              aria-label="Total Amount"
            >
              <dt className="text-sub-heading text-[#828282]">Total Amount:</dt>
              <dd role="definition" className="text-sub-heading text-[#4F4F4F]">
                642,000 MMK
              </dd>
            </dl>
          </article>
        </>
      ) : (
        <div className="flex flex-col gap-10 py-8 max-w-[590px] mx-auto">
          <img src={billEmpty} alt="Bill is Empty" />
          <div className="flex flex-col gap-9">
            <header className="flex flex-col gap-3 text-center">
              <h2 className="text-[28px] lg:text-3xl font-semibold text-[#333333]">
                Waiting for Your Bill
              </h2>
              <p className="text-sub-heading text-[#333333]">
                We are still processing your usage for this month. Your bill
                will appear here soon!
              </p>
            </header>
            <Button
              className="text-h6 mx-auto px-8 py-6 rounded-[8px] text-white bg-[#3E70FF] cursor-pointer"
              onClick={() => navigate("/my-billing/billing-history")}
              aria-label="View Billing History"
            >
              View Your Billing History
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default LatestBill;
