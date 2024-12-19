import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Crown, Star, Gem } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const PremiumSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Crown className="h-8 w-8 text-yellow-500" />,
      title: "Priority Matching",
      description: "Get matched with top restaurants and influencers first"
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      title: "Advanced Analytics",
      description: "Track your campaign performance with detailed insights"
    },
    {
      icon: <Gem className="h-8 w-8 text-yellow-500" />,
      title: "Verified Status",
      description: "Stand out with a verified badge on your profile"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Unlock Premium Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take your food content creation to the next level with our premium features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white"
            onClick={() => navigate("/premium")}
          >
            Upgrade Now
          </Button>
        </div>
      </div>
    </section>
  );
};