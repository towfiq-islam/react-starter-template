import { axiosSecure } from "@/Hooks/useAxiosSecure";
import { axiosPublic } from "@/Hooks/useAxiosPublic";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function useApi({
  endpoint,
  method = "get",
  isPrivate = false,
  key,
  onSuccess,
  onError,
  params,
  headers,
  queryOptions,
  mutationOptions,
  axiosOptions,
  enabled = true,
}) {
  const axiosInstance = isPrivate ? axiosSecure : axiosPublic;

  if (method === "get") {
    return useQuery({
      queryKey: key,
      queryFn: async () => {
        const res = await axiosInstance.get(endpoint, { params, headers });
        return res.data;
      },
      enabled,
      ...queryOptions,
    });
  }

  return useMutation({
    mutationKey: key,
    mutationFn: async (variables = {}) => {
      const dynamicEndpoint = variables.endpoint || endpoint;
      const payload = variables.data || variables;

      const res = await axiosInstance[method](dynamicEndpoint, payload, {
        headers,
        ...axiosOptions,
      });

      return res?.data;
    },
    onSuccess,
    onError,
    ...mutationOptions,
  });
}
