import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sprout } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sprout className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Smart Farming</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            Revolutionizing Agriculture with{" "}
            <span className="text-primary">Real-Time Intelligence</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Leverage AI-powered insights from NPK soil sensors to predict crop yields, 
            optimize irrigation, and maximize productivity while reducing resource waste.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button size="lg" className="gap-2 shadow-soft hover:shadow-glow transition-all">
                View Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
