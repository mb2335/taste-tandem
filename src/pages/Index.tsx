import { Hero } from "@/components/Hero";
import { Header } from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { GigsSection } from "@/components/sections/GigsSection";
import { PremiumSection } from "@/components/sections/PremiumSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Footer } from "@/components/Footer";
import { SortBy } from "@/components/SortBy";

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

const Index = () => {
  const [currentSort, setCurrentSort] = useState("price-asc");
  const [filteredGigs, setFilteredGigs] = useState(sampleGigs);

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
        
        <GigsSection
          gigs={filteredGigs}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          currentSort={currentSort}
        />
      </div>

      <PremiumSection />
      <BlogSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
