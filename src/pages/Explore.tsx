import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import { MapPin, Star, Users, Utensils } from "lucide-react";

const Explore = () => {
  const categories = [
    { name: "Fine Dining", icon: Utensils, count: 245 },
    { name: "Casual Dining", icon: Users, count: 389 },
    { name: "Cafes", icon: Star, count: 167 },
    { name: "Street Food", icon: MapPin, count: 423 }
  ];

  const featuredCreators = [
    {
      name: "Sarah Chen",
      specialty: "Asian Fusion",
      followers: "125K",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    {
      name: "Marcus Rodriguez",
      specialty: "Fine Dining",
      followers: "89K",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    },
    {
      name: "Emma Thompson",
      specialty: "Vegan",
      followers: "94K",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Amazing Food Content Creators
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover talented food influencers and restaurants in your area
            </p>
            <div className="max-w-2xl mx-auto mt-8">
              <SearchBar />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {categories.map((category) => (
              <Card key={category.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <category.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count} creators</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Creators</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredCreators.map((creator) => (
                <Card key={creator.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-w-16 aspect-h-9">
                    <img 
                      src={creator.image} 
                      alt={creator.name}
                      className="object-cover w-full h-48"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{creator.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{creator.specialty}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        <Users className="h-4 w-4 inline mr-1" />
                        {creator.followers} followers
                      </span>
                      <Button variant="outline" size="sm">View Profile</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Explore;