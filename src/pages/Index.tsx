import { Hero } from "@/components/Hero";
import { InfluencerCard } from "@/components/InfluencerCard";
import { CategorySection } from "@/components/CategorySection";

const featuredInfluencers = [
  {
    name: "Sarah Chen",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    followers: "120K followers",
    rating: 4.9,
    specialties: ["Food Photography", "Restaurant Reviews"],
    price: "From $299",
  },
  {
    name: "Mike Johnson",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
    followers: "85K followers",
    rating: 4.8,
    specialties: ["Video Content", "Social Media"],
    price: "From $249",
  },
  {
    name: "Lisa Wong",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    followers: "200K followers",
    rating: 5.0,
    specialties: ["Food Styling", "Brand Collaboration"],
    price: "From $399",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Influencers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredInfluencers.map((influencer) => (
            <InfluencerCard key={influencer.name} {...influencer} />
          ))}
        </div>
      </section>

      <CategorySection />
    </div>
  );
};

export default Index;