import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type FinancialTermsProps = {
  price: string;
  duration: number;
  expiryDate: string;
};

const FinancialTerms = ({
  price,
  duration,
  expiryDate,
}: FinancialTermsProps) => {
  const renewalDate = new Date(expiryDate);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <img src="src/assets/financial.svg" alt="financial" />
          Financial Terms
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="p-4 bg-chart-2/30 rounded-2xl">
          <span>Monthly Rent</span>
          <h2 className="font-bold">{price} MMK</h2>
        </div>
        <hr />
        <div className="p-4">
          <span>Month Duration</span>
          <h2 className="font-bold">{duration} Month</h2>
        </div>
        <hr />
        <div className="p-4">
          <span>Late Fee Penalty</span>
          <h2 className="font-bold">5,000 MMK (after 4th of month)</h2>
        </div>
        <hr />
        <div className="p-4">
          <span>Contract Renewal Date</span>
          <h2 className="font-bold"> {renewalDate.toLocaleDateString()}</h2>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialTerms;
