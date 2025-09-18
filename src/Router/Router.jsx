import Home from "@/Pages/MainPages/Home";
import Login from "@/Pages/AuthPages/Login";
import PrivateRouter from "./PrivateRouter";
import AuthLayout from "@/Layout/AuthLayout";
import MainLayout from "@/Layout/MainLayout";
import Register from "@/Pages/AuthPages/Register";
import ErrorPage from "@/Pages/ErrorPage/ErrorPage";
import { createBrowserRouter } from "react-router-dom";
import Settings from "@/Pages/DashboardPages/Settings";
import DashboardLayout from "@/Layout/DashboardLayout";
import DashboardHome from "@/Pages/DashboardPages/DashboardHome";

const router = createBrowserRouter([
  // Main Layout
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },

  // Auth Layout
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },

  // Dashboard Layout
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

export default router;
