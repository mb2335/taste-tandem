import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, TrendingUp, DollarSign, Users, Star, Award } from "lucide-react";

const Influencer = () => {
  const benefits = [
    {
      icon: Camera,
      title: "Showcase Your Content",
      description: "Build a professional portfolio to showcase your best food content and photography"
    },
    {
      icon: TrendingUp,
      title: "Grow Your Audience",
      description: "Connect with restaurants and brands to expand your reach and influence"
    },
    {
      icon: DollarSign,
      title: "Monetize Your Passion",
      description: "Turn your food content creation into a sustainable income stream"
    }
  ];

  const testimonials = [
    {
      name: "Jessica Lee",
      role: "Food Photographer",
      content: "Joining this platform was a game-changer for my career. I've connected with amazing restaurants and doubled my income!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Food Blogger",
      content: "The quality of partnerships and the professional tools provided have helped me grow my following significantly.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Turn Your Food Content Into A Career
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join our community of food influencers and connect with top restaurants and brands
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Creating Today
            </Button>
          </div>

          {/* Benefits Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <benefit.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-12 mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Active Creators", value: "1,000+" },
                { label: "Restaurant Partners", value: "500+" },
                { label: "Average Earnings", value: "$2,500/mo" },
                { label: "Success Rate", value: "98%" }
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              What Our Creators Say
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">{testimonial.content}</p>
                    <div className="flex items-center">
                      <Award className="h-10 w-10 text-primary mr-3" />
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join our community of food content creators today
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Create Your Profile
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Influencer;