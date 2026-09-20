import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createFeaturesStatementBlock = (): Section => {
  const containerId = generateId("comp-container");
  
  const colLeftId = generateId("comp-container");
  const eyebrowId = generateId("comp-text");
  const headingId = generateId("comp-heading");
  
  const colRightId = generateId("comp-container");

  // Feature 1
  const f1Id = generateId("comp-container");
  const f1TitleId = generateId("comp-heading");
  const f1DescId = generateId("comp-text");

  // Feature 2
  const f2Id = generateId("comp-container");
  const f2TitleId = generateId("comp-heading");
  const f2DescId = generateId("comp-text");

  // Feature 3
  const f3Id = generateId("comp-container");
  const f3TitleId = generateId("comp-heading");
  const f3DescId = generateId("comp-text");

  return {
    id: generateId("sec-features-statement"),
    name: "Features — Statement + Features",
    type: "Features",
    blockId: "features-statement",
    styles: {
      background: "var(--background-color)",
      paddingTop: "8rem",
      paddingBottom: "8rem",
    },
    components: [
      {
        id: containerId,
        type: "Container",
        props: { layout: "grid-2", gap: "6rem", align: "items-start" },
        styles: { maxWidth: "1280px" },
        children: [
          // Column Left: Oversized Statement
          {
            id: colLeftId,
            type: "Container",
            props: { layout: "flex-col", gap: "1.5rem" },
            styles: {},
            children: [
              {
                id: eyebrowId,
                type: "Text",
                props: { text: "DELIVERY" },
                styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.15em", textTransform: "uppercase" },
              },
              {
                id: headingId,
                type: "Heading",
                props: { text: "Everything you need to move forward.", level: "h2" },
                styles: { fontSize: "3rem", fontWeight: "500", color: "var(--text-color)", letterSpacing: "-0.02em", lineHeight: "1.2" },
              },
            ],
          },

          // Column Right: Stacked Features
          {
            id: colRightId,
            type: "Container",
            props: { layout: "flex-col", gap: "3rem" },
            styles: {},
            children: [
              // Feature 1
              {
                id: f1Id,
                type: "Container",
                props: { layout: "flex-col", gap: "0.5rem" },
                styles: {},
                children: [
                  {
                    id: f1TitleId,
                    type: "Heading",
                    props: { text: "01 / Clear Strategy", level: "h3" },
                    styles: { fontSize: "1.25rem", fontWeight: "600", color: "var(--text-color)", letterSpacing: "0.02em" },
                  },
                  {
                    id: f1DescId,
                    type: "Text",
                    props: { text: "Turn complex challenges into a focused plan with clear priorities." },
                    styles: { fontSize: "1rem", color: "var(--muted-color)", lineHeight: "1.6" },
                  },
                ],
              },
              // Feature 2
              {
                id: f2Id,
                type: "Container",
                props: { layout: "flex-col", gap: "0.5rem" },
                styles: {},
                children: [
                  {
                    id: f2TitleId,
                    type: "Heading",
                    props: { text: "02 / Thoughtful Design", level: "h3" },
                    styles: { fontSize: "1.25rem", fontWeight: "600", color: "var(--text-color)", letterSpacing: "0.02em" },
                  },
                  {
                    id: f2DescId,
                    type: "Text",
                    props: { text: "Create experiences that feel simple, useful, and unmistakably yours." },
                    styles: { fontSize: "1rem", color: "var(--muted-color)", lineHeight: "1.6" },
                  },
                ],
              },
              // Feature 3
              {
                id: f3Id,
                type: "Container",
                props: { layout: "flex-col", gap: "0.5rem" },
                styles: {},
                children: [
                  {
                    id: f3TitleId,
                    type: "Heading",
                    props: { text: "03 / Built to Scale", level: "h3" },
                    styles: { fontSize: "1.25rem", fontWeight: "600", color: "var(--text-color)", letterSpacing: "0.02em" },
                  },
                  {
                    id: f3DescId,
                    type: "Text",
                    props: { text: "Create flexible systems that can grow alongside the business." },
                    styles: { fontSize: "1rem", color: "var(--muted-color)", lineHeight: "1.6" },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
};
