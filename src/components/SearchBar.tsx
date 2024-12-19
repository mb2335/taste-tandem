import { useState, useCallback } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Tag {
  id: string;
  label: string;
  category: string;
}

const predefinedTags: Tag[] = [
  { id: "1", label: "Food Photography", category: "Content Type" },
  { id: "2", label: "Recipe Development", category: "Expertise" },
  { id: "3", label: "Restaurant Reviews", category: "Content Type" },
  { id: "4", label: "Vegan", category: "Cuisine" },
  { id: "5", label: "Fine Dining", category: "Specialty" },
  { id: "6", label: "Asian Cuisine", category: "Cuisine" },
  { id: "7", label: "Instagram", category: "Platform" },
  { id: "8", label: "TikTok", category: "Platform" },
  { id: "9", label: "YouTube", category: "Platform" },
];

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const filteredTags = searchTerm
    ? predefinedTags.filter(
        (tag) =>
          tag.label.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !selectedTags.some((selected) => selected.id === tag.id)
      )
    : [];

  const handleSelect = useCallback((tagId: string) => {
    const tag = predefinedTags.find((t) => t.id === tagId);
    if (tag && !selectedTags.some((selected) => selected.id === tag.id)) {
      setSelectedTags((prev) => [...prev, tag]);
    }
    setSearchTerm("");
    setIsOpen(false);
  }, [selectedTags]);

  const removeTag = useCallback((tagId: string) => {
    setSelectedTags((prev) => prev.filter((tag) => tag.id !== tagId));
  }, []);

  const clearAll = useCallback(() => {
    setSearchTerm("");
    setSelectedTags([]);
    setIsOpen(false);
  }, []);

  const handleSearch = useCallback(() => {
    console.log("Searching with:", {
      searchTerm,
      selectedTags: selectedTags.map((tag) => tag.label),
    });
  }, [searchTerm, selectedTags]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="relative">
        <Command className="rounded-lg border shadow-md">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              placeholder="Search food influencers..."
              value={searchTerm}
              onValueChange={(value) => {
                setSearchTerm(value);
                setIsOpen(true);
              }}
              className="flex-1 h-11 bg-transparent outline-none placeholder:text-muted-foreground"
            />
            {(searchTerm || selectedTags.length > 0) && (
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
          {isOpen && searchTerm && (
            <CommandList>
              {filteredTags.length > 0 ? (
                <CommandGroup heading="Suggestions">
                  {filteredTags.map((tag) => (
                    <CommandItem
                      key={tag.id}
                      value={tag.id}
                      onSelect={handleSelect}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <span className="text-sm text-muted-foreground">
                        {tag.category}:
                      </span>
                      {tag.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : (
                <CommandEmpty>No results found.</CommandEmpty>
              )}
            </CommandList>
          )}
        </Command>
      </div>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <Badge
              key={tag.id}
              variant="secondary"
              className="flex items-center gap-1"
            >
              <span className="text-xs text-muted-foreground">
                {tag.category}:
              </span>
              {tag.label}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => removeTag(tag.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      <Button 
        className="w-full" 
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
};