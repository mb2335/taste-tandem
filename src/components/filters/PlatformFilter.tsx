import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface PlatformFilterProps {
  filters: any;
  onFilterChange: (category: string, subcategory: string, value: any) => void;
}

export const PlatformFilter = ({
  filters,
  onFilterChange,
}: PlatformFilterProps) => {
  const platforms = ["Facebook", "Instagram", "YouTube Videos", "TikToks"];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Platforms</Label>
        <div className="space-y-2">
          {platforms.map((platform) => (
            <div key={platform} className="flex items-center space-x-2">
              <Checkbox
                id={platform}
                checked={filters.contentStyle.platforms.includes(platform)}
                onCheckedChange={(checked) => {
                  const newPlatforms = checked
                    ? [...filters.contentStyle.platforms, platform]
                    : filters.contentStyle.platforms.filter((p: string) => p !== platform);
                  onFilterChange("contentStyle", "platforms", newPlatforms);
                }}
              />
              <Label htmlFor={platform}>{platform}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};