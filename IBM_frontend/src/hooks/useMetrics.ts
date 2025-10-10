import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useMetrics = () => {
  return useQuery({
    queryKey: ["metrics"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/api/metrics");
      return res.data.data; // your backend returns { success: true, data: {...} }
    },
    refetchInterval: 5000, // ✅ 5 seconds
    staleTime: 3000,       // optional: consider data fresh for 3s
  });
};

