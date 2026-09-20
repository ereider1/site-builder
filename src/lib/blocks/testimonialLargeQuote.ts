import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createTestimonialLargeQuoteBlock = (): Section => {
  const containerId = generateId("comp-container");
  const eyebrowId = generateId("comp-text");
  const quoteId = generateId("comp-heading");
  const authorId = generateId("comp-text");

  return {
    id: generateId("sec-testimonial-large"),
    name: "Testimonial — Large Quote",
    type: "Testimonial",
    blockId: "testimonial-large-quote",
    styles: {
      background: "var(--background-color)",
      paddingTop: "10rem", // Immense spaciousness
      paddingBottom: "10rem",
    },
    components: [
      {
        id: containerId,
        type: "Container",
        props: { layout: "flex-col", gap: "3rem" },
        styles: { maxWidth: "900px", textAlign: "center" },
        children: [
          {
            id: eyebrowId,
            type: "Text",
            props: { text: "TESTIMONIAL" },
            styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.15em", textTransform: "uppercase", textAlign: "center" },
          },
          {
            id: quoteId,
            type: "Heading",
            props: { text: "“The process was thoughtful, focused, and remarkably practical. Northstar operating speeds are exceptional.”", level: "h2" },
            styles: { fontSize: "3.5rem", fontWeight: "400", color: "var(--text-color)", letterSpacing: "-0.02em", lineHeight: "1.2", fontStyle: "italic", textAlign: "center" },
          },
          {
            id: authorId,
            type: "Text",
            props: { text: "— SARAH MORGAN, MANAGING DIRECTOR" },
            styles: { fontSize: "0.875rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.1em", textAlign: "center" },
          },
        ],
      },
    ],
  };
};
