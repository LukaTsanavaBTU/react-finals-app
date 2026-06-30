import { createHashRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import HomePage from "./pages/HomePage";
import ViewerPage from "./pages/ViewerPage";
import RandomPage from "./pages/RandomPage";

export const router = createHashRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "viewer",
        element: <ViewerPage />,
      },
      {
        path: "random",
        element: <RandomPage />,
      },
    ],
  },
]);
