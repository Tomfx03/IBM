import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  target: string;
  potentialSavings?: string;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export const RecommendationCard = ({ recommendation }: RecommendationCardProps) => {
  const severityConfig = {
    low: {
      icon: Info,
      color: "text-primary",
      bgColor: "bg-primary/10",
      badge: "bg-primary/20 text-primary border-primary/30",
    },
    medium: {
      icon: AlertTriangle,
      color: "text-warning",
      bgColor: "bg-warning/10",
      badge: "bg-warning/20 text-warning border-warning/30",
    },
    high: {
      icon: AlertCircle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      badge: "bg-destructive/20 text-destructive border-destructive/30",
    },
  };

  const config = severityConfig[recommendation.severity];
  const Icon = config.icon;

  return (
    <Card className="p-4 border-2 border-border hover:border-primary/50 transition-all hover:shadow-lg bg-card/80 backdrop-blur-sm">
      <div className="flex gap-4">
        <div className={`p-3 rounded-lg ${config.bgColor} ${config.color} h-fit`}>
          <Icon size={20} />
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-foreground">{recommendation.title}</h4>
            <Badge variant="outline" className={`${config.badge} text-xs uppercase`}>
              {recommendation.severity}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            {recommendation.description}
          </p>
          
          <div className="flex items-center gap-4 text-xs">
            <span className="text-muted-foreground">
              Target: <span className="text-foreground font-medium">{recommendation.target}</span>
            </span>
            {recommendation.potentialSavings && (
              <span className="text-success font-medium">
                💰 Save {recommendation.potentialSavings}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
