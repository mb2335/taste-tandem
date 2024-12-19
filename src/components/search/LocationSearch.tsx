import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

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

interface LocationSearchProps {
  onLocationSelect: (location: string) => void;
  onSearch: () => void;
}

export const LocationSearch = ({ onLocationSelect, onSearch }: LocationSearchProps) => {
  const [location, setLocation] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  // Update filtered cities whenever location changes
  useEffect(() => {
    if (!location) {
      setFilteredCities([]);
      return;
    }

    const filtered = popularCities.filter(city =>
      city.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredCities(filtered);
  }, [location]);

  const handleLocationChange = (value: string) => {
    setLocation(value);
    setShowSuggestions(true);
  };

  const handleCitySelect = (city: string) => {
    setLocation(city);
    onLocationSelect(city);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center h-[45px]">
        <div className="relative">
          <Input
            placeholder="Location"
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            className="w-[200px] h-[45px] pl-8"
          />
          <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <Button 
          className="ml-2 bg-primary hover:bg-primary/90 h-[45px]" 
          onClick={onSearch}
        >
          Search
        </Button>
      </div>

      {showSuggestions && filteredCities.length > 0 && (
        <div className="absolute z-10 mt-1 w-[200px] bg-white rounded-md border shadow-lg">
          <div className="py-1">
            {filteredCities.map((city) => (
              <div
                key={city}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleCitySelect(city)}
              >
                {city}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};