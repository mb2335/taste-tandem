import { Command } from "@/components/ui/command";
import { Suggestion } from "@/types/search";

interface SuggestionListProps {
  suggestions: Suggestion[];
  onSelect: (value: string) => void;
}

export const SuggestionList = ({ suggestions, onSelect }: SuggestionListProps) => {
  if (!suggestions?.length) return null;

  const groupedSuggestions = suggestions.reduce((acc: Record<string, Suggestion[]>, suggestion) => {
    if (!acc[suggestion.category]) {
      acc[suggestion.category] = [];
    }
    acc[suggestion.category].push(suggestion);
    return acc;
  }, {});

  return (
    <Command.List>
      {Object.entries(groupedSuggestions).map(([category, items]) => (
        <Command.Group key={category} heading={category}>
          {items.map((suggestion) => (
            <Command.Item
              key={suggestion.label}
              value={suggestion.label}
              onSelect={onSelect}
              className="flex items-center gap-2 cursor-pointer"
            >
              {typeof suggestion.icon === "string" ? (
                <span>{suggestion.icon}</span>
              ) : (
                suggestion.icon
              )}
              {suggestion.label}
            </Command.Item>
          ))}
        </Command.Group>
      ))}
    </Command.List>
  );
};