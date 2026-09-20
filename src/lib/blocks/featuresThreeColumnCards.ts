import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createFeaturesThreeColumnCardsBlock = (): Section => {
  const containerId = generateId("comp-container");
  const headerId = generateId("comp-container");
  const eyebrowId = generateId("comp-text");
  const headingId = generateId("comp-heading");
  
  const gridId = generateId("comp-container");

  // Card 1
  const card1Id = generateId("comp-card");
  const c1NumId = generateId("comp-text");
  const c1TitleId = generateId("comp-heading");
  const c1DescId = generateId("comp-text");
  const c1BtnId = generateId("comp-btn");

  // Card 2
  const card2Id = generateId("comp-card");
  const c2NumId = generateId("comp-text");
  const c2TitleId = generateId("comp-heading");
  const c2DescId = generateId("comp-text");
  const c2BtnId = generateId("comp-btn");

  // Card 3
  const card3Id = generateId("comp-card");
  const c3NumId = generateId("comp-text");
  const c3TitleId = generateId("comp-heading");
  const c3DescId = generateId("comp-text");
  const c3BtnId = generateId("comp-btn");

  return {
    id: generateId("sec-features-cards"),
    name: "Features — Three Column Cards",
    type: "Features",
    blockId: "features-three-column-cards",
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
                props: { text: "FEATURES" },
                styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.15em", textTransform: "uppercase" },
              },
              {
                id: headingId,
                type: "Heading",
                props: { text: "Proven Foundations", level: "h2" },
                styles: { fontSize: "2.5rem", fontWeight: "500", color: "var(--text-color)", letterSpacing: "-0.01em" },
              },
            ],
          },

          // Grid
          {
            id: gridId,
            type: "Container",
            props: { layout: "grid-3", gap: "2.5rem" },
            styles: {},
            children: [
              // Card 1
              {
                id: card1Id,
                type: "Card",
                props: { padding: "2rem", bg: "var(--surface-color)" },
                styles: { borderRadius: "var(--border-radius)", border: "1px solid var(--border-color)" },
                children: [
                  {
                    id: c1NumId,
                    type: "Text",
                    props: { text: "01" },
                    styles: { fontSize: "0.75rem", color: "var(--muted-color)", fontWeight: "600", letterSpacing: "0.05em", marginBottom: "1rem" },
                  },
                  {
                    id: c1TitleId,
                    type: "Heading",
                    props: { text: "Clear Strategy", level: "h3" },
                    styles: { fontSize: "1.25rem", fontWeight: "600", color: "var(--text-color)", letterSpacing: "0.02em", marginBottom: "1rem" },
                  },
                  {
                    id: c1DescId,
                    type: "Text",
                    props: { text: "Turn complex challenges into a focused plan with clear priorities." },
                    styles: { fontSize: "1rem", color: "var(--muted-color)", lineHeight: "1.6", marginBottom: "2rem" },
                  },
                  {
                    id: c1BtnId,
                    type: "Button",
                    props: { label: "Learn More →", variant: "secondary", link: "#cta" },
                    styles: { color: "var(--text-color)", borderRadius: "var(--border-radius)", fontSize: "0.75rem", letterSpacing: "0.05em" },
                  },
                ],
              },
              // Card 2
              {
                id: card2Id,
                type: "Card",
                props: { padding: "2rem", bg: "var(--surface-color)" },
                styles: { borderRadius: "var(--border-radius)", border: "1px solid var(--border-color)" },
                children: [
                  {
                    id: c2NumId,
                    type: "Text",
                    props: { text: "02" },
                    styles: { fontSize: "0.75rem", color: "var(--muted-color)", fontWeight: "600", letterSpacing: "0.05em", marginBottom: "1rem" },
                  },
                  {
                    id: c2TitleId,
                    type: "Heading",
                    props: { text: "Thoughtful Design", level: "h3" },
                    styles: { fontSize: "1.25rem", fontWeight: "600", color: "var(--text-color)", letterSpacing: "0.02em", marginBottom: "1rem" },
                  },
                  {
                    id: c2DescId,
                    type: "Text",
                    props: { text: "Create experiences that feel simple, useful, and unmistakably yours." },
                    styles: { fontSize: "1rem", color: "var(--muted-color)", lineHeight: "1.6", marginBottom: "2rem" },
                  },
                  {
                    id: c2BtnId,
                    type: "Button",
                    props: { label: "Learn More →", variant: "secondary", link: "#cta" },
                    styles: { color: "var(--text-color)", borderRadius: "var(--border-radius)", fontSize: "0.75rem", letterSpacing: "0.05em" },
                  },
                ],
              },
              // Card 3
              {
                id: card3Id,
                type: "Card",
                props: { padding: "2rem", bg: "var(--surface-color)" },
                styles: { borderRadius: "var(--border-radius)", border: "1px solid var(--border-color)" },
                children: [
                  {
                    id: c3NumId,
                    type: "Text",
                    props: { text: "03" },
                    styles: { fontSize: "0.75rem", color: "var(--muted-color)", fontWeight: "600", letterSpacing: "0.05em", marginBottom: "1rem" },
                  },
                  {
                    id: c3TitleId,
                    type: "Heading",
                    props: { text: "Built to Scale", level: "h3" },
                    styles: { fontSize: "1.25rem", fontWeight: "600", color: "var(--text-color)", letterSpacing: "0.02em", marginBottom: "1rem" },
                  },
                  {
                    id: c3DescId,
                    type: "Text",
                    props: { text: "Create flexible systems that can grow alongside the business." },
                    styles: { fontSize: "1rem", color: "var(--muted-color)", lineHeight: "1.6", marginBottom: "2rem" },
                  },
                  {
                    id: c3BtnId,
                    type: "Button",
                    props: { label: "Learn More →", variant: "secondary", link: "#cta" },
                    styles: { color: "var(--text-color)", borderRadius: "var(--border-radius)", fontSize: "0.75rem", letterSpacing: "0.05em" },
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
