import { useState } from "react";
import { LocationSearch } from "@/components/search/LocationSearch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SearchSection = () => {
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    console.log("Searching with location:", location);
  };

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <LocationSearch
              onLocationSelect={setLocation}
              onSearch={handleSearch}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select>
              <SelectTrigger className="w-[160px] h-[45px]">
                <DollarSign className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Under $200</SelectItem>
                <SelectItem value="mid">$200 - $500</SelectItem>
                <SelectItem value="high">$500+</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-[45px]">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};