import { Button } from "@/components/ui/button";
import { Crown, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/57c22295-a4c9-4557-ad57-4284536ee11e.png" 
              alt="Pnosh Logo" 
              className="h-8"
            />
          </Link>
          
          <nav className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="text-sm text-neutral-900">
              <Crown className="mr-2 h-4 w-4" />
              Premium
            </Button>
            <Button variant="ghost" className="text-sm text-neutral-900">
              Explore
            </Button>
            <Link to="/services">
              <Button variant="ghost" className="text-sm text-neutral-900">
                Additional Services
              </Button>
            </Link>
            <Button variant="ghost" className="text-sm text-neutral-900">
              I'm an Influencer
            </Button>
            <Button variant="default" className="text-sm bg-primary hover:bg-primary/90">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};