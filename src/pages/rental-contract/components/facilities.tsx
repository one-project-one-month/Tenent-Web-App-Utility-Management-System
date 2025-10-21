import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Facilities = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <img src="src/assets/Facilities.svg" alt="facilities" />
          Facilities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between border-b-2 p-4">
          <Label htmlFor="refrigerator" className="text-md font-bold">
            Refrigerator
          </Label>
          <Checkbox id="refrigerator" />
        </div>
        <div className="flex items-center justify-between border-b-2 p-4">
          <Label htmlFor="air-conditioner" className="text-md font-bold">
            Air Conditioner
          </Label>
          <Checkbox id="air-conditioner" />
        </div>
        <div className="flex items-center justify-between border-b-2 p-4">
          <Label htmlFor="car-parking" className="text-md font-bold">
            Car Parking
          </Label>
          <Checkbox id="car-parking" />
        </div>
        <div className="flex items-center justify-between border-b-2 p-4">
          <Label htmlFor="washing-machine" className="text-md font-bold">
            Washing Machine
          </Label>
          <Checkbox id="washing-machine" />
        </div>
      </CardContent>
    </Card>
  );
};

export default Facilities;
