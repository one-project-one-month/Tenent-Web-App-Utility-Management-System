import { createBrowserRouter, RouterProvider } from "react-router";
import MainPage from "./layouts/main-page";
import Home from "./pages/home/home-page";
import Login from "./pages/auth/login";
import CustomerService from "./pages/customerService/customerService";
import ServiceHistory from "./pages/customerService/serviceHistory/serviceHistory";
import NewRequest from "./pages/customerService/newRequest/newRequest";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
      children: [
        { index: true, element: <Home /> },
        { path: "login", element: <Login /> },
        {
          path: "customer-service",
          element: <CustomerService />,
          children: [
            { index: true, element: <NewRequest /> },
            { path: "service-history", element: <ServiceHistory /> },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};


export default App;
