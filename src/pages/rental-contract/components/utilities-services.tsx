import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type UtilitiesProps = {
  facilities: string[];
};

const UtilitiesServices = ({ facilities }: UtilitiesProps) => {
  return (
    <Card className="mb-5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <img src="src/assets/Utilities.svg" alt="utilities" />
          Utilities & Services
        </CardTitle>
        <CardDescription>
          Breakdown of included and additional utility charges
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {facilities.map((facility) => (
          <div
            key={facility}
            className="p-4 bg-muted-foreground/5 rounded-2xl flex justify-between gap-2"
          >
            <div className="text-sm text-muted-foreground space-y-1">
              <h3 className="text-foreground text-lg font-bold">{facility}</h3>
              <p>Frequency: Monthly</p>
            </div>
            <Button className="bg-chart-2/40 hover:bg-chart-2/30">
              Included
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UtilitiesServices;
