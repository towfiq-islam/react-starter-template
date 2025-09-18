import { Outlet, ScrollRestoration } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
};

export default AuthLayout;
