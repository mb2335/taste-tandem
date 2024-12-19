import { Hero } from "@/components/Hero";
import { GigCard } from "@/components/GigCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RoleSelection } from "@/components/RoleSelection";
import { LogOut } from "lucide-react";
import { FilterSystem } from "@/components/FilterSystem";
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setUserRole(null);
  };

  const handleFilterChange = (filters: any) => {
    // Apply filters to gigs
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

    if (filters.budget?.priceRange) {
      const [min, max] = filters.budget.priceRange;
      filtered = filtered.filter(gig => {
        const price = parseInt(gig.price.replace(/[^0-9]/g, ""));
        return price >= min && price <= max;
      });
    }

    setFilteredGigs(filtered);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated && !userRole) {
    return <RoleSelection />;
  }

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
      
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          {userRole === "restaurant" ? "Find Creative Professionals" : "Browse Opportunities"}
        </h2>
        
        <div className="flex flex-col md:flex-row gap-8">
          <FilterSystem
            onFilterChange={handleFilterChange}
            resultCount={filteredGigs.length}
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