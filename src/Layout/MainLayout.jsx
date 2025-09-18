import Footer from "@/Shared/Footer";
import Navbar from "@/Shared/Navbar";
import { Outlet, ScrollRestoration } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
