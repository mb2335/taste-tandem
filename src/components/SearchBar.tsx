import { useState } from "react";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Search, X, Instagram, Camera, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocationSearch } from "./search/LocationSearch";
import { SelectedFilters } from "./search/SelectedFilters";
import { Suggestion, GroupedSuggestions } from "@/types/search";

const suggestions: Suggestion[] = [
  { label: "Vegan", icon: "🥗", category: "Cuisine" },
  { label: "Food Photography", icon: <Camera className="h-4 w-4" />, category: "Content Type" },
  { label: "Instagram", icon: <Instagram className="h-4 w-4" />, category: "Platform" },
  { label: "TikTok", icon: <Video className="h-4 w-4" />, category: "Platform" },
  { label: "Food Blogger", icon: "📝", category: "Role" },
  { label: "Video Content", icon: <Video className="h-4 w-4" />, category: "Content Type" },
];

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

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSelect = (value: string) => {
    if (!selectedFilters.includes(value)) {
      setSelectedFilters(prev => [...prev, value]);
    }
    setSearch("");
    setShowSuggestions(false);
  };

  const handleLocationSelect = (city: string) => {
    setLocation(city);
    setShowLocationSuggestions(false);
  };

  const removeFilter = (filter: string) => {
    setSelectedFilters(prev => prev.filter(f => f !== filter));
  };

  const clearAll = () => {
    setSearch("");
    setSelectedFilters([]);
    setShowSuggestions(false);
  };

  const handleSearch = () => {
    console.log("Searching with filters:", {
      filters: selectedFilters,
      location: location,
    });
  };

  // Filter suggestions based on search input
  const filteredSuggestions = search 
    ? suggestions.filter(suggestion =>
        suggestion.label.toLowerCase().includes(search.toLowerCase()) &&
        !selectedFilters.includes(suggestion.label)
      )
    : [];

  // Group suggestions by category only if we have filtered suggestions
  const groupedSuggestions = filteredSuggestions.reduce((acc: GroupedSuggestions, suggestion) => {
    if (!acc[suggestion.category]) {
      acc[suggestion.category] = [];
    }
    acc[suggestion.category].push(suggestion);
    return acc;
  }, {});

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Command className="rounded-lg border shadow-md">
            <div className="flex items-center border-b px-3">
              <CommandInput
                placeholder="Search food influencers..."
                value={search}
                onValueChange={(value) => {
                  setSearch(value);
                  setShowSuggestions(true);
                }}
                className="flex h-[45px] w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0"
              />
              {(search || selectedFilters.length > 0) && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={clearAll}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {showSuggestions && search && filteredSuggestions.length > 0 && (
              <CommandList>
                {Object.entries(groupedSuggestions).map(([category, items]) => (
                  <CommandGroup key={category} heading={category}>
                    {items.map((suggestion) => (
                      <CommandItem
                        key={suggestion.label}
                        value={suggestion.label}
                        onSelect={handleSelect}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        {typeof suggestion.icon === "string" ? (
                          <span>{suggestion.icon}</span>
                        ) : (
                          suggestion.icon
                        )}
                        {suggestion.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
            )}
            {showSuggestions && search && filteredSuggestions.length === 0 && (
              <CommandEmpty>No results found.</CommandEmpty>
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
          popularCities={popularCities}
        />
      </div>

      <SelectedFilters
        selectedFilters={selectedFilters}
        removeFilter={removeFilter}
      />
    </div>
  );
};