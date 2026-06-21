import useApi from "@/Hooks/useApi";

// Get User Data
export const useGetUserData = token => {
  return useApi({
    method: "get",
    key: ["user", token],
    enabled: !!token,
    endpoint: "/api/auth/profile",
    isPrivate: true,
    queryOptions: {
      refetchInterval: 1000 * 60 * 60, // refetch every hour
    },
  });
};
