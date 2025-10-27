import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type FacilitiesProps = {
  facilities: string[];
};

const Facilities = ({ facilities }: FacilitiesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <img src="src/assets/Facilities.svg" alt="facilities" />
          Facilities
        </CardTitle>
      </CardHeader>
      <CardContent>
        {facilities.map((facility) => (
          <div
            key={facility}
            className="flex items-center justify-between border-b-2 p-4"
          >
            <Label htmlFor={facility} className="text-md font-bold">
              {facility}
            </Label>
            <Checkbox id={facility} checked />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Facilities;
