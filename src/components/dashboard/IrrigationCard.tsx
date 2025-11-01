import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const IrrigationCard = () => {
  const schedule = [
    { day: "Monday", time: "06:00 AM", duration: "45 min", status: "completed" },
    { day: "Wednesday", time: "06:00 AM", duration: "40 min", status: "upcoming" },
    { day: "Friday", time: "06:00 AM", duration: "45 min", status: "scheduled" },
  ];

  const statusColors = {
    completed: "bg-success/10 text-success border-success/20",
    upcoming: "bg-accent/10 text-accent border-accent/20",
    scheduled: "bg-muted text-muted-foreground border-border",
  };

  return (
    <Card className="shadow-soft border-border/50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-accent/10">
            <Droplets className="h-5 w-5 text-accent" />
          </div>
          <div>
            <CardTitle>Irrigation Schedule</CardTitle>
            <CardDescription>Optimized watering plan</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {schedule.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-3 rounded-lg bg-gradient-card border border-border/50"
          >
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">{item.day}</p>
                <p className="text-sm text-muted-foreground">{item.time}</p>
              </div>
            </div>
            <div className="text-right space-y-1">
              <p className="text-sm font-semibold text-foreground">{item.duration}</p>
              <Badge className={statusColors[item.status as keyof typeof statusColors]}>
                {item.status}
              </Badge>
            </div>
          </div>
        ))}
        
        <div className="mt-4 p-4 rounded-lg bg-accent/5 border border-accent/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Water Saved This Week</p>
              <p className="text-xs text-muted-foreground">vs. traditional methods</p>
            </div>
            <p className="text-2xl font-bold text-accent">32%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IrrigationCard;
