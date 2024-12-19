import { LucideIcon } from "lucide-react";

export type Suggestion = {
  label: string;
  icon: React.ReactNode | string;
  category: string;
};

export type GroupedSuggestions = Record<string, Suggestion[]>;