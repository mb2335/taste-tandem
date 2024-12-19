import { Button } from "@/components/ui/button";
import { Crown, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            Taste Tandem
          </Link>
          
          <nav className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="text-sm">
              <Crown className="mr-2 h-4 w-4" />
              Premium
            </Button>
            <Button variant="ghost" className="text-sm">
              Explore
            </Button>
            <Link to="/services">
              <Button variant="ghost" className="text-sm">
                Additional Services
              </Button>
            </Link>
            <Button variant="ghost" className="text-sm">
              I'm an Influencer
            </Button>
            <Button variant="default" className="text-sm">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};