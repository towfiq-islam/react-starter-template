import { axiosPublic } from "@/lib/axiosPublic";
import { axiosSecure } from "@/lib/axiosSecure";
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
  axiosOptions,
  enabled = true,
}) {
  const axiosInstance = isPrivate ? axiosSecure : axiosPublic;

  // =========================
  // GET REQUEST
  // =========================
  const query = useQuery({
    queryKey: key,
    enabled: method === "get" && enabled,
    queryFn: async () => {
      const res = await axiosInstance.get(endpoint, { params, headers });
      return res.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
    ...queryOptions,
  });

  // =========================
  // MUTATION REQUEST
  // =========================
  const mutation = useMutation({
    mutationFn: async (variables = {}) => {
      const dynamicEndpoint = variables.endpoint || endpoint;
      const payload = variables.data ?? variables;

      // Support:
      // - mutate({ data })
      // - mutate({ endpoint: "/api/other" })
      // - mutate({ endpoint: "/api/other", data })

      const config = {
        headers,
        ...axiosOptions,
      };

      // DELETE
      if (method === "delete") {
        const { data } = await axiosInstance.delete(dynamicEndpoint, {
          data: payload,
          ...config,
        });

        return data;
      }

      // OTHER METHODS
      const { data } = await axiosInstance[method](
        dynamicEndpoint,
        payload,
        config,
      );

      return data;
    },

    onSuccess,
    onError,
  });

  return method === "get" ? query : mutation;
}
