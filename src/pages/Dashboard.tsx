import Navigation from "@/components/Navigation";
import SoilDataCard from "@/components/dashboard/SoilDataCard";
import YieldPredictionCard from "@/components/dashboard/YieldPredictionCard";
import IrrigationCard from "@/components/dashboard/IrrigationCard";
import PestAlertCard from "@/components/dashboard/PestAlertCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Sun, Wind, Droplets } from "lucide-react";

const Dashboard = () => {
  const weatherData = {
    temp: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    rainfall: 5,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Farm Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time insights and recommendations for optimal farm management
          </p>
        </div>

        {/* Weather Overview */}
        <Card className="mb-6 shadow-soft border-border/50 bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-secondary" />
              Current Weather Conditions
            </CardTitle>
            <CardDescription>Local weather data affecting your crops</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-background/50">
                <Sun className="h-8 w-8 mx-auto mb-2 text-secondary" />
                <p className="text-2xl font-bold text-foreground">{weatherData.temp}°C</p>
                <p className="text-sm text-muted-foreground">{weatherData.condition}</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50">
                <Droplets className="h-8 w-8 mx-auto mb-2 text-accent" />
                <p className="text-2xl font-bold text-foreground">{weatherData.humidity}%</p>
                <p className="text-sm text-muted-foreground">Humidity</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50">
                <Wind className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold text-foreground">{weatherData.windSpeed} km/h</p>
                <p className="text-sm text-muted-foreground">Wind Speed</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50">
                <Cloud className="h-8 w-8 mx-auto mb-2 text-accent" />
                <p className="text-2xl font-bold text-foreground">{weatherData.rainfall} mm</p>
                <p className="text-sm text-muted-foreground">Rainfall (24h)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          <SoilDataCard />
          <YieldPredictionCard />
          <IrrigationCard />
          <PestAlertCard />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
