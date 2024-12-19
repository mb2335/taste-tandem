import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const FAQSection = () => {
  const { data: faqs } = useQuery({
    queryKey: ['faqs'],
    queryFn: async () => {
      const { data } = await supabase
        .from('faqs')
        .select('*');
      return data || [];
    },
  });

  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs?.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};