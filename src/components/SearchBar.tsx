import { useState, useCallback } from "react";
import { 
  Command,
  CommandInput,
  CommandEmpty,
} from "@/components/ui/command";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocationSearch } from "./search/LocationSearch";
import { SelectedFilters } from "./search/SelectedFilters";
import { SuggestionList } from "./search/SuggestionList";
import { Suggestion } from "@/types/search";
import { Camera, Instagram, Video } from "lucide-react";

const suggestions: Suggestion[] = [
  { label: "Vegan", icon: "🥗", category: "Cuisine" },
  { label: "Food Photography", icon: <Camera className="h-4 w-4" />, category: "Content Type" },
  { label: "Instagram", icon: <Instagram className="h-4 w-4" />, category: "Platform" },
  { label: "TikTok", icon: <Video className="h-4 w-4" />, category: "Platform" },
  { label: "Food Blogger", icon: "📝", category: "Role" },
  { label: "Video Content", icon: <Video className="h-4 w-4" />, category: "Content Type" },
];

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSelect = useCallback((value: string) => {
    if (!selectedFilters.includes(value)) {
      setSelectedFilters(prev => [...prev, value]);
    }
    setSearch("");
    setShowSuggestions(false);
  }, [selectedFilters]);

  const handleLocationSelect = useCallback((city: string) => {
    setLocation(city);
    setShowLocationSuggestions(false);
  }, []);

  const removeFilter = useCallback((filter: string) => {
    setSelectedFilters(prev => prev.filter(f => f !== filter));
  }, []);

  const clearAll = useCallback(() => {
    setSearch("");
    setSelectedFilters([]);
    setShowSuggestions(false);
  }, []);

  const handleSearch = useCallback(() => {
    console.log("Searching with filters:", {
      filters: selectedFilters,
      location: location,
    });
  }, [selectedFilters, location]);

  const filteredSuggestions = search 
    ? suggestions.filter(suggestion =>
        suggestion.label.toLowerCase().includes(search.toLowerCase()) &&
        !selectedFilters.includes(suggestion.label)
      )
    : [];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Command className="rounded-lg border shadow-md">
            <CommandInput
              placeholder="Search food influencers..."
              value={search}
              onValueChange={(value) => {
                setSearch(value);
                setShowSuggestions(true);
              }}
              className="h-[45px] w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0"
            />
            {(search || selectedFilters.length > 0) && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8"
                onClick={clearAll}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            {showSuggestions && search && (
              <>
                {filteredSuggestions.length > 0 ? (
                  <SuggestionList 
                    suggestions={filteredSuggestions}
                    onSelect={handleSelect}
                  />
                ) : (
                  <CommandEmpty>No results found.</CommandEmpty>
                )}
              </>
            )}
          </Command>
        </div>

        <LocationSearch
          location={location}
          setLocation={setLocation}
          showLocationSuggestions={showLocationSuggestions}
          setShowLocationSuggestions={setShowLocationSuggestions}
          handleLocationSelect={handleLocationSelect}
          handleSearch={handleSearch}
          popularCities={[
            "New York, NY",
            "Los Angeles, CA",
            "Chicago, IL",
            "Houston, TX",
            "Miami, FL",
            "San Francisco, CA",
            "Seattle, WA",
            "Austin, TX",
          ]}
        />
      </div>

      <SelectedFilters
        selectedFilters={selectedFilters}
        removeFilter={removeFilter}
      />
    </div>
  );
};