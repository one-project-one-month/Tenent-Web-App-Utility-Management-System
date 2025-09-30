import { createBrowserRouter, RouterProvider } from "react-router";
import MainPage from "./layouts/main-page";
import Home from "./pages/home/home-page";
import CustomerService from "./pages/customerService/customerService";
import ServiceHistory from "./pages/customerService/serviceHistory/serviceHistory";
import NewRequest from "./pages/customerService/newRequest/newRequest";
import ContractDetails from "./pages/contractDetails/contractDetails";
import Login from "./pages/auth/login";

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
      ],
    },
    { path: "/login", element: <Login /> },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
