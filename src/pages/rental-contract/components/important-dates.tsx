import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ImportantDates = () => {
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
          <span>01/10/2025</span>
        </div>
        <div className="bg-chart-4/40 p-4 rounded-2xl">
          <h3>Contract Start</h3>
          <span>01/10/2025</span>
        </div>
        <div className="bg-chart-4/40 p-4 rounded-2xl">
          <h3>Contract Start</h3>
          <span>01/10/2025</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImportantDates;
