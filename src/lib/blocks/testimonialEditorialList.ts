import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createTestimonialEditorialListBlock = (): Section => {
  const containerId = generateId("comp-container");
  const headerId = generateId("comp-container");
  const eyebrowId = generateId("comp-text");
  const headingId = generateId("comp-heading");
  
  const listContainerId = generateId("comp-container");

  const feedback = [
    { quote: "“The process was thoughtful, focused, and remarkably practical. Northstar brought strategic design alignment and absolute operational intent.”", author: "Jane Morgan", role: "Creative Director, Harbor", num: "01" },
    { quote: "“They brought clarity to a project that had become increasingly difficult to navigate. The engineering results are robust and completely scalable.”", author: "Daniel Lee", role: "Strategy Director, Summit", num: "02" },
    { quote: "“Northstar helped us turn a complicated business challenge into a clear, gorgeous website plan that immediately boosted conversion metric systems.”", author: "Maya Chen", role: "Design Director, Harbor", num: "03" }
  ];

  return {
    id: generateId("sec-testimonial-list"),
    name: "Testimonial — Editorial List",
    type: "Testimonial",
    blockId: "testimonial-editorial-list",
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
                props: { text: "CLIENT STORIES" },
                styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.15em", textTransform: "uppercase" },
              },
              {
                id: headingId,
                type: "Heading",
                props: { text: "Shared Experiences", level: "h2" },
                styles: { fontSize: "2.5rem", fontWeight: "500", color: "var(--text-color)", letterSpacing: "-0.01em" },
              },
            ],
          },

          // Stacks
          {
            id: listContainerId,
            type: "Container",
            props: { layout: "flex-col", gap: "0" },
            styles: {},
            children: feedback.map((f, idx) => {
              const rowId = generateId("comp-container");
              const gridId = generateId("comp-container");
              
              const col1Id = generateId("comp-container");
              const numId = generateId("comp-text");
              const nameId = generateId("comp-heading");
              
              const quoteId = generateId("comp-text");
              const roleId = generateId("comp-text");
              
              const isLast = idx === feedback.length - 1;
              const rowStyles = isLast
                ? { borderTop: "1px solid var(--border-color)", paddingTop: "2rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border-color)" }
                : { borderTop: "1px solid var(--border-color)", paddingTop: "2rem", paddingBottom: "2rem" };

              return {
                id: rowId,
                type: "Container",
                props: { layout: "flex-col" },
                styles: rowStyles,
                children: [
                  {
                    id: gridId,
                    type: "Container",
                    props: { layout: "grid-3", gap: "2rem", align: "items-start" },
                    styles: {},
                    children: [
                      // Col 1: Number + Name
                      {
                        id: col1Id,
                        type: "Container",
                        props: { layout: "flex-col", gap: "0.5rem" },
                        styles: {},
                        children: [
                          {
                            id: numId,
                            type: "Text",
                            props: { text: f.num },
                            styles: { fontSize: "0.75rem", color: "var(--muted-color)", fontWeight: "600", letterSpacing: "0.05em" },
                          },
                          {
                            id: nameId,
                            type: "Heading",
                            props: { text: f.author, level: "h3" },
                            styles: { fontSize: "1.35rem", fontWeight: "600", color: "var(--text-color)", letterSpacing: "0.02em" },
                          },
                        ],
                      },
                      // Col 2: Quote
                      {
                        id: quoteId,
                        type: "Text",
                        props: { text: f.quote },
                        styles: { fontSize: "1.05rem", color: "var(--muted-color)", fontStyle: "italic", lineHeight: "1.6" },
                      },
                      // Col 3: Role / Company
                      {
                        id: roleId,
                        type: "Text",
                        props: { text: f.role },
                        styles: { fontSize: "0.875rem", color: "var(--muted-color)", textAlign: "right" },
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
