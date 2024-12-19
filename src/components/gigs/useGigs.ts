import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Gig {
  id?: string;
  name: string;
  title: string;
  description: string;
  price: string;
  deliveryTime: string;
  rating: number;
  engagement: string;
  followers: string;
  image: string;
  tags: string[];
  platforms: string[];
  contentType: string;
  portfolio: string[];
}

export const useGigs = (initialGigs: Gig[]) => {
  const [currentSort, setCurrentSort] = useState("price-asc");
  const [filteredGigs, setFilteredGigs] = useState(initialGigs);

  const handleFilterChange = async (filters: any) => {
    let filtered = [...initialGigs];

    if (filters.demographics?.ageGroups?.length > 0) {
      const { data } = await supabase
        .from('profile_tags')
        .select('profile_id')
        .eq('tag_category', 'demographics')
        .in('tag_name', filters.demographics.ageGroups);

      if (data) {
        const profileIds = data.map(tag => tag.profile_id);
        filtered = filtered.filter(gig => gig.id && profileIds.includes(gig.id));
      }
    }

    if (filters.contentStyle?.platforms?.length > 0) {
      const { data } = await supabase
        .from('profile_tags')
        .select('profile_id')
        .eq('tag_category', 'platform')
        .in('tag_name', filters.contentStyle.platforms);

      if (data) {
        const profileIds = data.map(tag => tag.profile_id);
        filtered = filtered.filter(gig => gig.id && profileIds.includes(gig.id));
      }
    }

    setFilteredGigs(filtered);
  };

  const handleSortChange = (value: string) => {
    setCurrentSort(value);
    const sorted = [...filteredGigs].sort((a, b) => {
      switch (value) {
        case "price-asc":
          return parseInt(a.price.slice(1)) - parseInt(b.price.slice(1));
        case "price-desc":
          return parseInt(b.price.slice(1)) - parseInt(a.price.slice(1));
        case "rating":
          return b.rating - a.rating;
        case "followers":
          return parseInt(b.followers) - parseInt(a.followers);
        case "engagement":
          return parseFloat(b.engagement) - parseFloat(a.engagement);
        case "reach":
          return parseInt(b.followers) * (parseFloat(b.engagement)/100) - 
                 parseInt(a.followers) * (parseFloat(a.engagement)/100);
        default:
          return 0;
      }
    });
    setFilteredGigs(sorted);
  };

  return {
    currentSort,
    filteredGigs,
    handleFilterChange,
    handleSortChange,
  };
};