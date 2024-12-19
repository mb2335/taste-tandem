import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { X, Save } from "lucide-react";

interface FilterSystemProps {
  onFilterChange: (filters: any) => void;
  resultCount: number;
}

export const FilterSystem = ({ onFilterChange, resultCount }: FilterSystemProps) => {
  const [filters, setFilters] = useState({
    demographics: {
      ageGroups: [],
      location: "",
      interests: [],
      engagementRate: ""
    },
    contentStyle: {
      aesthetic: [],
      contentType: [],
      consistency: "",
      authenticity: ""
    },
    niche: {
      foodTypes: [],
      isFoodCritic: false,
      lifestyle: []
    },
    budget: {
      priceRange: [0, 1000],
      collaborationType: [],
      roiFocus: []
    }
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = (category: string, subcategory: string, value: any) => {
    const newFilters = {
      ...filters,
      [category]: {
        ...filters[category],
        [subcategory]: value
      }
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
    
    // Update active filters
    const filterKey = `${category}-${subcategory}`;
    if (!activeFilters.includes(filterKey)) {
      setActiveFilters([...activeFilters, filterKey]);
    }
  };

  const clearFilters = () => {
    setFilters({
      demographics: {
        ageGroups: [],
        location: "",
        interests: [],
        engagementRate: ""
      },
      contentStyle: {
        aesthetic: [],
        contentType: [],
        consistency: "",
        authenticity: ""
      },
      niche: {
        foodTypes: [],
        isFoodCritic: false,
        lifestyle: []
      },
      budget: {
        priceRange: [0, 1000],
        collaborationType: [],
        roiFocus: []
      }
    });
    setActiveFilters([]);
    onFilterChange({});
  };

  const saveSearch = () => {
    // Save current filters to localStorage
    localStorage.setItem("savedFilters", JSON.stringify(filters));
  };

  return (
    <div className="w-full max-w-xs bg-white p-4 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={saveSearch}>
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {filter.split("-")[1]}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0"
                onClick={() => {
                  const [category, subcategory] = filter.split("-");
                  handleFilterChange(category, subcategory, []);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      <div className="text-sm text-muted-foreground mb-4">
        {resultCount} results found
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="demographics">
          <AccordionTrigger>Audience Demographics</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Age Groups</Label>
                <div className="space-y-2">
                  {["13-17", "18-24", "25-34", "35-44", "45+"].map((age) => (
                    <div key={age} className="flex items-center space-x-2">
                      <Checkbox
                        id={age}
                        checked={filters.demographics.ageGroups.includes(age)}
                        onCheckedChange={(checked) => {
                          const newAgeGroups = checked
                            ? [...filters.demographics.ageGroups, age]
                            : filters.demographics.ageGroups.filter((g) => g !== age);
                          handleFilterChange("demographics", "ageGroups", newAgeGroups);
                        }}
                      />
                      <Label htmlFor={age}>{age}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="Enter location..."
                  value={filters.demographics.location}
                  onChange={(e) =>
                    handleFilterChange("demographics", "location", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Engagement Rate</Label>
                <Select
                  value={filters.demographics.engagementRate}
                  onValueChange={(value) =>
                    handleFilterChange("demographics", "engagementRate", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (0-3%)</SelectItem>
                    <SelectItem value="medium">Medium (3-6%)</SelectItem>
                    <SelectItem value="high">High (6%+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="content">
          <AccordionTrigger>Content Style</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Content Type</Label>
                {["Photos", "Videos", "Reels", "Stories"].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={filters.contentStyle.contentType.includes(type)}
                      onCheckedChange={(checked) => {
                        const newTypes = checked
                          ? [...filters.contentStyle.contentType, type]
                          : filters.contentStyle.contentType.filter((t) => t !== type);
                        handleFilterChange("contentStyle", "contentType", newTypes);
                      }}
                    />
                    <Label htmlFor={type}>{type}</Label>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label>Consistency</Label>
                <Select
                  value={filters.contentStyle.consistency}
                  onValueChange={(value) =>
                    handleFilterChange("contentStyle", "consistency", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select posting frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="budget">
          <AccordionTrigger>Budget</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Price Range</Label>
                <div className="pt-2">
                  <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={50}
                    value={filters.budget.priceRange}
                    onValueChange={(value) =>
                      handleFilterChange("budget", "priceRange", value)
                    }
                  />
                  <div className="flex justify-between mt-2">
                    <span>${filters.budget.priceRange[0]}</span>
                    <span>${filters.budget.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Collaboration Type</Label>
                {["Paid", "Product Exchange", "Sponsored"].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={filters.budget.collaborationType.includes(type)}
                      onCheckedChange={(checked) => {
                        const newTypes = checked
                          ? [...filters.budget.collaborationType, type]
                          : filters.budget.collaborationType.filter((t) => t !== type);
                        handleFilterChange("budget", "collaborationType", newTypes);
                      }}
                    />
                    <Label htmlFor={type}>{type}</Label>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};