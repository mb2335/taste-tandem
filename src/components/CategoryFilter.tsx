import { useState } from "react";
import { serviceCategories } from "@/data/serviceCategories";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check } from "lucide-react";

interface CategoryFilterProps {
  onFilterChange: (category: string, subcategory: string) => void;
  selectedCategory: string;
  selectedSubcategory: string;
}

export const CategoryFilter = ({
  onFilterChange,
  selectedCategory,
  selectedSubcategory,
}: CategoryFilterProps) => {
  return (
    <div className="w-full md:w-64 bg-white p-4 rounded-lg border">
      <h3 className="text-lg font-semibold mb-4">Categories</h3>
      <Accordion type="single" collapsible className="w-full">
        {serviceCategories.map((category) => (
          <AccordionItem key={category.name} value={category.name}>
            <AccordionTrigger className="text-sm hover:no-underline">
              {category.name}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2 pl-2">
                {category.subcategories.map((subcategory) => (
                  <Button
                    key={subcategory}
                    variant="ghost"
                    className="justify-start h-8 px-2"
                    onClick={() => onFilterChange(category.name, subcategory)}
                  >
                    <span className="relative flex items-center">
                      {selectedCategory === category.name &&
                        selectedSubcategory === subcategory && (
                          <Check className="h-4 w-4 mr-2 text-primary" />
                        )}
                      <span className="text-sm">{subcategory}</span>
                    </span>
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};