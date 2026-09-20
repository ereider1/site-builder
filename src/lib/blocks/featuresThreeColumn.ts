import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createFeaturesThreeColumnBlock = (): Section => {
  const containerId = generateId("comp-container");
  const headerId = generateId("comp-container");
  const eyebrowId = generateId("comp-text");
  const headingId = generateId("comp-heading");
  const descId = generateId("comp-text");
  
  const gridId = generateId("comp-container");

  // Col 1
  const col1Id = generateId("comp-container");
  const c1NumId = generateId("comp-text");
  const c1TitleId = generateId("comp-heading");
  const c1DescId = generateId("comp-text");

  // Col 2
  const col2Id = generateId("comp-container");
  const c2NumId = generateId("comp-text");
  const c2TitleId = generateId("comp-heading");
  const c2DescId = generateId("comp-text");

  // Col 3
  const col3Id = generateId("comp-container");
  const c3NumId = generateId("comp-text");
  const c3TitleId = generateId("comp-heading");
  const c3DescId = generateId("comp-text");

  return {
    id: generateId("sec-features-3col"),
    name: "Features — Three Column",
    type: "Features",
    blockId: "features-three-column",
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
            styles: { textAlign: "center", maxWidth: "800px", margin: "0 auto" },
            children: [
              {
                id: eyebrowId,
                type: "Text",
                props: { text: "OUR APPROACH" },
                styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.15em", textTransform: "uppercase", textAlign: "center" },
              },
              {
                id: headingId,
                type: "Heading",
                props: { text: "Built with strategic clarity.", level: "h2" },
                styles: { fontSize: "2.5rem", fontWeight: "500", color: "var(--text-color)", letterSpacing: "-0.01em", textAlign: "center" },
              },
              {
                id: descId,
                type: "Text",
                props: { text: "We help ambitious companies clarify their direction, strengthen their digital presence, and build systems that scale." },
                styles: { fontSize: "1.125rem", color: "var(--muted-color)", lineHeight: "1.6", textAlign: "center" },
              },
            ],
          },

          // Grid
          {
            id: gridId,
            type: "Container",
            props: { layout: "grid-3", gap: "3rem" },
            styles: {},
            children: [
              // Column 1
              {
                id: col1Id,
                type: "Container",
                props: { layout: "flex-col", gap: "1.25rem" },
                styles: { borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" },
                children: [
                  {
                    id: c1NumId,
                    type: "Text",
                    props: { text: "01" },
                    styles: { fontSize: "0.75rem", color: "var(--muted-color)", fontWeight: "600", letterSpacing: "0.05em" },
                  },
                  {
                    id: c1TitleId,
                    type: "Heading",
                    props: { text: "Clear Strategy", level: "h3" },
                    styles: { fontSize: "1.25rem", fontWeight: "600", color: "var(--text-color)" },
                  },
                  {
                    id: c1DescId,
                    type: "Text",
                    props: { text: "Turn complex challenges into a focused plan with clear priorities." },
                    styles: { fontSize: "1rem", color: "var(--muted-color)", lineHeight: "1.6" },
                  },
                ],
              },
              // Column 2
              {
                id: col2Id,
                type: "Container",
                props: { layout: "flex-col", gap: "1.25rem" },
                styles: { borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" },
                children: [
                  {
                    id: c2NumId,
                    type: "Text",
                    props: { text: "02" },
                    styles: { fontSize: "0.75rem", color: "var(--muted-color)", fontWeight: "600", letterSpacing: "0.05em" },
                  },
                  {
                    id: c2TitleId,
                    type: "Heading",
                    props: { text: "Thoughtful Design", level: "h3" },
                    styles: { fontSize: "1.25rem", fontWeight: "600", color: "var(--text-color)" },
                  },
                  {
                    id: c2DescId,
                    type: "Text",
                    props: { text: "Create experiences that feel simple, useful, and unmistakably yours." },
                    styles: { fontSize: "1rem", color: "var(--muted-color)", lineHeight: "1.6" },
                  },
                ],
              },
              // Column 3
              {
                id: col3Id,
                type: "Container",
                props: { layout: "flex-col", gap: "1.25rem" },
                styles: { borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" },
                children: [
                  {
                    id: c3NumId,
                    type: "Text",
                    props: { text: "03" },
                    styles: { fontSize: "0.75rem", color: "var(--muted-color)", fontWeight: "600", letterSpacing: "0.05em" },
                  },
                  {
                    id: c3TitleId,
                    type: "Heading",
                    props: { text: "Built to Scale", level: "h3" },
                    styles: { fontSize: "1.25rem", fontWeight: "600", color: "var(--text-color)" },
                  },
                  {
                    id: c3DescId,
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
