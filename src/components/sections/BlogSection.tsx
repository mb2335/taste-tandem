import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const BlogSection = () => {
  const { data: blogs } = useQuery({
    queryKey: ['featured-blogs'],
    queryFn: async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .limit(3);
      return data || [];
    },
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Latest from Our Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs?.map((blog) => (
            <Card key={blog.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <img
                  src={blog.image_url}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-xl mb-2">{blog.title}</h3>
                <p className="text-muted-foreground line-clamp-3">{blog.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};