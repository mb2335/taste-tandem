import { Hero } from "@/components/Hero";
import { GigCard } from "@/components/GigCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { FilterSystem } from "@/components/FilterSystem";
import { SortBy } from "@/components/SortBy";

const gigs = [
  {
    name: "Sarah Chen",
    title: "Food & Lifestyle Content Creator",
    description: "Specializing in authentic Asian cuisine and modern fusion dishes",
    price: "$299",
    deliveryTime: "3-5 days",
    rating: 4.9,
    engagement: "5.2%",
    followers: "125K",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    tags: ["Asian Cuisine", "Food Photography", "Recipe Development"],
    platforms: ["Instagram", "TikTok"],
    contentType: "Photo & Video",
    portfolio: [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
    ]
  },
  {
    name: "Marcus Rodriguez",
    title: "Restaurant & Bar Specialist",
    description: "Creating engaging content for upscale dining establishments",
    price: "$399",
    deliveryTime: "4-6 days",
    rating: 4.8,
    engagement: "4.8%",
    followers: "85K",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    tags: ["Fine Dining", "Cocktails", "Restaurant Reviews"],
    platforms: ["YouTube", "Instagram"],
    contentType: "Video",
    portfolio: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de",
      "https://images.unsplash.com/photo-1544025162-d76694265947",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de"
    ]
  },
  {
    name: "Emma Thompson",
    title: "Healthy Food Influencer",
    description: "Passionate about creating content for health-conscious restaurants",
    price: "$249",
    deliveryTime: "2-4 days",
    rating: 4.7,
    engagement: "6.1%",
    followers: "95K",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    tags: ["Healthy Eating", "Vegan", "Food Styling"],
    platforms: ["Instagram", "TikTok", "YouTube"],
    contentType: "Photo & Video",
    portfolio: [
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352"
    ]
  }
];

const Index = () => {
  const [currentSort, setCurrentSort] = useState("price-asc");
  const [filteredGigs, setFilteredGigs] = useState(gigs);

  const handleFilterChange = (filters: any) => {
    let filtered = [...gigs];

    // Example filter logic (expand based on your needs)
    if (filters.demographics?.ageGroups?.length > 0) {
      // Filter by age groups
    }

    if (filters.contentStyle?.contentType?.length > 0) {
      filtered = filtered.filter(gig => 
        filters.contentStyle.contentType.some((type: string) => 
          gig.tags.includes(type)
        )
      );
    }

    if (filters.budget?.maxAmount) {
      filtered = filtered.filter(gig => {
        const price = parseInt(gig.price.replace(/[^0-9]/g, ""));
        return price <= filters.budget.maxAmount;
      });
    }

    setFilteredGigs(filtered);
  };

  const handleSortChange = (value: string) => {
    setCurrentSort(value);
    const sorted = [...filteredGigs].sort((a, b) => {
      switch (value) {
        case "price-asc":
          return parseInt(a.price.slice(1)) - parseInt(b.price.slice(1));
        case "price-desc":
          return parseInt(b.price.slice(1)) - parseInt(a.price.slice(1));
        case "rating":
          return b.rating - a.rating;
        case "followers":
          return parseInt(b.followers) - parseInt(a.followers);
        case "engagement":
          return parseFloat(b.engagement) - parseFloat(a.engagement);
        case "reach":
          return parseInt(b.followers) * (parseFloat(b.engagement)/100) - 
                 parseInt(a.followers) * (parseFloat(a.engagement)/100);
        default:
          return 0;
      }
    });
    setFilteredGigs(sorted);
  };

  return (
    <div className="min-h-screen">
      <Hero />
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Browse Opportunities</h2>
          <SortBy onSortChange={handleSortChange} currentSort={currentSort} />
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <FilterSystem
            onFilterChange={handleFilterChange}
            resultCount={filteredGigs.length}
          />
          
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGigs.map((gig, index) => (
                <GigCard key={index} {...gig} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
