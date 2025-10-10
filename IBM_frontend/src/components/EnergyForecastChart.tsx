import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

interface ForecastData {
  timestamp: string;
  energy: number;
  predicted?: number;
}

interface EnergyForecastChartProps {
  data: ForecastData[];
}

export const EnergyForecastChart = ({ data }: EnergyForecastChartProps) => {
  return (
    <Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-foreground mb-1">Energy Forecast</h3>
        <p className="text-muted-foreground text-sm">24-hour prediction with confidence intervals</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="timestamp" 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            label={{ value: 'kWh', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--popover))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Area 
            type="monotone" 
            dataKey="energy" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            fill="url(#energyGradient)" 
            name="Actual"
          />
          <Area 
            type="monotone" 
            dataKey="predicted" 
            stroke="hsl(var(--secondary))" 
            strokeWidth={2}
            strokeDasharray="5 5"
            fill="url(#predictedGradient)" 
            name="Predicted"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};
