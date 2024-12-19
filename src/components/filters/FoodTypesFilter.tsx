import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface FoodTypesFilterProps {
  filters: any;
  onFilterChange: (category: string, subcategory: string, value: any) => void;
}

export const FoodTypesFilter = ({
  filters,
  onFilterChange,
}: FoodTypesFilterProps) => {
  const foodTypes = [
    "Vegan & Plant-Based",
    "Healthy & Organic",
    "Comfort & Casual",
    "Fine Dining & Gourmet",
    "International Cuisines"
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Food Types</Label>
        <div className="space-y-2">
          {foodTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={filters.niche.foodTypes.includes(type)}
                onCheckedChange={(checked) => {
                  const newTypes = checked
                    ? [...filters.niche.foodTypes, type]
                    : filters.niche.foodTypes.filter((t: string) => t !== type);
                  onFilterChange("niche", "foodTypes", newTypes);
                }}
              />
              <Label htmlFor={type}>{type}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};