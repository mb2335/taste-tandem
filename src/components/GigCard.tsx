import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, Instagram, TrendingUp, Camera, Video } from "lucide-react";
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
  platforms?: string[];
  contentType?: string;
  portfolio?: string[];
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
  platforms = [],
  contentType,
  portfolio = [],
}: GigCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleViewDetails = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to proceed with booking",
        variant: "default",
      });
      navigate("/auth");
      return;
    }
    
    // Proceed with booking logic here
    console.log("Proceeding with booking for:", title);
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

        {contentType && (
          <div className="flex items-center gap-2 mb-3">
            {contentType.includes("Photo") && <Camera className="h-4 w-4" />}
            {contentType.includes("Video") && <Video className="h-4 w-4" />}
            <span className="text-sm">{contentType}</span>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        {platforms.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {platforms.map((platform) => (
              <Badge key={platform} variant="outline">
                {platform}
              </Badge>
            ))}
          </div>
        )}
        
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