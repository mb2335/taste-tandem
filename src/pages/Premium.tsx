import { Header } from "@/components/Header";
import { Crown, Star, Zap, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Premium = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary/5">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Unlock Your Full Potential with Premium
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get exclusive access to premium features and take your food content creation journey to the next level
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Basic",
                price: "Free",
                features: [
                  "Basic profile listing",
                  "Up to 5 connections per month",
                  "Standard support",
                  "Basic analytics"
                ],
                icon: Star
              },
              {
                title: "Premium",
                price: "$29/mo",
                features: [
                  "Featured profile listing",
                  "Unlimited connections",
                  "Priority support",
                  "Advanced analytics",
                  "Custom branding",
                  "Verified badge"
                ],
                icon: Crown,
                highlighted: true
              },
              {
                title: "Enterprise",
                price: "Custom",
                features: [
                  "All Premium features",
                  "Dedicated account manager",
                  "Custom integration",
                  "Team collaboration",
                  "API access"
                ],
                icon: Zap
              }
            ].map((plan) => (
              <Card 
                key={plan.title}
                className={`relative ${
                  plan.highlighted 
                    ? "scale-105 shadow-xl border-primary" 
                    : "bg-white"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <plan.icon className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-2xl text-center">{plan.title}</CardTitle>
                  <div className="text-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-gray-600">/month</span>}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Trophy className="h-5 w-5 text-primary mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6">
                    {plan.price === "Free" ? "Get Started" : "Subscribe Now"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Premium;