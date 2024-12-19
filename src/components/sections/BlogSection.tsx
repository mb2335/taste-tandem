import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, ArrowRight, AlertCircle, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const BlogSection = () => {
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ['featured-blogs'],
    queryFn: async () => {
      console.log('Starting blog posts fetch...');
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .limit(3)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching blogs:', error);
        throw error;
      }
      
      console.log('Raw response from Supabase:', { data, error });
      return data || [];
    },
  });

  if (error) {
    console.error('Error in BlogSection:', error);
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
          <p className="text-red-500">Failed to load blog posts. Please try again later.</p>
          <pre className="mt-2 text-sm text-red-400">{error.message}</pre>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <LoaderCircle className="h-10 w-10 text-primary mx-auto mb-4 animate-spin" />
          <p className="text-gray-500">Loading blog posts...</p>
        </div>
      </section>
    );
  }

  console.log('Rendering BlogSection with blogs:', blogs);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <BookOpen className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4">Featured Articles</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends and insights in food content creation
          </p>
        </div>

        {blogs && blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {blogs.map((blog) => (
              <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="p-0">
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      console.error('Image failed to load:', blog.image_url);
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327';
                    }}
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-xl mb-2 line-clamp-2">{blog.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
                  <Link to={`/blog/${blog.id}`}>
                    <Button variant="outline" className="w-full group">
                      Read More 
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center mb-12">
            <AlertCircle className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
            <p className="text-gray-500">No blog posts available at the moment.</p>
          </div>
        )}

        <div className="text-center">
          <Link to="/blog">
            <Button size="lg" className="group">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};