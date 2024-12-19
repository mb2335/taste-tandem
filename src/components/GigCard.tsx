import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, Instagram, TrendingUp, Package, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface GigCardProps {
  title: string;
  description: string;
  price: string;
  deliveryTime: string;
  rating: number;
  engagement: string;
  followers: string;
  image: string;
  tags: string[];
  results?: {
    metric: string;
    value: string;
  }[];
  packages?: {
    name: string;
    price: string;
    features: string[];
  }[];
  timeline?: {
    phase: string;
    duration: string;
  }[];
}

export const GigCard = ({
  title,
  description,
  price,
  deliveryTime,
  rating,
  engagement,
  followers,
  image,
  tags,
  results = [],
  packages = [],
  timeline = [],
}: GigCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleViewDetails = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to proceed with checkout",
        variant: "default",
      });
      navigate("/auth");
      return;
    }
    
    console.log("Proceeding with checkout for:", title);
  };

  return (
    <Card className="card-hover">
      <CardHeader className="p-0">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-3">{description}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <Star className="h-4 w-4 text-yellow-400" />
          <span>{rating}</span>
          <span className="text-muted-foreground">|</span>
          <Instagram className="h-4 w-4" />
          <span className="text-sm text-muted-foreground">{followers}</span>
          <span className="text-muted-foreground">|</span>
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm text-muted-foreground">{engagement}</span>
        </div>

        {results.length > 0 && (
          <div className="mb-3">
            <h4 className="font-medium text-sm mb-2">Past Results</h4>
            <div className="grid grid-cols-2 gap-2">
              {results.map((result, index) => (
                <div key={index} className="bg-muted p-2 rounded">
                  <div className="text-sm font-medium">{result.metric}</div>
                  <div className="text-sm text-muted-foreground">{result.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {packages.length > 0 && (
          <div className="mb-3">
            <h4 className="font-medium text-sm mb-2">Available Packages</h4>
            <div className="space-y-2">
              {packages.map((pkg, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  <span className="text-sm">{pkg.name}</span>
                  <span className="text-sm text-muted-foreground">from {pkg.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {timeline.length > 0 && (
          <div className="mb-3">
            <h4 className="font-medium text-sm mb-2">Project Timeline</h4>
            <div className="space-y-2">
              {timeline.map((phase, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Timer className="h-4 w-4" />
                  <span className="text-sm">{phase.phase}</span>
                  <span className="text-sm text-muted-foreground">{phase.duration}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{deliveryTime}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <span className="font-semibold text-lg">Starting at {price}</span>
        <Button onClick={handleViewDetails}>View Details</Button>
      </CardFooter>
    </Card>
  );
};