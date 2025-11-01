import Navigation from "@/components/Navigation";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Features />
      
      <footer className="py-12 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 AgroSense. Empowering farmers with AI-driven insights.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
