import toast from "react-hot-toast";
import useApi from "@/Hooks/useApi";
import useAuth from "@/Hooks/useAuth";
import { useNavigate } from "react-router-dom";

// Get User Data
export const useGetUserData = token => {
  return useApi({
    method: "get",
    key: ["user", token],
    enabled: !!token,
    endpoint: "/api/users/data",
    isPrivate: true,
    queryOptions: {
      refetchInterval: 1000 * 60 * 60, // refetch every hour
    },
  });
};

// Registration
export const useRegister = () => {
  const navigate = useNavigate();
  return useApi({
    method: "post",
    key: ["register"],
    endpoint: "/api/users/register",
    onSuccess: data => {
      if (data?.status) {
        toast.success(data?.message);
        navigate("/auth/login");
      }
    },
    onError: err => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// Login
export const useLogin = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  return useApi({
    method: "post",
    key: ["login"],
    endpoint: "/api/users/login",
    onSuccess: data => {
      if (data?.status) {
        setToken(data?.data?.token);
        toast.success(data?.message);
        navigate("/dashboard/resume-builder");
      }
    },
    onError: err => {
      toast.error(err?.response?.data?.message);
    },
  });
};
