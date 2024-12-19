export type ServiceCategory = {
  name: string;
  subcategories: string[];
  icon?: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    name: "Content Creation",
    subcategories: [
      "Food Photography",
      "Menu Photography",
      "Interior Photography",
      "Video Content",
      "Social Media Content",
      "TikTok Creation",
      "Instagram Reels",
      "YouTube Videos"
    ]
  },
  {
    name: "Social Media Management",
    subcategories: [
      "Instagram Management",
      "TikTok Management",
      "Facebook Management",
      "Content Calendar",
      "Community Engagement",
      "Influencer Outreach"
    ]
  },
  {
    name: "Marketing Strategy",
    subcategories: [
      "Social Media Strategy",
      "Content Strategy",
      "Influencer Marketing",
      "Email Marketing",
      "Local SEO",
      "Brand Storytelling"
    ]
  },
  {
    name: "Event Coverage",
    subcategories: [
      "Restaurant Opening",
      "Special Events",
      "Menu Launch",
      "Behind the Scenes",
      "Chef Interviews",
      "Food Preparation"
    ]
  },
  {
    name: "Review Management",
    subcategories: [
      "Yelp Management",
      "Google Reviews",
      "TripAdvisor",
      "Response Strategy",
      "Review Generation"
    ]
  }
];

export const contentTypes = [
  "Photography",
  "Videography",
  "Social Media Posts",
  "Blog Posts",
  "Website Content",
  "Email Newsletters",
  "Menu Descriptions",
  "Press Releases"
];

export const platforms = [
  "Instagram",
  "TikTok",
  "YouTube",
  "Facebook",
  "Twitter",
  "LinkedIn",
  "Pinterest",
  "Google Business"
];