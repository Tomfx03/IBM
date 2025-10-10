import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  status?: "good" | "warning" | "critical";
}

export const MetricCard = ({ title, value, unit, icon: Icon, trend, status = "good" }: MetricCardProps) => {
  const statusColors = {
    good: "border-success/30 bg-success/5",
    warning: "border-warning/30 bg-warning/5",
    critical: "border-destructive/30 bg-destructive/5",
  };

  const statusIconColors = {
    good: "text-success",
    warning: "text-warning",
    critical: "text-destructive",
  };

  return (
    <Card className={`p-6 border-2 ${statusColors[status]} backdrop-blur-sm transition-all hover:shadow-lg hover:scale-[1.02]`}>
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">{value}</span>
            {unit && <span className="text-muted-foreground text-lg">{unit}</span>}
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${trend.isPositive ? 'text-success' : 'text-destructive'}`}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-card/50 ${statusIconColors[status]}`}>
          <Icon size={24} />
        </div>
      </div>
    </Card>
  );
};
