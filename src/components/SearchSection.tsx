import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, DollarSign, Filter } from "lucide-react";
import { useState } from "react";

const popularCities = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Miami, FL",
  "San Francisco, CA",
  "Seattle, WA",
  "Austin, TX",
];

export const SearchSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  const handleSearch = () => {
    console.log("Searching:", { searchTerm, location });
    // Here you would implement the actual search functionality
  };

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search food influencers..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <div className="flex items-center">
                <div className="relative">
                  <Input
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onFocus={() => setShowLocationSuggestions(true)}
                    className="w-[160px] pl-8"
                  />
                  <MapPin className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {showLocationSuggestions && location.length > 0 && (
                <div className="absolute z-10 mt-1 w-[160px] bg-white rounded-md border shadow-lg">
                  <div className="py-1">
                    {popularCities
                      .filter(city =>
                        city.toLowerCase().includes(location.toLowerCase())
                      )
                      .map((city) => (
                        <div
                          key={city}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setLocation(city);
                            setShowLocationSuggestions(false);
                          }}
                        >
                          {city}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
            <Select>
              <SelectTrigger className="w-[160px]">
                <DollarSign className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Under $200</SelectItem>
                <SelectItem value="mid">$200 - $500</SelectItem>
                <SelectItem value="high">$500+</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};