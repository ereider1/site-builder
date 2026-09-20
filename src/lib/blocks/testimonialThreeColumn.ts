import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createTestimonialThreeColumnBlock = (): Section => {
  const containerId = generateId("comp-container");
  const headerId = generateId("comp-container");
  const eyebrowId = generateId("comp-text");
  const headingId = generateId("comp-heading");
  
  const gridId = generateId("comp-container");

  const testimonials = [
    { quote: "“Northstar helped us turn a complicated business challenge into a clear and actionable plan.”", author: "Maya Chen", role: "Founder, Harbor" },
    { quote: "“They brought clarity to a project that had become increasingly difficult to navigate.”", author: "Daniel Lee", role: "CEO, Summit" },
    { quote: "“The process was thoughtful, focused, and remarkably practical. Exceptionally design oriented.”", author: "Sarah Morgan", role: "Managing Director" }
  ];

  return {
    id: generateId("sec-testimonial-3col"),
    name: "Testimonial — Three Column",
    type: "Testimonial",
    blockId: "testimonial-three-column",
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
                props: { text: "Collaborator Perspectives", level: "h2" },
                styles: { fontSize: "2.5rem", fontWeight: "500", color: "var(--text-color)", letterSpacing: "-0.01em" },
              },
            ],
          },

          // Grid of 3 items
          {
            id: gridId,
            type: "Container",
            props: { layout: "grid-3", gap: "2.5rem" },
            styles: {},
            children: testimonials.map((t) => {
              const cardId = generateId("comp-container");
              const quoteId = generateId("comp-text");
              const detailId = generateId("comp-container");
              const nameId = generateId("comp-heading");
              const roleId = generateId("comp-text");
              
              return {
                id: cardId,
                type: "Container",
                props: { layout: "flex-col", gap: "1.5rem" },
                styles: { borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" },
                children: [
                  {
                    id: quoteId,
                    type: "Text",
                    props: { text: t.quote },
                    styles: { fontSize: "1.05rem", fontStyle: "italic", color: "var(--muted-color)", lineHeight: "1.6" },
                  },
                  {
                    id: detailId,
                    type: "Container",
                    props: { layout: "flex-col", gap: "0.25rem" },
                    styles: {},
                    children: [
                      {
                        id: nameId,
                        type: "Heading",
                        props: { text: t.author, level: "h4" },
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
