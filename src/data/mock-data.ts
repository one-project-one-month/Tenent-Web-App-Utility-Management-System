type Data = {
  monthlySpending: { month: string; value: number }[];
  electricUsage: { month: string; value: number }[];
  waterUsage: { month: string; value: number }[];
  wifiUsage: { month: string; value: number }[];
};
export const data: Data = {
  monthlySpending: [
    { month: "May", value: 6.42 },
    { month: "June", value: 6.12 },
    { month: "July", value: 6.42 },
    { month: "August", value: 6.42 },
  ],
  electricUsage: [
    { month: "May", value: 80 },
    { month: "June", value: 90 },
    { month: "July", value: 112 },
    { month: "August", value: 85 },
  ],
  waterUsage: [
    { month: "May", value: 1200 },
    { month: "June", value: 1450 },
    { month: "July", value: 1500 },
    { month: "August", value: 1450 },
  ],
  wifiUsage: [
    { month: "May", value: 1200 },
    { month: "June", value: 1450 },
    { month: "July", value: 1500 },
    { month: "August", value: 1450 },
  ],
};
