import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ImportantDatesProps = {
  startDate: string;
  expiryDate: string;
};
const ImportantDates = ({ startDate, expiryDate }: ImportantDatesProps) => {
  const start = new Date(startDate).toLocaleDateString();
  const end = new Date(expiryDate);
  const renewalDate = new Date(
    end.getTime() + 10 * 24 * 60 * 60 * 1000
  ).toLocaleDateString();

  return (
    <Card className="mb-7">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <img src="src/assets/calendar.svg" alt="calendar" />
          Important Dates
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="bg-chart-4/40 p-4 rounded-2xl">
          <h3>Contract Start</h3>
          <span>{start}</span>
        </div>
        <div className="bg-chart-4/40 p-4 rounded-2xl">
          <h3>Contract End</h3>
          <span>{end.toLocaleDateString()}</span>
        </div>
        <div className="bg-chart-4/40 p-4 rounded-2xl">
          <h3>Renewal Notice Due</h3>
          <span>{renewalDate}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImportantDates;
