import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

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
        <div className="w-full max-w-md mx-auto relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search food influencers..."
            className="pl-10 bg-white/90 border-0 h-12"
          />
        </div>
      </div>
    </div>
  );
};