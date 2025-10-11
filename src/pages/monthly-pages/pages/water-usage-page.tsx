import MonthlyUsage from "../monthly-usage";

const WaterUsagePage = () => {
  const data = [
    { month: "May", value: 1200 },
    { month: "June", value: 1450 },
    { month: "July", value: 1500 },
    { month: "August", value: 1450 },
  ];

  return (
    <MonthlyUsage
      title="Water Usage"
      totalLabel="Total"
      totalValue="5,600 Liters (L)"
      chartData={data}
      unit="Liters (L)"
      buttonText="See More Wifi Performance"
      buttonLink="/wifi-usage"
      iconLink="/electric-usage"
    />
  );
};

export default WaterUsagePage;
