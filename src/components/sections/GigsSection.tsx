import { useState } from "react";
import { GigCard } from "@/components/GigCard";
import { FilterSystem } from "@/components/FilterSystem";
import { SortBy } from "@/components/SortBy";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";

interface GigsSectionProps {
  gigs: any[];
  onFilterChange: (filters: any) => void;
  onSortChange: (value: string) => void;
  currentSort: string;
}

export const GigsSection = ({
  gigs,
  onFilterChange,
  onSortChange,
  currentSort,
}: GigsSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;
  
  const totalPages = Math.ceil(gigs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentGigs = gigs.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-64 sticky top-24 h-fit">
        <FilterSystem
          onFilterChange={onFilterChange}
          resultCount={gigs.length}
        />
      </div>
      
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentGigs.map((gig, index) => (
            <GigCard key={gig.id || index} {...gig} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-4">
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
      </div>
    </div>
  );
};