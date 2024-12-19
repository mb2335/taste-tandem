import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface AudienceDemographicsFilterProps {
  filters: any;
  onFilterChange: (category: string, subcategory: string, value: any) => void;
}

export const AudienceDemographicsFilter = ({
  filters,
  onFilterChange,
}: AudienceDemographicsFilterProps) => {
  const ageGroups = ["13-17", "18-24", "25-34", "35-44", "45+"];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Age Groups</Label>
        <div className="space-y-2">
          {ageGroups.map((age) => (
            <div key={age} className="flex items-center space-x-2">
              <Checkbox
                id={age}
                checked={filters.demographics.ageGroups.includes(age)}
                onCheckedChange={(checked) => {
                  const newAgeGroups = checked
                    ? [...filters.demographics.ageGroups, age]
                    : filters.demographics.ageGroups.filter((g: string) => g !== age);
                  onFilterChange("demographics", "ageGroups", newAgeGroups);
                }}
              />
              <Label htmlFor={age}>{age}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Location (City, State)</Label>
        <Input
          placeholder="e.g., Los Angeles, CA"
          value={filters.demographics.location}
          onChange={(e) =>
            onFilterChange("demographics", "location", e.target.value)
          }
        />
      </div>
    </div>
  );
};