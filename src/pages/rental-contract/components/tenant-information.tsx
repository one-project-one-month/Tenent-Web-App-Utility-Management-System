import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Room, Tenant } from "@/types/contract";

type TenantInformationProp = {
  tenant: Tenant;
  room: Room;
  startDate: string;
};

const TenantInformation = ({
  tenant,
  room,
  startDate,
}: TenantInformationProp) => {
  const start = new Date(startDate);

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
          <h2 className="font-bold">{tenant.name}</h2>
        </div>
        <hr />
        <div>
          <h3 className="text-muted-foreground">Email</h3>
          <h2 className="font-bold">{tenant.email}</h2>
        </div>
        <hr />
        <div>
          <h3 className="text-muted-foreground">Phone</h3>
          <h2 className="font-bold">{tenant.phNumber}</h2>
        </div>
        <hr />
        <div>
          <h3 className="text-muted-foreground">Occupants Numbers</h3>
          <h2 className="font-bold">Double Occupancy ({room.maxNoOfPeople})</h2>
        </div>
        <hr />
        <div>
          <h3 className="text-muted-foreground">Move-in Date</h3>
          <h2 className="font-bold">{start.toLocaleDateString()}</h2>
        </div>
      </CardContent>
    </Card>
  );
};

export default TenantInformation;
