import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createTestimonialTwoColumnBlock = (): Section => {
  const containerId = generateId("comp-container");
  const headerId = generateId("comp-container");
  const eyebrowId = generateId("comp-text");
  const headingId = generateId("comp-heading");
  
  const gridId = generateId("comp-container");

  const testimonials = [
    { quote: "“Northstar helped us turn a complicated business challenge into a clear and actionable plan. Our metrics surged, but the strategic growth was the real win.”", author: "Maya Chen", role: "Founder, Harbor" },
    { quote: "“They brought clarity to a project that had become increasingly difficult to navigate. The engineering execution and alignment are flawless.”", author: "Daniel Lee", role: "CEO, Summit" }
  ];

  return {
    id: generateId("sec-testimonial-2col"),
    name: "Testimonial — Two Column",
    type: "Testimonial",
    blockId: "testimonial-two-column",
    styles: {
      background: "var(--background-color)",
      paddingTop: "8rem",
      paddingBottom: "8rem",
    },
    components: [
      {
        id: containerId,
        type: "Container",
        props: { layout: "flex-col", gap: "4rem" },
        styles: { maxWidth: "1280px" },
        children: [
          // Header
          {
            id: headerId,
            type: "Container",
            props: { layout: "flex-col", gap: "1rem" },
            styles: {},
            children: [
              {
                id: eyebrowId,
                type: "Text",
                props: { text: "TESTIMONIALS" },
                styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.15em", textTransform: "uppercase" },
              },
              {
                id: headingId,
                type: "Heading",
                props: { text: "Client Voices", level: "h2" },
                styles: { fontSize: "2.5rem", fontWeight: "500", color: "var(--text-color)", letterSpacing: "-0.01em" },
              },
            ],
          },

          // Grid of 2 items
          {
            id: gridId,
            type: "Container",
            props: { layout: "grid-2", gap: "3rem" },
            styles: {},
            children: testimonials.map((t) => {
              const cardId = generateId("comp-card");
              const quoteId = generateId("comp-heading");
              const nameId = generateId("comp-text");
              const roleId = generateId("comp-text");
              
              return {
                id: cardId,
                type: "Card",
                props: { padding: "2.5rem", bg: "var(--surface-color)" },
                styles: { borderRadius: "var(--border-radius)", border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", gap: "1.5rem" },
                children: [
                  {
                    id: quoteId,
                    type: "Heading",
                    props: { text: t.quote, level: "h3" },
                    styles: { fontSize: "1.2rem", fontWeight: "400", color: "var(--text-color)", fontStyle: "italic", lineHeight: "1.6" },
                  },
                  {
                    id: generateId("comp-container"),
                    type: "Container",
                    props: { layout: "flex-col", gap: "0.25rem" },
                    styles: {},
                    children: [
                      {
                        id: nameId,
                        type: "Text",
                        props: { text: t.author },
                        styles: { fontSize: "0.95rem", fontWeight: "600", color: "var(--text-color)" },
                      },
                      {
                        id: roleId,
                        type: "Text",
                        props: { text: t.role },
                        styles: { fontSize: "0.85rem", color: "var(--muted-color)" },
                      },
                    ],
                  },
                ],
              };
            }) as any
          },
        ],
      },
    ],
  };
};
