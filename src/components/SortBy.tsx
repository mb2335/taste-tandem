import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SortByProps {
  onSortChange: (value: string) => void;
  currentSort: string;
}

export const SortBy = ({ onSortChange, currentSort }: SortByProps) => {
  return (
    <div className="w-full flex items-center gap-2 mb-4">
      <span className="text-sm text-muted-foreground">Sort by:</span>
      <Select value={currentSort} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select sorting" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          <SelectItem value="rating">Top Rated</SelectItem>
          <SelectItem value="followers">Most Followers</SelectItem>
          <SelectItem value="engagement">Highest Engagement</SelectItem>
          <SelectItem value="reach">Highest Reach</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};