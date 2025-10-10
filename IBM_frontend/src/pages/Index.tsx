import { Activity, Zap, Thermometer, TrendingDown, Server } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { EnergyForecastChart } from "@/components/EnergyForecastChart";
import { RecommendationCard } from "@/components/RecommendationCard";
import { SimulationPanel } from "@/components/SimulationPanel";
import { useMetrics } from "@/hooks/useMetrics";
import { useForecast } from "@/hooks/useForecast";
import { useRecommendations } from "@/hooks/useRecommendations";

const Index = () => {
  const { data: metrics, isLoading: metricsLoading } = useMetrics();
  const { data: forecastData, isLoading: forecastLoading } = useForecast();
  const { data: recommendations, isLoading: recsLoading } = useRecommendations();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/20">
            <Server className="text-primary" size={28} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Data Center Operations</h1>
            <p className="text-muted-foreground">Real-time monitoring & optimization dashboard</p>
          </div>
        </div>
      </header>

      {/* Metrics Grid */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4 uppercase tracking-wide">Live Metrics</h2>

        {metricsLoading ? (
          <p>Loading metrics...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
            <MetricCard title="Power Usage Effectiveness" value={metrics?.pue} icon={TrendingDown} />
            <MetricCard title="Energy Consumption" value={metrics?.energy} unit="kWh" icon={Zap} />
            <MetricCard title="CPU Utilization" value={metrics?.cpuUsage} unit="%" icon={Activity} />
            <MetricCard title="Cooling Load" value={metrics?.chillerLoad} unit="°C" icon={Thermometer} />
          </div>
        )}
      </section>

      {/* Forecast Chart & Simulation */}
      <section className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 animate-fade-in">
            {forecastLoading ? (
              <p>Loading forecast...</p>
            ) : (
              <EnergyForecastChart data={forecastData || []} />
            )}
          </div>
          <div className="animate-fade-in">
            <SimulationPanel />
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground uppercase tracking-wide">
            AI-Powered Recommendations
          </h2>
          <span className="text-sm text-muted-foreground">{recommendations?.length || 0} active</span>
        </div>
        <div className="space-y-4 animate-fade-in">
          {recsLoading ? (
            <p>Loading recommendations...</p>
          ) : (
            recommendations?.map((rec: any) => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
