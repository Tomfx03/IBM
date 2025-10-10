import React, { useEffect, useState } from "react";
import axios from "axios";
import { EnergyForecastChart } from "./EnergyForecastChart";

export const EnergyForecastContainer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/forecast", {
          horizon_hours: 24, // or dynamic value
        });

        // Map backend data to chart format
        const formattedData = res.data.data.forecastData.map((item: any) => ({
          timestamp: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          energy: item.energy_kwh,
          predicted: item.pue, // optional or replace with predicted energy if exists
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching forecast:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, []);

  if (loading) return <p className="text-center text-muted-foreground">Loading forecast...</p>;

  return <EnergyForecastChart data={data} />;
};
