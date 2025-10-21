import { createBrowserRouter, RouterProvider } from "react-router";
import MainPage from "@/layouts/main-page";
import CustomerService from "@/pages/customer-service";
import ServiceHistory from "@/pages/customer-service/service-history/index";
import NewRequest from "@/pages/customer-service/new-request";
import Login from "@/pages/auth/login";
import MyBilling from "@/pages/my-billing/my-billing";
import LatestBill from "@/pages/my-billing/latest-bill/latest-bill";
import BillingHistory from "@/pages/my-billing/billing-history/billing-history";
import Profile from "@/pages/profile/profile";
import Overview from "@/pages/overView/over-view";
import Receipt from "@/pages/receipt/receipt";
import ProtectedRoute from "@/components/protected-route";
import NotFoundPage from "@/pages/not-found";
import RentalContract from "./pages/rental-contract/rental-contract";
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
            { path: "rental-contract", element: <RentalContract /> },
            {
              path: "customer-service",
              element: <CustomerService />,
              children: [
                { index: true, element: <NewRequest /> },
                { path: "service-history", element: <ServiceHistory /> },
              ],
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
