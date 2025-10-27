import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type MonthlyContractProp = {
  startDate: string;
  expiryDate: string;
};

const MonthlyContract = ({ startDate, expiryDate }: MonthlyContractProp) => {
  const start = new Date(startDate);
  const end = new Date(expiryDate);
  const today = new Date();

  const totalDays = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  const remainingDays = Math.max(
    0,
    Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  );
  const progressValue = Math.max(
    0,
    ((totalDays - remainingDays) / totalDays) * 100
  );

  const isActive = remainingDays > 0;

  return (
    <Card className="border-2 border-chart-2 p-2 mb-5">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 mt-2">
          <div className="bg-primary/40 p-2 rounded-lg">
            <img src="src/assets/contract.svg" alt="contract" />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-muted-foreground text-sm">Contract Type</span>
            <h2>Monthly Contract</h2>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap md:flex-nowrap items-center gap-3">
        <div className="w-6/7">
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted-foreground text-sm">
              Contract Period
            </span>
            <h3 className="text-sm font-bold">
              {remainingDays} days remaining
            </h3>
          </div>
          <Progress value={progressValue} />
          <div className="flex justify-between items-center text-muted-foreground text-sm mt-2">
            <span>{start.toLocaleDateString()}</span>
            <span>{end.toLocaleDateString()}</span>
          </div>
        </div>
        <Button
          className={cn(
            "text-sm flex items-center gap-2 w-32 justify-center",
            isActive
              ? "bg-green-600 hover:bg-chart-2/20 text-white"
              : "bg-destructive hover:bg-destructive/20 text-white"
          )}
        >
          <img src="src/assets/check_circle.svg" alt="checkCircle" />
          {isActive ? "Active" : "Overdue"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MonthlyContract;
