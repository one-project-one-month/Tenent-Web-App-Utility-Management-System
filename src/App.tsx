import { createBrowserRouter, RouterProvider } from "react-router";
import MainPage from "@/layouts/main-page";
import CustomerService from "@/pages/customer-service/customer-service";
import ContractDetails from "@/pages/contract-details/contract-details";
import Login from "@/pages/auth/login";
import MyBilling from "@/pages/my-billing/my-billing";
import LatestBill from "@/pages/my-billing/latest-bill/latest-bill";
import BillingHistory from "@/pages/my-billing/billing-history/billing-history";
import Profile from "@/pages/profile/profile";
import Overview from "@/pages/overview/overview";
import Receipt from "@/pages/receipt/receipt";
import ElectricUsagePage from "@/pages/monthly-pages/pages/electric-usage-page";
import WaterUsagePage from "@/pages/monthly-pages/pages/water-usage-page";
import WifiUsagePage from "@/pages/monthly-pages/pages/wifi-usage-page";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
      children: [
        { index: true, element: <Overview /> },
        {
          path: "customer-service",
          element: <CustomerService />,
        },
        {
          path: "contract",
          element: <ContractDetails />,
        },
        {
          path: "my-billing",
          element: <MyBilling />,
          children: [
            { index: true, element: <LatestBill /> },
            { path: "billing-history", element: <BillingHistory /> },
          ],
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "receipt",
          element: <Receipt />,
        },
        { path: "electric-usage", element: <ElectricUsagePage /> },
        { path: "water-usage", element: <WaterUsagePage /> },
        { path: "wifi-usage", element: <WifiUsagePage /> },
      ],
    },
    { path: "/login", element: <Login /> },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
