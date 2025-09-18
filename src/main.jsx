import "./index.css";
import { StrictMode } from "react";
import router from "@/Router/Router";
const queryClient = new QueryClient();
import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import UseSiteSettings from "@/Hooks/UseSiteSettings";
import AosProvider from "@/Provider/AosProvider/AosProvider";
import AuthProvider from "@/Provider/AuthProvider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AosProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster />
          <UseSiteSettings />
        </AuthProvider>
      </QueryClientProvider>
    </AosProvider>
  </StrictMode>
);
