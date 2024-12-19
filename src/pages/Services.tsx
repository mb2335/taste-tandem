import { CategorySection } from "@/components/CategorySection";
import { Header } from "@/components/Header";

const Services = () => {
  return (
    <div className="min-h-screen pt-16">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Additional Services</h1>
        <CategorySection />
      </div>
    </div>
  );
};

export default Services;