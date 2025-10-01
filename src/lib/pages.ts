type Page = {
  name: string;
  path: string;
};

export const pages: Page[] = [
  {
    name: "Overview",
    path: "/",
  },
  {
    name: "Customer Service",
    path: "/customer-service",
  },
  {
    name: "Contract",
    path: "/contract-details",
  },
  {
    name: "My Billing",
    path: "/my-billing",
  },
];
