import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookOpen, Calendar, User, ArrowLeft, LoaderCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Blog = () => {
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ['all-blogs'],
    queryFn: async () => {
      console.log('Fetching all blog posts...');
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*, profiles:author_id(username)')
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
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-24">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Blog Posts</h1>
            <p className="text-gray-600 mb-8">We encountered an error while loading the blog posts. Please try again later.</p>
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Return Home
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-24">
          <div className="text-center">
            <LoaderCircle className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading Blog Posts</h1>
            <p className="text-gray-600">Please wait while we fetch the latest articles...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Our Latest Articles
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover the latest trends and insights in food content creation
              </p>
            </div>

            {blogs && blogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {blogs.map((blog: any) => (
                  <Card key={blog.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 card-hover bg-white">
                    <CardHeader className="p-0">
                      <div className="relative">
                        <img
                          src={blog.image_url}
                          alt={blog.title}
                          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327';
                          }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                          <div className="flex items-center text-white text-sm">
                            <Calendar className="h-4 w-4 mr-1" />
                            {format(new Date(blog.created_at), 'MMM dd, yyyy')}
                            <span className="mx-2">•</span>
                            <User className="h-4 w-4 mr-1" />
                            {blog.profiles?.username || 'Anonymous'}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-xl mb-3 line-clamp-2 text-gray-800 group-hover:text-primary transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>
                      <Link to={`/blog/${blog.id}`}>
                        <Button 
                          variant="outline" 
                          className="w-full group hover:bg-primary hover:text-white transition-all duration-300"
                        >
                          Read More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center mb-12 bg-white p-8 rounded-lg shadow-md">
                <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No blog posts available at the moment.</p>
                <p className="text-gray-400 mt-2">Check back soon for new content!</p>
              </div>
            )}

            <div className="text-center">
              <Link to="/">
                <Button 
                  variant="outline"
                  size="lg" 
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;