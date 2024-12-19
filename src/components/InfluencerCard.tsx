import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Instagram, Youtube, Star } from "lucide-react";

interface InfluencerCardProps {
  name: string;
  image: string;
  followers: string;
  rating: number;
  specialties: string[];
  price: string;
}

export const InfluencerCard = ({
  name,
  image,
  followers,
  rating,
  specialties,
  price,
}: InfluencerCardProps) => {
  return (
    <Card className="card-hover">
      <CardHeader className="relative p-0">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg">{name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span>{rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <Instagram className="h-4 w-4" />
          <span className="text-sm text-muted-foreground">{followers}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {specialties.map((specialty) => (
            <Badge key={specialty} variant="secondary">
              {specialty}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="font-semibold text-lg">{price}</span>
        <Button>View Profile</Button>
      </CardFooter>
    </Card>
  );
};