import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface BudgetFilterProps {
  filters: any;
  onFilterChange: (category: string, subcategory: string, value: any) => void;
}

export const BudgetFilter = ({
  filters,
  onFilterChange,
}: BudgetFilterProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Budget Range ($0 - $1000)</Label>
        <Slider
          defaultValue={[filters.budget?.maxAmount || 1000]}
          max={1000}
          step={50}
          onValueChange={(value) => {
            onFilterChange("budget", "maxAmount", value[0]);
          }}
        />
        <div className="text-sm text-muted-foreground mt-1">
          Max: ${filters.budget?.maxAmount || 1000}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="foodCredit"
            checked={filters.budget?.requiresFoodCredit}
            onCheckedChange={(checked) => {
              onFilterChange("budget", "requiresFoodCredit", checked);
            }}
          />
          <Label htmlFor="foodCredit">Does not require Food Credit</Label>
        </div>
      </div>
    </div>
  );
};