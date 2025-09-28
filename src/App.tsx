import { createBrowserRouter, RouterProvider } from "react-router";
import MainPage from "./layouts/main-page";
import Home from "./pages/home/home-page";
import Login from "./pages/auth/login";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
      children: [
        { index: true, element: <Home /> },
        { path: "/login", element: <Login /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};


export default App;
