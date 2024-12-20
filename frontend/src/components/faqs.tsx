import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const faqs = [
  {
    question: "What kind of workflows can I create?",
    answer:
      "You can create workflows that combine various AI actions like face swapping, caption generation, thumbnail creation, and content summarization. These can be triggered automatically or manually based on your needs.",
  },
  {
    question: "How does the face swapping feature work?",
    answer:
      "Simply provide a source image URL containing the face you want to use, and a target image URL where you want to apply the face. Our AI will handle the rest, ensuring natural-looking results.",
  },
  {
    question: "Can I customize the AI-generated content?",
    answer:
      "Yes! Each AI action comes with customizable parameters. You can adjust settings for caption style, thumbnail composition, summary length, and more.",
  },
  {
    question: "Is coding knowledge required?",
    answer:
      "Not at all! Our visual workflow builder lets you create complex automations through an intuitive drag-and-drop interface. No coding required.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "We support common image formats (JPG, PNG) for face swapping and thumbnail generation, and popular video formats for caption generation.",
  },
];

export default function Faqs() {
  return (
    <section>
      <h2 className="text-center text-4xl font-bold mb-8">Questions ?</h2>
      <Accordion
        className="mx-4 sm:mx-80 bg-gray-100 p-8 rounded-lg border-gray-200 border-[1px]"
        type="single"
        collapsible
      >
        {faqs.map((faq) => (
          <AccordionItem value={faq.question}>
            <AccordionTrigger className="text-lg font-semibold">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
