import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "@/Layout/AuthLayout";
import MainLayout from "@/Layout/MainLayout";
import Login from "@/Pages/AuthPages/Login";
import Register from "@/Pages/AuthPages/Register";
import Home from "@/Pages/MainPages/Home";
import PrivateRouter from "@/Router/PrivateRouter";
import DashboardLayout from "@/Layout/DashboardLayout";
import DashboardHome from "@/Pages/DashboardPages/DashboardHome";
import Settings from "@/Pages/DashboardPages/Settings";
import ErrorPage from "@/Pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  // Main Layout
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },

  // Auth Layout
  {
    path: "/auth",
    element: <AuthLayout />,
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

  // 404
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
