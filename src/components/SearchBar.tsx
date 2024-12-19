import React, { useState } from "react";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Search, X, Instagram, Camera, Video, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const suggestions = [
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

  const handleSelect = (value: string) => {
    if (!selectedFilters.includes(value)) {
      setSelectedFilters([...selectedFilters, value]);
    }
    setSearch("");
  };

  const handleLocationSelect = (city: string) => {
    setLocation(city);
    setShowLocationSuggestions(false);
  };

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter));
  };

  const clearAll = () => {
    setSearch("");
    setLocation("");
    setSelectedFilters([]);
  };

  const handleSearch = () => {
    console.log("Searching with filters:", {
      filters: selectedFilters,
      location: location,
    });
    // Here you would implement the actual search functionality
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Command className="rounded-lg border shadow-md">
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <CommandInput
                placeholder="Search food influencers..."
                value={search}
                onValueChange={setSearch}
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
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
            {search && (
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {Object.entries(
                  suggestions.reduce((acc, suggestion) => {
                    if (!acc[suggestion.category]) {
                      acc[suggestion.category] = [];
                    }
                    if (
                      suggestion.label
                        .toLowerCase()
                        .includes(search.toLowerCase()) &&
                      !selectedFilters.includes(suggestion.label)
                    ) {
                      acc[suggestion.category].push(suggestion);
                    }
                    return acc;
                  }, {} as Record<string, typeof suggestions>)
                ).map(([category, items]) => (
                  items.length > 0 && (
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
                  )
                ))}
              </CommandList>
            )}
          </Command>
        </div>

        <div className="relative">
          <div className="flex items-center">
            <div className="relative">
              <Input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onFocus={() => setShowLocationSuggestions(true)}
                className="w-[200px] pl-8"
              />
              <MapPin className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
            </div>
            <Button 
              className="ml-2 bg-primary hover:bg-primary/90" 
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
      </div>

      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {filter}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => removeFilter(filter)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};