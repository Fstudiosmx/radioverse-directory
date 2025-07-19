
import { PageHeader } from "@/components/page-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";

const faqs = [
  {
    question: "How do I connect my Firebase project?",
    answer: "We have created a detailed guide to help you. Click here to see the <a href='/docs/firebase-setup' class='font-semibold underline'>step-by-step instructions</a> for setting up Firebase in your application."
  },
  {
    question: "How do I add my radio station?",
    answer: "To add your radio station, you need to navigate to the 'Add Station' page from the sidebar. Once there, fill out the form with your station's details, including the name, stream URL, software, and protocol. Our team will review it and, if approved, it will appear in the directory."
  },
  {
    question: "What is the difference between Shoutcast and Icecast?",
    answer: "Shoutcast and Icecast are both popular streaming media protocols. Icecast is fully open-source and supports more mount points, while Shoutcast (developed by Nullsoft) has been around longer and is known for its simplicity. Our platform supports both seamlessly."
  },
  {
    question: "How do the embeddable widgets work?",
    answer: "Our widgets are simple HTML iframes that you can copy and paste into your website's HTML. You can find them on the 'Widgets' page. They are responsive and will automatically update with the latest stream information."
  },
  {
    question: "What benefits do I get with a subscription?",
    answer: "Subscriptions unlock various benefits, such as the ability to add your stations, access to more advanced widgets, higher visibility in the directory, and a verified badge to show your support for the community. Visit the 'Pricing' page for more details."
  },
   {
    question: "How does the AI moderation work?",
    answer: "We use an AI-powered system to ensure a safe community. Our system issues warnings for rule violations, which can lead to temporary suspensions or account deletion for repeated offenses. You can read the full details in our <a href='/docs/moderation-policy' class='font-semibold underline'>AI Moderation Policy</a>."
  },
  {
    question: "How do I contact support?",
    answer: "You can visit the 'Support' page to send a message directly to our team. We're working on a live chat feature, but for now, you can submit a ticket and we will get back to you via email."
  }
];


export default function DocsPage() {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="Frequently Asked Questions"
        description="Find answers to common questions and learn how to use RadioVerse."
      />
      <div className="max-w-4xl mx-auto pt-6">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="font-headline text-lg">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-base" dangerouslySetInnerHTML={{ __html: faq.answer }} />
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
