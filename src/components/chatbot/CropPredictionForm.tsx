import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sprout } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const CropPredictionForm = () => {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPrediction(null);

    try {
      const { data, error } = await supabase.functions.invoke("agro-chat", {
        body: {
          type: "crop_prediction",
          parameters: {
            N: parseFloat(formData.nitrogen),
            P: parseFloat(formData.phosphorus),
            K: parseFloat(formData.potassium),
            temperature: parseFloat(formData.temperature),
            humidity: parseFloat(formData.humidity),
            ph: parseFloat(formData.ph),
            rainfall: parseFloat(formData.rainfall),
          },
        },
      });

      if (error) throw error;

      setPrediction(data.prediction);
      toast({
        title: "Prediction Complete",
        description: "Crop recommendation generated successfully!",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get prediction",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sprout className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Crop Prediction</CardTitle>
              <CardDescription>
                Enter soil and environmental parameters to get crop recommendations
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nitrogen">Nitrogen (N)</Label>
                <Input
                  id="nitrogen"
                  type="number"
                  step="0.01"
                  value={formData.nitrogen}
                  onChange={(e) => handleChange("nitrogen", e.target.value)}
                  placeholder="e.g., 90"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phosphorus">Phosphorus (P)</Label>
                <Input
                  id="phosphorus"
                  type="number"
                  step="0.01"
                  value={formData.phosphorus}
                  onChange={(e) => handleChange("phosphorus", e.target.value)}
                  placeholder="e.g., 42"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="potassium">Potassium (K)</Label>
                <Input
                  id="potassium"
                  type="number"
                  step="0.01"
                  value={formData.potassium}
                  onChange={(e) => handleChange("potassium", e.target.value)}
                  placeholder="e.g., 43"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="temperature">Temperature (°C)</Label>
                <Input
                  id="temperature"
                  type="number"
                  step="0.01"
                  value={formData.temperature}
                  onChange={(e) => handleChange("temperature", e.target.value)}
                  placeholder="e.g., 20.5"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="humidity">Humidity (%)</Label>
                <Input
                  id="humidity"
                  type="number"
                  step="0.01"
                  value={formData.humidity}
                  onChange={(e) => handleChange("humidity", e.target.value)}
                  placeholder="e.g., 82"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ph">pH Level</Label>
                <Input
                  id="ph"
                  type="number"
                  step="0.01"
                  value={formData.ph}
                  onChange={(e) => handleChange("ph", e.target.value)}
                  placeholder="e.g., 6.5"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rainfall">Rainfall (mm)</Label>
                <Input
                  id="rainfall"
                  type="number"
                  step="0.01"
                  value={formData.rainfall}
                  onChange={(e) => handleChange("rainfall", e.target.value)}
                  placeholder="e.g., 202"
                  required
                />
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                "Get Crop Recommendation"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {prediction && (
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">Recommended Crop</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{prediction}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CropPredictionForm;
