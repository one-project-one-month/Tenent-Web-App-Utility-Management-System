import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TenantInformation = () => {
  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <img src="src/assets/tenant.svg" alt="contract" />
          Tenant Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <h3 className="text-muted-foreground">Full Name</h3>
          <h2 className="font-bold">Jenny Wilson</h2>
        </div>
        <hr />
        <div>
          <h3 className="text-muted-foreground">Email</h3>
          <h2 className="font-bold">Jenny4207@gmail.com</h2>
        </div>
        <hr />
        <div>
          <h3 className="text-muted-foreground">Phone</h3>
          <h2 className="font-bold">09 123 456 789</h2>
        </div>
        <hr />
        <div>
          <h3 className="text-muted-foreground">Occupants Numbers</h3>
          <h2 className="font-bold">Double Occupancy (2)</h2>
        </div>
        <hr />
        <div>
          <h3 className="text-muted-foreground">Move-in Date</h3>
          <h2 className="font-bold">1.10.2025</h2>
        </div>
      </CardContent>
    </Card>
  );
};

export default TenantInformation;
