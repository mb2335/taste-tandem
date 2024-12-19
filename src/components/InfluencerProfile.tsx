import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Instagram, Youtube, Star } from "lucide-react";

interface InfluencerProfileProps {
  name: string;
  avatar: string;
  bio: string;
  socialMedia: {
    instagram: string;
    youtube?: string;
  };
  stats: {
    followers: string;
    engagement: string;
    rating: number;
  };
  specialties: string[];
}

export const InfluencerProfile = ({
  name,
  avatar,
  bio,
  socialMedia,
  stats,
  specialties,
}: InfluencerProfileProps) => {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <Star className="h-4 w-4 text-yellow-400" />
            <span>{stats.rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{bio}</p>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Instagram className="h-5 w-5" />
            <span>{stats.followers} followers</span>
            <span className="text-muted-foreground">|</span>
            <span>{stats.engagement} engagement rate</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary">
                {specialty}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-4">
            <a
              href={socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-pink-600 hover:text-pink-700"
            >
              <Instagram className="h-5 w-5" />
              Instagram
            </a>
            {socialMedia.youtube && (
              <a
                href={socialMedia.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <Youtube className="h-5 w-5" />
                YouTube
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};