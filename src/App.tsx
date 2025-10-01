import { createBrowserRouter, RouterProvider } from "react-router";
import MainPage from "./layouts/main-page";
import Home from "./pages/home/home-page";
import CustomerService from "./pages/customerService/customerService";
import ServiceHistory from "./pages/customerService/serviceHistory/serviceHistory";
import NewRequest from "./pages/customerService/newRequest/newRequest";
import ContractDetails from "./pages/contractDetails/contractDetails";
import Login from "./pages/auth/login";
import MyBilling from "./pages/myBilling/myBilling";
import LatestBill from "./pages/myBilling/latestBill/latestBill";
import BillingHistory from "./pages/myBilling/billingHistory/billingHistory";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "customer-service",
          element: <CustomerService />,
          children: [
            { index: true, element: <NewRequest /> },
            { path: "service-history", element: <ServiceHistory /> },
          ],
        },
        {
          path: "contract-details",
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
      ],
    },
    { path: "/login", element: <Login /> },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
