import React, { useState } from "react";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Search, X, Instagram, Camera, Video, TikTok } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const suggestions = [
  { label: "Vegan", icon: "🥗", category: "Cuisine" },
  { label: "Food Photography", icon: <Camera className="h-4 w-4" />, category: "Content Type" },
  { label: "Instagram", icon: <Instagram className="h-4 w-4" />, category: "Platform" },
  { label: "TikTok", icon: <TikTok className="h-4 w-4" />, category: "Platform" },
  { label: "Food Blogger", icon: "📝", category: "Role" },
  { label: "Video Content", icon: <Video className="h-4 w-4" />, category: "Content Type" },
];

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleSelect = (value: string) => {
    if (!selectedFilters.includes(value)) {
      setSelectedFilters([...selectedFilters, value]);
    }
    setSearch("");
  };

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter));
  };

  const clearAll = () => {
    setSearch("");
    setSelectedFilters([]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="relative">
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