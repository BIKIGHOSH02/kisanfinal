import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const YieldPredictionCard = () => {
  const predictions = [
    { crop: "Rice", predicted: 4.5, historical: 3.8, unit: "tons/ha", confidence: 92 },
    { crop: "Wheat", predicted: 3.2, historical: 2.9, unit: "tons/ha", confidence: 88 },
  ];

  return (
    <Card className="shadow-soft border-border/50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-secondary/10">
            <TrendingUp className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <CardTitle>Crop Yield Predictions</CardTitle>
            <CardDescription>AI-powered forecasting</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {predictions.map((pred) => (
          <div key={pred.crop} className="space-y-3 p-4 rounded-lg bg-gradient-card border border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-foreground">{pred.crop}</h4>
                <p className="text-sm text-muted-foreground">Next harvest season</p>
              </div>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Predicted Yield</p>
                <p className="text-2xl font-bold text-foreground">
                  {pred.predicted} <span className="text-sm font-normal">{pred.unit}</span>
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Historical Avg</p>
                <p className="text-2xl font-bold text-muted-foreground">
                  {pred.historical} <span className="text-sm font-normal">{pred.unit}</span>
                </p>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Confidence Level</span>
                <span className="font-semibold text-success">{pred.confidence}%</span>
              </div>
              <Progress value={pred.confidence} className="h-1.5" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default YieldPredictionCard;
