import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const PremiumSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Unlock Premium Features
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Get access to exclusive features and connect with top influencers
          </p>
          <Button 
            className="mt-8"
            onClick={() => navigate("/premium")}
          >
            Explore More
          </Button>
        </div>
      </div>
    </section>
  );
};