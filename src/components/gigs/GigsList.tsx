import { useState } from "react";
import { GigCard } from "@/components/GigCard";
import { FilterSystem } from "@/components/FilterSystem";
import { SortBy } from "@/components/SortBy";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GigsListProps {
  gigs: any[];
  onFilterChange: (filters: any) => void;
  onSortChange: (value: string) => void;
  currentSort: string;
}

export const GigsList = ({
  gigs,
  onFilterChange,
  onSortChange,
  currentSort,
}: GigsListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;
  
  const totalPages = Math.ceil(gigs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentGigs = gigs.slice(startIndex, endIndex);

  const handleExploreMore = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-neutral-900">Browse Opportunities</h2>
        <div className="flex-shrink-0">
          <SortBy onSortChange={onSortChange} currentSort={currentSort} />
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-64 sticky top-24 h-fit">
          <FilterSystem
            onFilterChange={onFilterChange}
            resultCount={gigs.length}
          />
        </div>
        
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentGigs.map((gig) => (
              <GigCard key={gig.id} {...gig} />
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-6">
            {totalPages > 1 && (
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <span className="flex items-center">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
            
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={handleExploreMore}
            >
              Explore More Profiles
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};