import { Card, CardContent } from "@/components/ui/card";
import { Camera, Video, Instagram, Calendar } from "lucide-react";

const categories = [
  {
    icon: Camera,
    title: "Photography",
    description: "Professional food photography services",
  },
  {
    icon: Video,
    title: "Video Content",
    description: "Engaging food video creation",
  },
  {
    icon: Instagram,
    title: "Social Media",
    description: "Platform-specific content strategy",
  },
  {
    icon: Calendar,
    title: "Event Coverage",
    description: "Live event and launch coverage",
  },
];

export const CategorySection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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