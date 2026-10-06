"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data";

/**
 * FAQ accordion, split into its own chunk by the Contact section so base-ui's
 * accordion does not sit in the initial bundle.
 */
export function FaqAccordion() {
  return (
    <Accordion
      multiple
      className="mt-4 rounded-2xl border border-border bg-card/40 px-5"
    >
      {faqs.map((faq, index) => (
        <AccordionItem key={faq.q} value={index}>
          <AccordionTrigger className="py-4 text-sm font-medium">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
            {faq.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
