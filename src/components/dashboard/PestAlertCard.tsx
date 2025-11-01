import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bug, AlertTriangle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const PestAlertCard = () => {
  const alerts = [
    { 
      pest: "Aphids", 
      risk: "medium", 
      recommendation: "Monitor closely. Consider organic neem oil treatment if population increases.",
    },
    { 
      pest: "Fall Armyworm", 
      risk: "low", 
      recommendation: "No immediate action needed. Continue regular field monitoring.",
    },
  ];

  const getRiskConfig = (risk: string) => {
    switch (risk) {
      case "high":
        return { color: "destructive", icon: AlertTriangle, label: "High Risk" };
      case "medium":
        return { color: "warning", icon: AlertTriangle, label: "Medium Risk" };
      default:
        return { color: "success", icon: CheckCircle, label: "Low Risk" };
    }
  };

  return (
    <Card className="shadow-soft border-border/50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-destructive/10">
            <Bug className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <CardTitle>Pest Risk Assessment</CardTitle>
            <CardDescription>Early detection alerts</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert, index) => {
          const config = getRiskConfig(alert.risk);
          const Icon = config.icon;
          
          return (
            <Alert key={index} className="border-border/50">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-${config.color}/10 mt-0.5`}>
                  <Icon className={`h-4 w-4 text-${config.color}`} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-foreground">{alert.pest}</h4>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full bg-${config.color}/10 text-${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                  <AlertDescription className="text-sm text-muted-foreground">
                    {alert.recommendation}
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default PestAlertCard;
