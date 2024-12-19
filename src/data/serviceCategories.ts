export type ServiceCategory = {
  name: string;
  subcategories: string[];
  icon?: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    name: "Branding & Visual Identity",
    subcategories: [
      "Logo Design",
      "Brand Guidelines",
      "Color Palette",
      "Typography",
      "Tagline/Slogan Design"
    ]
  },
  {
    name: "Interior Design",
    subcategories: [
      "Space Layout and Floor Plan",
      "Lighting Design",
      "Furniture Selection",
      "Wall Art & Decor",
      "Signage & Wayfinding"
    ]
  },
  {
    name: "Graphic Design",
    subcategories: [
      "Menu Design",
      "Promotional Materials",
      "Gift Cards & Loyalty Cards",
      "Packaging Design",
      "Table Tents & Specials Signage"
    ]
  },
  {
    name: "Digital & Web Design",
    subcategories: [
      "Website Design",
      "Social Media Graphics",
      "Email Marketing Templates",
      "Online Ordering System Design",
      "Blog Design"
    ]
  },
  {
    name: "Photography & Videography",
    subcategories: [
      "Food Photography",
      "Interior/Exterior Photography",
      "Video Content",
      "Event Coverage"
    ]
  }
];