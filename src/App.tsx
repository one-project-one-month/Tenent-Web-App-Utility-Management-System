import { createBrowserRouter, RouterProvider } from "react-router";
import MainPage from "@/layouts/main-page";
import CustomerService from "@/pages/customer-service";
import ServiceHistory from "@/pages/customer-service/service-history/index";
import NewRequest from "@/pages/customer-service/new-request";
import ContractDetails from "@/pages/contract-details/contract-details";
import Login from "@/pages/auth/login";
import MyBilling from "@/pages/my-billing";
import Profile from "@/pages/profile/profile";
import Overview from "@/pages/overView/over-view";
import ElectricUsagePage from "@/pages/monthly-pages/pages/electric-usage-page";
import WaterUsagePage from "@/pages/monthly-pages/pages/water-usage-page";
import WifiUsagePage from "@/pages/monthly-pages/pages/wifi-usage-page";
import ProtectedRoute from "@/components/protected-route";
import NotFoundPage from "@/pages/not-found";
const App = () => {
  const routes = [
    {
      path: "",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <MainPage />,
          children: [
            { index: true, element: <Overview /> },
            {
              path: "customer-service",
              element: <CustomerService />,
              children: [
                { index: true, element: <NewRequest /> },
                { path: "service-history", element: <ServiceHistory /> },
              ],
            },
            {
              path: "contract",
              element: <ContractDetails />,
            },
            {
              path: "my-billing",
              element: <MyBilling />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
            { path: "electric-usage", element: <ElectricUsagePage /> },
            { path: "water-usage", element: <WaterUsagePage /> },
            { path: "wifi-usage", element: <WifiUsagePage /> },
          ],
        },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "*", element: <NotFoundPage /> },
  ];

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default App;
