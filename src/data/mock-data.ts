type Answer = {
  tip: string; bullets: string[]
}
type Faqs = {
  question: string;
  answer: Answer | string;
}[];


export const faqs: Faqs = [
  {
    question: "How do I submit a maintenance request for an issue in my room?",
    answer: {
      tip: "You must create a new Request by navigating to the Customer Support section.",
      bullets: [
        "1. In the Subject field, briefly summarize the issue.",
        "2. Use the Description field to provide full details (e.g., water leakage in the bathroom, light bulb replacement).",
        "3. Set the Priority as appropriate (High, Medium, or Low).",
      ],
    },
  },
  {
    question: "How do I report a utility outage?",
    answer: `Call our emergency line at +1 (555) 911-2345 available 24/7. 
  For non-emergency issues, submit a request above.`,
  },
  {
    question: "When are utility bills due?",
    answer: `All utility bills are due on the 5th of each month. 
  Late payments may incur additional fees.`,
  },
  {
    question: "How can I view my monthly invoice?",
    answer: `You can view all your monthly invoices under the Billing menu in the Invoice section. 
  Here, you will find the Invoice ID, issue date, and the payment status (Paid, Pending, or Overdue).`,
  },
];
