import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Room } from "@/types/contract";

type PropertyDetailsProp = {
  room: Room;
};

const PropertyDetails = ({ room }: PropertyDetailsProp) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <img src="src/assets/Property.svg" alt="contract" />
          Property Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* <div>
          <h3 className="text-muted-foreground">Address</h3>
          <div className="font-bold space-y-1">
            <p>456 Riverside Apartment, Unit 3B</p>
            <p>San Francisco, CA 94102</p>
          </div>
        </div>
        <hr /> */}
        <div className="flex justify-between items-center">
          <div className="w-1/2">
            <h3 className="text-muted-foreground">Room No</h3>
            <h2 className="font-bold">{room.roomNo}</h2>
          </div>
          <div className="w-1/2">
            <h3 className="text-muted-foreground">Floor</h3>
            <h2 className="font-bold">{room.floor}</h2>
          </div>
        </div>
        <hr />
        <div className="flex justify-between items-center">
          <div className="w-1/2">
            <h3 className="text-muted-foreground">Bedrooms</h3>
            <h2 className="font-bold">{room.noOfBedRoom}</h2>
          </div>
          <div className="w-1/2">
            <h3 className="text-muted-foreground">Dimensions</h3>
            <h2 className="font-bold">{room.dimension}</h2>
          </div>
        </div>
        <hr />
        <div>
          <h3 className="text-muted-foreground">Description</h3>
          <h2 className="font-bold">{room.description}</h2>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyDetails;
