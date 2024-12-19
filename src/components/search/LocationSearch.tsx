import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocationSearchProps {
  location: string;
  setLocation: (value: string) => void;
  showLocationSuggestions: boolean;
  setShowLocationSuggestions: (value: boolean) => void;
  handleLocationSelect: (city: string) => void;
  handleSearch: () => void;
  popularCities: string[];
}

export const LocationSearch = ({
  location,
  setLocation,
  showLocationSuggestions,
  setShowLocationSuggestions,
  handleLocationSelect,
  handleSearch,
  popularCities,
}: LocationSearchProps) => {
  return (
    <div className="relative">
      <div className="flex items-center h-[45px]">
        <div className="relative">
          <Input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setShowLocationSuggestions(true)}
            className="w-[200px] h-[45px] pl-8"
          />
          <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <Button 
          className="ml-2 bg-primary hover:bg-primary/90 h-[45px]" 
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>

      {showLocationSuggestions && location.length > 0 && (
        <div className="absolute z-10 mt-1 w-[200px] bg-white rounded-md border shadow-lg">
          <div className="py-1">
            {popularCities
              .filter(city =>
                city.toLowerCase().includes(location.toLowerCase())
              )
              .map((city) => (
                <div
                  key={city}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLocationSelect(city)}
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