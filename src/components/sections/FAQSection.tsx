import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { HelpCircle } from "lucide-react";

export const FAQSection = () => {
  const { data: faqs, isLoading } = useQuery({
    queryKey: ['faqs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('category');
      
      if (error) throw error;
      return data || [];
    },
  });

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Group FAQs by category
  const groupedFaqs = faqs?.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, typeof faqs>);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <HelpCircle className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our platform
          </p>
        </div>

        <div className="space-y-8">
          {groupedFaqs && Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
            <div key={category} className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-primary">{category}</h3>
              <Accordion type="single" collapsible className="w-full">
                {categoryFaqs?.map((faq) => (
                  <AccordionItem 
                    key={faq.id} 
                    value={faq.id} 
                    className="border-b border-gray-200 last:border-0"
                  >
                    <AccordionTrigger className="text-left py-4 hover:no-underline">
                      <span className="font-medium text-lg">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};