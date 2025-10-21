import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const MonthlyContract = () => {
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
      <CardContent className="w-full flex flex-wrap gap-3">
        <div className="w-7/8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted-foreground text-sm">
              Contract Period
            </span>
            <h3 className="text-sm font-bold">28 days remaining</h3>
          </div>
          <Progress value={60} />
          <div className="flex justify-between items-center text-muted-foreground text-sm mt-2">
            <span>01/10/2025</span>
            <span>01/10/2025</span>
          </div>
        </div>
        <Button className="bg-chart-2/30 text-sm">
          <img src="src/assets/Check Circle.svg" alt="checkCircle" />
          Active
        </Button>
      </CardContent>
    </Card>
  );
};

export default MonthlyContract;
