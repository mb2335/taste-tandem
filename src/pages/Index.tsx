import { Hero } from "@/components/Hero";
import { GigCard } from "@/components/GigCard";
import { CategorySection } from "@/components/CategorySection";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RoleSelection } from "@/components/RoleSelection";
import { LogOut } from "lucide-react";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Header } from "@/components/Header";

const gigs = [
  {
    title: "Professional Brand Identity Package",
    description: "Complete branding solution including logo, guidelines, and visual identity",
    price: "$499",
    deliveryTime: "7-10 days",
    rating: 4.9,
    engagement: "98%",
    followers: "15K",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    tags: ["Branding", "Logo Design", "Visual Identity"]
  },
  {
    title: "Restaurant Interior Photography",
    description: "High-quality photos of your restaurant's interior and ambiance",
    price: "$299",
    deliveryTime: "3-5 days",
    rating: 4.8,
    engagement: "95%",
    followers: "20K",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    tags: ["Photography", "Interior Design", "Ambiance"]
  },
  {
    title: "Custom Menu Design",
    description: "Eye-catching menu design that reflects your brand identity",
    price: "$199",
    deliveryTime: "4-6 days",
    rating: 4.7,
    engagement: "92%",
    followers: "10K",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9",
    tags: ["Menu Design", "Graphic Design", "Branding"]
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setUserRole(null);
  };

  const handleFilterChange = (category: string, subcategory: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated && !userRole) {
    return <RoleSelection />;
  }

  const filteredGigs = selectedCategory
    ? gigs.filter(gig => 
        gig.tags.some(tag => 
          tag === selectedSubcategory || 
          tag === selectedCategory
        )
      )
    : gigs;

  return (
    <div className="min-h-screen pt-16">
      <Header />
      {isAuthenticated && (
        <div className="absolute top-4 right-4">
          <Button variant="ghost" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      )}
      <Hero />
      <CategorySection />
      
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          {userRole === "restaurant" ? "Find Creative Professionals" : "Browse Opportunities"}
        </h2>
        
        <div className="flex flex-col md:flex-row gap-8">
          <CategoryFilter
            onFilterChange={handleFilterChange}
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
          />
          
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGigs.map((gig) => (
                <GigCard key={gig.title} {...gig} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
