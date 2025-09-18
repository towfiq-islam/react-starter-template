import { Navigate } from "react-router-dom";
import useAuth from "@/Hooks/useAuth";

const PrivateRouter = ({ children }) => {
  const { user, token, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-svh flex justify-center items-center">Loading....</div>
    );
  }

  if (token || user) return children;

  return <Navigate to="/auth/login" state={location?.pathname} replace />;
};

export default PrivateRouter;
