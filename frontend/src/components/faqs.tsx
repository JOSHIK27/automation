import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faqs() {
  return (
    <section>
      <h2 className="text-center text-4xl font-bold mb-8">Questions ?</h2>
      <Accordion className="mx-4 sm:mx-60" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-semibold">
            Question 1
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Answer 1
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-semibold">
            Question 2
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Answer 2
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg font-semibold">
            Question 3
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Answer 3
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
