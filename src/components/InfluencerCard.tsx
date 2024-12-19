import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Instagram, Youtube, Star, TrendingUp, Package, Timer } from "lucide-react";

interface InfluencerCardProps {
  name: string;
  image: string;
  followers: string;
  rating: number;
  specialties: string[];
  price: string;
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
  engagement?: string;
  beforeAfterImages?: {
    before: string;
    after: string;
    description: string;
  }[];
}

export const InfluencerCard = ({
  name,
  image,
  followers,
  rating,
  specialties,
  price,
  results = [],
  packages = [],
  timeline = [],
  engagement,
  beforeAfterImages = [],
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
          {engagement && (
            <>
              <span className="text-muted-foreground">|</span>
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">{engagement}</span>
            </>
          )}
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

        {beforeAfterImages.length > 0 && (
          <div className="mb-3">
            <h4 className="font-medium text-sm mb-2">Before & After</h4>
            <div className="space-y-2">
              {beforeAfterImages.map((comparison, index) => (
                <div key={index} className="grid grid-cols-2 gap-2">
                  <div>
                    <img
                      src={comparison.before}
                      alt="Before"
                      className="w-full h-24 object-cover rounded"
                    />
                    <span className="text-xs text-muted-foreground">Before</span>
                  </div>
                  <div>
                    <img
                      src={comparison.after}
                      alt="After"
                      className="w-full h-24 object-cover rounded"
                    />
                    <span className="text-xs text-muted-foreground">After</span>
                  </div>
                  <p className="text-sm text-muted-foreground col-span-2">
                    {comparison.description}
                  </p>
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