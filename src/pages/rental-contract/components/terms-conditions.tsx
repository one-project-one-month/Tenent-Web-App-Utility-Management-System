import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TermsandConditions = () => {
  const TermsandConditions = [
    "1. Rent is due on the 5th of each month. Late payments after the 5th will incur a 50,000 MMK late fee.",
    "2. Tenant is responsible for electricity and water utilities. WiFi is included in the rent.",
    "3. Pets are allowed with prior approval and additional deposit of 30,000 MMK per pet.",
    "4. Tenant must provide 60 days notice before lease termination.",
    "5. Property must be maintained in good condition. Any damages beyond normal wear will be deducted from deposit.",
    "6. Landlord will conduct annual property inspections with 48 hours notice.",
    "7. Modifications to the peroperty require written approval from the landlord.",
  ];
  return (
    <Card className="mb-5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <img
            src="src/assets/Terms and Conditions.svg"
            alt="termsandCondition"
          />
          Terms and Conditions
        </CardTitle>
        <CardDescription>Important lease terms and conditions</CardDescription>
      </CardHeader>
      <CardContent>
        {TermsandConditions.map((item, index) => (
          <h3 key={index} className="m-2 p-3 bg-muted-foreground/5 rounded-md">
            {item}
          </h3>
        ))}
      </CardContent>
    </Card>
  );
};

export default TermsandConditions;
