import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SelectedFiltersProps {
  selectedFilters: string[];
  removeFilter: (filter: string) => void;
}

export const SelectedFilters = ({
  selectedFilters,
  removeFilter,
}: SelectedFiltersProps) => {
  if (selectedFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {selectedFilters.map((filter) => (
        <Badge
          key={filter}
          variant="secondary"
          className="flex items-center gap-1"
        >
          {filter}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => removeFilter(filter)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
    </div>
  );
};