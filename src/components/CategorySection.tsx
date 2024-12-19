import { Card, CardContent } from "@/components/ui/card";
import { Share2, Palette, Badge, Camera, Video, Calendar, Star } from "lucide-react";

const categories = [
  {
    icon: Camera,
    title: "Content Creation",
    description: "Professional food photography and video content",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description: "Platform management and content strategy",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Menus, logos, posters, and brand materials",
  },
  {
    icon: Calendar,
    title: "Marketing and Events",
    description: "Strategic marketing and event coverage",
  },
  {
    icon: Star,
    title: "Review Management",
    description: "Online reputation management",
  },
  {
    icon: Badge,
    title: "Loyalty Programs",
    description: "Customer retention and rewards",
  },
];

export const CategorySection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-4">Additional Services</h2>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Connect with professional content creators who understand the restaurant industry
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {categories.map((category) => (
          <Card key={category.title} className="card-hover cursor-pointer">
            <CardContent className="flex flex-col items-center text-center p-6">
              <category.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
              <p className="text-muted-foreground">{category.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};