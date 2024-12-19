import { Hero } from "@/components/Hero";
import { SearchSection } from "@/components/SearchSection";
import { GigCard } from "@/components/GigCard";
import { CategorySection } from "@/components/CategorySection";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RoleSelection } from "@/components/RoleSelection";
import { LogOut } from "lucide-react";

const gigs = [
  {
    title: "Food Photography & Review",
    description: "Professional food photography and honest review of your restaurant's signature dishes",
    price: "$299",
    deliveryTime: "3-5 days",
    rating: 4.8,
    engagement: "5.2%",
    followers: "50K",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    tags: ["Food Photography", "Instagram", "Review"]
  },
  {
    title: "Instagram Story Feature",
    description: "Featured story showcase of your restaurant's ambiance and menu highlights",
    price: "$199",
    deliveryTime: "1-2 days",
    rating: 4.6,
    engagement: "4.8%",
    followers: "35K",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    tags: ["Instagram Stories", "Social Media", "Feature"]
  },
  {
    title: "TikTok Restaurant Highlight",
    description: "Viral-style TikTok video featuring your restaurant's unique aspects",
    price: "$399",
    deliveryTime: "4-6 days",
    rating: 4.9,
    engagement: "6.5%",
    followers: "75K",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9",
    tags: ["TikTok", "Video Content", "Viral"]
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        setUserRole(profile?.role || null);
      } catch (error) {
        console.error("Error fetching user role:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userRole) {
    return <RoleSelection />;
  }

  return (
    <div className="min-h-screen">
      <div className="absolute top-4 right-4">
        <Button variant="ghost" onClick={handleSignOut}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
      <Hero />
      <SearchSection />
      
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          {userRole === "restaurant" ? "Top-Rated Food Influencers" : "Restaurant Opportunities"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map((gig) => (
            <GigCard key={gig.title} {...gig} />
          ))}
        </div>
      </div>

      <CategorySection />
    </div>
  );
};

export default Index;