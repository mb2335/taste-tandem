import { Card, CardContent } from "@/components/ui/card";
import { Camera, Video, Instagram, Calendar, Star, MessageSquare, Megaphone } from "lucide-react";

const categories = [
  {
    icon: Camera,
    title: "Content Creation",
    description: "Professional food photography and video content",
  },
  {
    icon: Instagram,
    title: "Social Media",
    description: "Platform management and content strategy",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    description: "Strategic marketing and brand growth",
  },
  {
    icon: Calendar,
    title: "Event Coverage",
    description: "Professional event documentation",
  },
  {
    icon: Star,
    title: "Review Management",
    description: "Online reputation management",
  },
  {
    icon: MessageSquare,
    title: "Community",
    description: "Engage with your audience",
  },
];

export const CategorySection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-4">Our Services</h2>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Connect with professional content creators who understand the restaurant industry
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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