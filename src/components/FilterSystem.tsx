import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { AudienceDemographicsFilter } from "./filters/AudienceDemographicsFilter";
import { FoodTypesFilter } from "./filters/FoodTypesFilter";
import { PlatformFilter } from "./filters/PlatformFilter";
import { ContentTypeFilter } from "./filters/ContentTypeFilter";
import { BudgetFilter } from "./filters/BudgetFilter";

interface FilterSystemProps {
  onFilterChange: (filters: any) => void;
  resultCount: number;
}

export const FilterSystem = ({ onFilterChange, resultCount }: FilterSystemProps) => {
  const [filters, setFilters] = useState({
    demographics: {
      ageGroups: [],
      location: "",
    },
    contentStyle: {
      platforms: [],
      contentTypes: []
    },
    niche: {
      foodTypes: []
    },
    budget: {
      maxAmount: 1000,
      requiresFoodCredit: false
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
    if (!activeFilters.includes(filterKey) && 
        ((Array.isArray(value) && value.length > 0) || 
         (!Array.isArray(value) && value !== "" && value !== false))) {
      setActiveFilters([...activeFilters, filterKey]);
    } else if ((Array.isArray(value) && value.length === 0) || 
               (!Array.isArray(value) && (value === "" || value === false))) {
      setActiveFilters(activeFilters.filter(f => f !== filterKey));
    }
  };

  const clearFilters = () => {
    setFilters({
      demographics: {
        ageGroups: [],
        location: "",
      },
      contentStyle: {
        platforms: [],
        contentTypes: []
      },
      niche: {
        foodTypes: []
      },
      budget: {
        maxAmount: 1000,
        requiresFoodCredit: false
      }
    });
    setActiveFilters([]);
    onFilterChange({});
  };

  return (
    <div className="w-full max-w-xs bg-white p-4 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
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
                  handleFilterChange(category, subcategory, 
                    Array.isArray(filters[category][subcategory]) ? [] : "");
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
            <AudienceDemographicsFilter
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="foodTypes">
          <AccordionTrigger>Food Types</AccordionTrigger>
          <AccordionContent>
            <FoodTypesFilter
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="platforms">
          <AccordionTrigger>Platforms</AccordionTrigger>
          <AccordionContent>
            <PlatformFilter
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="contentTypes">
          <AccordionTrigger>Content Types</AccordionTrigger>
          <AccordionContent>
            <ContentTypeFilter
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="budget">
          <AccordionTrigger>Budget</AccordionTrigger>
          <AccordionContent>
            <BudgetFilter
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6">
        <Button
          variant="outline"
          className="w-full"
          onClick={clearFilters}
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );
};