import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
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
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg">
              I'm a Restaurant
            </Button>
            <Button size="lg" className="text-lg bg-white text-primary hover:bg-white/90">
              I'm an Influencer
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="w-full max-w-md relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search food influencers..."
              className="pl-10 bg-white/90 border-0 h-12"
            />
          </div>
        </div>
      </div>
    </div>
  );
};