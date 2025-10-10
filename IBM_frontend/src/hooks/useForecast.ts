import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useForecast = () => {
  return useQuery({
    queryKey: ["forecast"],
    queryFn: async () => {
      const res = await axios.post("http://localhost:5000/api/forecast", { horizon_hours: 24 });
      return res.data.data.predicted.map(item => ({
  timestamp: new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  energy: item.energy_kwh,
  predicted: item.pue,
}));

    },
  });
};
