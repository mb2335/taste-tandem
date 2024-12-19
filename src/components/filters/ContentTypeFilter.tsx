import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface ContentTypeFilterProps {
  filters: any;
  onFilterChange: (category: string, subcategory: string, value: any) => void;
}

export const ContentTypeFilter = ({
  filters,
  onFilterChange,
}: ContentTypeFilterProps) => {
  const contentTypes = {
    "Restaurant Promotion/Opening": [
      "Grand Opening Coverage",
      "Exclusive Sneak Peek",
      "Launch Event Hosting",
      "VIP Experience"
    ],
    "Customer Experience": [
      "Dine-in Vlogs/Reviews",
      "Behind-the-Scenes Content",
      "Influencer Ambassadors",
      "Customer Takeover"
    ],
    "New Menu Promotion": [
      "Menu Launch Reviews",
      "Recipe Development Collaboration",
      "Limited-Time Offer Promotion",
      "Taste Testing Events"
    ],
    "Event Promotion": [
      "Themed Event Coverage",
      "Specialty Event Hosting",
      "Pop-Up or Guest Chef Events",
      "Seasonal Campaigns"
    ],
    "General Promotion": [
      "Discount or Giveaway Campaigns",
      "Photo Ops & UGC",
      "Ambassador Programs",
      "Social Media Challenges"
    ]
  };

  return (
    <div className="space-y-6">
      {Object.entries(contentTypes).map(([category, subcategories], index) => (
        <div key={category} className="space-y-2">
          <Label className="font-semibold">{`${index + 1}. ${category}`}</Label>
          <div className="space-y-2 ml-4">
            {subcategories.map((subcategory) => (
              <div key={subcategory} className="flex items-center space-x-2">
                <Checkbox
                  id={subcategory}
                  checked={filters.contentStyle.contentTypes.includes(subcategory)}
                  onCheckedChange={(checked) => {
                    const newTypes = checked
                      ? [...filters.contentStyle.contentTypes, subcategory]
                      : filters.contentStyle.contentTypes.filter((t: string) => t !== subcategory);
                    onFilterChange("contentStyle", "contentTypes", newTypes);
                  }}
                />
                <Label htmlFor={subcategory}>{subcategory}</Label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};