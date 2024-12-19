import { SearchSection } from "@/components/SearchSection";
import { CategorySection } from "@/components/CategorySection";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { RoleSelection } from "@/components/RoleSelection";
import { DashboardLayout, Goal } from "@/components/DashboardLayout";
import { WelcomeSection } from "@/components/WelcomeSection";
import { FilteredGigs } from "@/components/FilteredGigs";
import { AuthControls } from "@/components/AuthControls";

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
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>();
  const [filteredGigs, setFilteredGigs] = useState(gigs);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
        
        if (session) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();
          
          setUserRole(profile?.role || null);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (selectedGoal) {
      const filtered = gigs.filter(gig => 
        gig.tags.some(tag => selectedGoal.services.includes(tag))
      );
      setFilteredGigs(filtered);
    } else {
      setFilteredGigs(gigs);
    }
  }, [selectedGoal]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated && !userRole) {
    return <RoleSelection />;
  }

  return (
    <DashboardLayout onGoalSelect={setSelectedGoal} selectedGoal={selectedGoal}>
      <AuthControls isAuthenticated={isAuthenticated} />
      <WelcomeSection selectedGoal={selectedGoal} />
      <SearchSection />
      <FilteredGigs filteredGigs={filteredGigs} />
      <CategorySection />
    </DashboardLayout>
  );
};

export default Index;