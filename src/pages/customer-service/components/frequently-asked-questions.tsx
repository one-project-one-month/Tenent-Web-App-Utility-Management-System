import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/mock-data";

const FrequentlyAskedQuestions = () => {
  return (
    <div>
      {faqs.map((faq, index) => (
        <Accordion
          type="single"
          collapsible
          key={index}
          className="border border-gray-300 rounded-sm px-3 bg-card mb-3 shadow-sm"
        >
          <AccordionItem value={faq.question}>
            <AccordionTrigger className="text-lg">{faq.question}</AccordionTrigger>
            <AccordionContent className="border-t border-gray-300">
              {typeof faq.answer === "string" ? (
                faq.answer
              ) : (
                <div>
                  <p className="mb-3">{faq.answer.tip}</p>
                  <ul className="list-inside space-y-3">
                    {faq.answer.bullets.map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default FrequentlyAskedQuestions;
