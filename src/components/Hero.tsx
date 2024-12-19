import { SearchBar } from "@/components/SearchBar";

export const Hero = () => {
  return (
    <div className="hero-gradient min-h-[600px] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
          Connect Food Influencers with Amazing Restaurants
        </h1>
        <p className="text-xl sm:text-2xl text-white/90 mb-8">
          The premier marketplace for food content creators and restaurants to collaborate and create amazing content
        </p>
        <SearchBar />
      </div>
    </div>
  );
};