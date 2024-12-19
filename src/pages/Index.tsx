import { Hero } from "@/components/Hero";
import { SearchSection } from "@/components/SearchSection";
import { GigCard } from "@/components/GigCard";
import { CategorySection } from "@/components/CategorySection";

const gigs = [
  {
    title: "Professional Food Photography Package",
    description: "High-quality photos of your restaurant's signature dishes",
    price: "$299",
    deliveryTime: "3-5 days delivery",
    rating: 4.9,
    engagement: "5.2%",
    followers: "120K",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    tags: ["Photography", "Social Media", "Branding"],
  },
  {
    title: "TikTok Restaurant Promotion",
    description: "Viral-worthy TikTok content for your restaurant",
    price: "$399",
    deliveryTime: "7 days delivery",
    rating: 4.8,
    engagement: "6.1%",
    followers: "85K",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
    tags: ["TikTok", "Video", "Social Media"],
  },
  {
    title: "Instagram Story & Post Bundle",
    description: "Comprehensive Instagram coverage of your venue",
    price: "$499",
    deliveryTime: "5-7 days delivery",
    rating: 5.0,
    engagement: "4.8%",
    followers: "200K",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    tags: ["Instagram", "Content Creation", "Stories"],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <SearchSection />
      
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Top-Rated Food Influencer Services
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