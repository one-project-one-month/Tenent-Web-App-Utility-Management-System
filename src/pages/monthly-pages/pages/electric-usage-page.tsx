import MonthlyUsage from "../monthly-usage";

const ElectricUsagePage = () => {
  const data = [
    { month: "May", value: 80 },
    { month: "June", value: 90 },
    { month: "July", value: 112 },
    { month: "August", value: 85 },
  ];

  return (
    <MonthlyUsage
      title="Electric Usage"
      totalLabel="Total"
      totalValue="367 Unit"
      chartData={data}
      unit="Unit"
      buttonText="See More Water Usage"
      buttonLink="/water-usage"
      iconLink="/"
    />
  );
};

export default ElectricUsagePage;
