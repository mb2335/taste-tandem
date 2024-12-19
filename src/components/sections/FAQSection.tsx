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

        <Accordion type="single" collapsible className="w-full">
          {faqs?.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border-b border-gray-200">
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
    </section>
  );
};