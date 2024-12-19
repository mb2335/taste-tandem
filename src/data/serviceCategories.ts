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
    name: "Social Media & Marketing",
    subcategories: [
      "Platform Management",
      "Content Strategy",
      "Paid Advertising",
      "Influencer Marketing",
      "Email Marketing",
      "Local SEO",
      "Brand Storytelling",
      "Campaign Management"
    ]
  },
  {
    name: "Graphic Design",
    subcategories: [
      "Menu Design",
      "Logo Design",
      "Poster Design",
      "Brand Identity",
      "Packaging Design",
      "Print Materials",
      "Digital Assets",
      "Promotional Graphics"
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
  },
  {
    name: "Loyalty Programs",
    subcategories: [
      "Rewards Program Design",
      "Customer Retention",
      "Points System",
      "Member Benefits",
      "Program Analytics",
      "Digital Loyalty Cards"
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