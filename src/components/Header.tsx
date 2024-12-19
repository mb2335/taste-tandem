import { Button } from "@/components/ui/button";
import { Crown, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            Taste Tandem
          </Link>
          
          <nav className="flex items-center gap-4">
            <Button variant="ghost" className="text-sm">
              <Crown className="mr-2 h-4 w-4" />
              Premium
            </Button>
            <Button variant="ghost" className="text-sm">
              Explore
            </Button>
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