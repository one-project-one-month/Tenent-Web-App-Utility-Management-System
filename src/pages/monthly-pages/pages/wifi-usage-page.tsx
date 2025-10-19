import MonthlyUsage from "../monthly-usage";

const WifiUsagePage = () => {
  const data = [
    { month: "May", value: 1200 },
    { month: "June", value: 1450 },
    { month: "July", value: 1500 },
    { month: "August", value: 1450 },
  ];

  return (
    <MonthlyUsage
      title="Wi-Fi Usage"
      totalLabel="Total Cost"
      totalValue="48,000 MMk (Per Month)"
      chartData={data}
      unit="Mbps"
      iconLink="/water-usage"
    />
  );
};

export default WifiUsagePage;
