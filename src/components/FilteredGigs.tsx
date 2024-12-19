import { GigCard } from "./GigCard";
import { Goal } from "./DashboardLayout";

interface FilteredGigsProps {
  filteredGigs: any[];
}

export const FilteredGigs = ({ filteredGigs }: FilteredGigsProps) => {
  return (
    <div className="max-w-7xl mx-auto py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGigs.map((gig) => (
          <GigCard key={gig.title} {...gig} />
        ))}
      </div>
      {filteredGigs.length === 0 && (
        <p className="text-center text-muted-foreground mt-8">
          No services found for this goal. Please try another goal or contact us for custom solutions.
        </p>
      )}
    </div>
  );
};