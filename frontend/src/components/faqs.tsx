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
    <div id="faqs">
      <section>
        <h2 className="text-center text-4xl font-bold mb-8">Questions ?</h2>
        <Accordion className="mx-4 sm:mx-80 " type="single" collapsible>
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.question}
              value={faq.question}
              className="data-[state=closed]:rounded-[2.5rem] data-[state=open]:rounded-[2.5rem] data-[state=open]:bg-gradient-to-br data-[state=open]:from-teal-400 data-[state=open]:to-teal-600 data-[state=open]:text-white transition-transform duration-200 px-6 py-2 bg-gray-100 mb-2"
            >
              <AccordionTrigger className="text-lg font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="data-[state=open]:text-white">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
