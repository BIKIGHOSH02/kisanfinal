import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Leaf } from "lucide-react";

interface NutrientData {
  name: string;
  value: number;
  optimal: number;
  unit: string;
}

const SoilDataCard = () => {
  const nutrients: NutrientData[] = [
    { name: "Nitrogen (N)", value: 45, optimal: 50, unit: "kg/ha" },
    { name: "Phosphorus (P)", value: 32, optimal: 35, unit: "kg/ha" },
    { name: "Potassium (K)", value: 58, optimal: 60, unit: "kg/ha" },
  ];

  const getStatus = (value: number, optimal: number) => {
    const percentage = (value / optimal) * 100;
    if (percentage >= 90) return { color: "success", label: "Optimal" };
    if (percentage >= 70) return { color: "warning", label: "Good" };
    return { color: "destructive", label: "Low" };
  };

  return (
    <Card className="shadow-soft border-border/50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Leaf className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>Soil NPK Levels</CardTitle>
            <CardDescription>Real-time nutrient monitoring</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {nutrients.map((nutrient) => {
          const status = getStatus(nutrient.value, nutrient.optimal);
          const percentage = (nutrient.value / nutrient.optimal) * 100;
          
          return (
            <div key={nutrient.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{nutrient.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    {nutrient.value}/{nutrient.optimal} {nutrient.unit}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full bg-${status.color}/10 text-${status.color}`}>
                    {status.label}
                  </span>
                </div>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default SoilDataCard;
