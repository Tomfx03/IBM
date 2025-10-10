import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useRecommendations = () => {
  return useQuery({
    queryKey: ["recommendations"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/api/recommendation");
      return res.data.data; // expected array of recommendation objects
    },
  });
};
