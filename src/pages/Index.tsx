import { Hero } from "@/components/Hero";
import { GigCard } from "@/components/GigCard";
import { Header } from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { FilterSystem } from "@/components/FilterSystem";
import { SortBy } from "@/components/SortBy";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Gig {
  id?: string;
  name: string;
  title: string;
  description: string;
  price: string;
  deliveryTime: string;
  rating: number;
  engagement: string;
  followers: string;
  image: string;
  tags: string[];
  platforms: string[];
  contentType: string;
  portfolio: string[];
}

const sampleGigs: Gig[] = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
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
  },
  {
    id: "4",
    name: "David Kim",
    title: "Korean BBQ Specialist",
    description: "Showcasing authentic Korean BBQ and street food culture",
    price: "$349",
    deliveryTime: "3-5 days",
    rating: 4.9,
    engagement: "5.8%",
    followers: "110K",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
    tags: ["Korean Cuisine", "BBQ", "Street Food"],
    platforms: ["Instagram", "YouTube"],
    contentType: "Photo & Video",
    portfolio: [
      "https://images.unsplash.com/photo-1590330297626-d7aff25a0431",
      "https://images.unsplash.com/photo-1590301157890-4810ed352733",
      "https://images.unsplash.com/photo-1590301157047-aa69e6452ddd"
    ]
  },
  {
    id: "5",
    name: "Maria Garcia",
    title: "Mexican Food Creator",
    description: "Authentic Mexican recipes and cultural food stories",
    price: "$279",
    deliveryTime: "2-4 days",
    rating: 4.7,
    engagement: "6.2%",
    followers: "95K",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    tags: ["Mexican Cuisine", "Traditional", "Recipe Development"],
    platforms: ["Instagram", "TikTok"],
    contentType: "Photo & Video",
    portfolio: [
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828"
    ]
  },
  {
    id: "6",
    name: "Alex Chen",
    title: "Food Photography Expert",
    description: "Professional food photography and styling",
    price: "$499",
    deliveryTime: "4-6 days",
    rating: 4.9,
    engagement: "4.5%",
    followers: "75K",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    tags: ["Food Photography", "Styling", "Professional"],
    platforms: ["Instagram"],
    contentType: "Photo",
    portfolio: [
      "https://images.unsplash.com/photo-1495521821757-a1efb6729352",
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543",
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288"
    ]
  }
];

const ITEMS_PER_PAGE = 9;

const Index = () => {
  const [currentSort, setCurrentSort] = useState("price-asc");
  const [filteredGigs, setFilteredGigs] = useState(sampleGigs);
  const [currentPage, setCurrentPage] = useState(1);
  const [profileTags, setProfileTags] = useState([]);

  const totalPages = Math.ceil(filteredGigs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentGigs = filteredGigs.slice(startIndex, endIndex);

  useEffect(() => {
    fetchProfileTags();
  }, []);

  const fetchProfileTags = async () => {
    const { data, error } = await supabase
      .from('profile_tags')
      .select('*');
    
    if (data) {
      setProfileTags(data);
    }
  };

  const handleFilterChange = async (filters: any) => {
    let filtered = [...sampleGigs];

    if (filters.demographics?.ageGroups?.length > 0) {
      const { data } = await supabase
        .from('profile_tags')
        .select('profile_id')
        .eq('tag_category', 'demographics')
        .in('tag_name', filters.demographics.ageGroups);

      if (data) {
        const profileIds = data.map(tag => tag.profile_id);
        filtered = filtered.filter(gig => gig.id && profileIds.includes(gig.id));
      }
    }

    if (filters.contentStyle?.platforms?.length > 0) {
      const { data } = await supabase
        .from('profile_tags')
        .select('profile_id')
        .eq('tag_category', 'platform')
        .in('tag_name', filters.contentStyle.platforms);

      if (data) {
        const profileIds = data.map(tag => tag.profile_id);
        filtered = filtered.filter(gig => gig.id && profileIds.includes(gig.id));
      }
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
      <Header />
      <Hero />
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-neutral-900">Browse Opportunities</h2>
          <div className="flex-shrink-0">
            <SortBy onSortChange={handleSortChange} currentSort={currentSort} />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-64 sticky top-24 h-fit">
            <FilterSystem
              onFilterChange={handleFilterChange}
              resultCount={filteredGigs.length}
            />
          </div>
          
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentGigs.map((gig, index) => (
                <GigCard key={gig.id || index} {...gig} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <span className="flex items-center">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
