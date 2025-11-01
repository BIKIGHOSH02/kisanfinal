import { Card } from "@/components/ui/card";
import { BarChart3, Droplets, Leaf, Bug, TrendingUp, Globe } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Crop Yield Prediction",
    description: "AI-powered forecasting based on real-time soil and weather data for accurate harvest planning.",
  },
  {
    icon: Droplets,
    title: "Smart Irrigation",
    description: "Optimized watering schedules that reduce water waste and ensure optimal crop hydration.",
  },
  {
    icon: Leaf,
    title: "Fertilizer Management",
    description: "Precise NPK recommendations tailored to your soil's specific needs and crop requirements.",
  },
  {
    icon: Bug,
    title: "Pest Risk Assessment",
    description: "Early detection and prevention strategies to protect your crops from potential threats.",
  },
  {
    icon: TrendingUp,
    title: "Resource Optimization",
    description: "Data-driven insights to maximize productivity while minimizing input costs and waste.",
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description: "Accessible in regional languages to empower farmers across diverse communities.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Comprehensive Smart Farming Solutions
          </h2>
          <p className="text-lg text-muted-foreground">
            Advanced technology designed to address the real challenges farmers face every day
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 bg-gradient-card shadow-soft hover:shadow-glow transition-all duration-300 border-border/50"
            >
              <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
