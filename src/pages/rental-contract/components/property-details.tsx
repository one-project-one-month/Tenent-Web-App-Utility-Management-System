import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PropertyDetails = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <img src="src/assets/Property.svg" alt="contract" />
          Property Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <h3 className="text-muted-foreground">Address</h3>
          <div className="font-bold space-y-1">
            <p>456 Riverside Apartment, Unit 3B</p>
            <p>San Francisco, CA 94102</p>
          </div>
        </div>
        <hr />
        <div className="flex justify-between items-center">
          <div className="w-1/2">
            <h3 className="text-muted-foreground">Room No</h3>
            <h2 className="font-bold">A-104</h2>
          </div>
          <div className="w-1/2">
            <h3 className="text-muted-foreground">Floor</h3>
            <h2 className="font-bold">Ground</h2>
          </div>
        </div>
        <hr />
        <div className=" flex justify-between items-center">
          <div className="w-1/2">
            <h3 className="text-muted-foreground">Room No</h3>
            <h2 className="font-bold">A-104</h2>
          </div>
          <div className="w-1/2">
            <h3 className="text-muted-foreground">Floor</h3>
            <h2 className="font-bold">Ground</h2>
          </div>
        </div>
        <hr />
        <div className="flex justify-between items-center">
          <div className="w-1/2">
            <h3 className="text-muted-foreground">Type</h3>
            <h2 className="font-bold">Apartment</h2>
          </div>
          <div className="w-1/2">
            <h3 className="text-muted-foreground">Dimensions</h3>
            <h2 className="font-bold">650 sq m Area</h2>
          </div>
        </div>
        <hr />
        <div className="flex justify-between items-center">
          <div className="w-1/2">
            <h3 className="text-muted-foreground">Bedrooms</h3>
            <h2 className="font-bold">2</h2>
          </div>
          <div className="w-1/2">
            <h3 className="text-muted-foreground">Bathrooms</h3>
            <h2 className="font-bold">1</h2>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyDetails;
