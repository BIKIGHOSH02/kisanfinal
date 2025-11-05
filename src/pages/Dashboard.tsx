import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SoilDataCard from "@/components/dashboard/SoilDataCard";
import YieldPredictionCard from "@/components/dashboard/YieldPredictionCard";
import IrrigationCard from "@/components/dashboard/IrrigationCard";
import PestAlertCard from "@/components/dashboard/PestAlertCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cloud, Sun, Wind, Droplets, Crown, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  const weatherData = {
    temp: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    rainfall: 5,
  };

  useEffect(() => {
    // Check if user is authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "Successfully logged out.",
    });
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-start flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Farm Dashboard
            </h1>
            <p className="text-muted-foreground">
              Real-time insights and recommendations for optimal farm management
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="default" className="gap-2">
              <Crown className="h-4 w-4" />
              Upgrade to Premium
            </Button>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
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
