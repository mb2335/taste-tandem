import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, Instagram, TrendingUp, Camera, Video, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface GigCardProps {
  name: string;
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
  name,
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
  const allImages = [image, ...portfolio];

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
    
    console.log("Proceeding with booking for:", name);
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="p-0">
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {allImages.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-48">
                    <img
                      src={img}
                      alt={`${name} - Image ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                    {index === 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <h3 className="font-semibold text-lg text-white">{name}</h3>
                        <p className="text-white/90 text-sm">{title}</p>
                      </div>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-white/80 hover:bg-white" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-white/80 hover:bg-white" />
          </Carousel>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{description}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <Star className="h-4 w-4 text-yellow-400" />
          <span>{rating}</span>
          <span className="text-muted-foreground">|</span>
          <Instagram className="h-4 w-4" />
          <span className="text-sm text-muted-foreground">{followers}</span>
          <span className="text-muted-foreground">|</span>
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm text-muted-foreground">{engagement} engagement</span>
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
            <Badge 
              key={tag} 
              className="bg-[#2C6F41] hover:bg-[#2C6F41]/90 text-white"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {platforms.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {platforms.map((platform) => (
              <Badge 
                key={platform} 
                variant="outline" 
                className="border-[#2C6F41] text-[#2C6F41]"
              >
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
