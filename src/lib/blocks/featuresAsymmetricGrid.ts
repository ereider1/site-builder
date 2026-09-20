import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createFeaturesAsymmetricGridBlock = (): Section => {
  const containerId = generateId("comp-container");
  const headerId = generateId("comp-container");
  const eyebrowId = generateId("comp-text");
  const headingId = generateId("comp-heading");
  
  const gridId = generateId("comp-container");

  // Left Wide Card
  const colLeftId = generateId("comp-card");
  const c1NumId = generateId("comp-text");
  const c1TitleId = generateId("comp-heading");
  const c1DescId = generateId("comp-text");
  const c1ImgId = generateId("comp-hero-image"); // Map to heroImage slot

  // Right column of 2 stacked cards
  const colRightId = generateId("comp-container");

  // Card Right A
  const cardR1Id = generateId("comp-card");
  const cr1NumId = generateId("comp-text");
  const cr1TitleId = generateId("comp-heading");
  const cr1DescId = generateId("comp-text");

  // Card Right B
  const cardR2Id = generateId("comp-card");
  const cr2NumId = generateId("comp-text");
  const cr2TitleId = generateId("comp-heading");
  const cr2DescId = generateId("comp-text");

  return {
    id: generateId("sec-features-asym-grid"),
    name: "Features — Asymmetric Grid",
    type: "Features",
    blockId: "features-asymmetric-grid",
    styles: {
      background: "var(--background-color)",
      paddingTop: "8rem",
      paddingBottom: "8rem",
    },
    // Map slots cleanly to standard brand assets where appropriate
    contentSlots: [
      { componentId: c1ImgId, property: "src", source: "brand.heroImage" },
    ],
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
                props: { text: "Integrated Capabilities", level: "h2" },
                styles: { fontSize: "2.5rem", fontWeight: "500", color: "var(--text-color)", letterSpacing: "-0.01em" },
              },
            ],
          },

          // Asymmetric Staggered Grid (Split 60% Left / 40% Right)
          {
            id: gridId,
            type: "Container",
            props: { layout: "grid-2", gap: "3rem" },
            styles: {},
            children: [
              // Column Left: Wider, majestic landscape showcase card
              {
                id: colLeftId,
                type: "Card",
                props: { padding: "2.5rem", bg: "var(--surface-color)" },
                styles: { borderRadius: "var(--border-radius)", border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", gap: "1.5rem" },
                children: [
                  {
                    id: c1NumId,
                    type: "Text",
                    props: { text: "01 / DIRECTIVE" },
                    styles: { fontSize: "0.75rem", color: "var(--muted-color)", fontWeight: "600", letterSpacing: "0.1em" },
                  },
                  {
                    id: c1TitleId,
                    type: "Heading",
                    props: { text: "The Strategic Engine", level: "h3" },
                    styles: { fontSize: "1.5rem", fontWeight: "600", color: "var(--text-color)", letterSpacing: "-0.01em" },
                  },
                  {
                    id: c1DescId,
                    type: "Text",
                    props: { text: "Turn complex challenges into a focused plan with clear priorities." },
                    styles: { fontSize: "1.05rem", color: "var(--muted-color)", lineHeight: "1.6" },
                  },
                  {
                    id: c1ImgId,
                    type: "Image",
                    props: {
                      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
                      alt: "Sustainable design framework architectural visual",
                      objectFit: "cover",
                      aspectRatio: "21/9",
                    },
                    styles: { borderRadius: "var(--border-radius)" },
                  },
                ],
              },

              // Column Right: Vertical stack of two narrower cards
              {
                id: colRightId,
                type: "Container",
                props: { layout: "flex-col", gap: "3rem" },
                styles: {},
                children: [
                  // Card Right A
                  {
                    id: cardR1Id,
                    type: "Card",
                    props: { padding: "2rem", bg: "var(--surface-color)" },
                    styles: { borderRadius: "var(--border-radius)", border: "1px solid var(--border-color)" },
                    children: [
                      {
                        id: cr1NumId,
                        type: "Text",
                        props: { text: "02" },
                        styles: { fontSize: "0.75rem", color: "var(--muted-color)", fontWeight: "600", letterSpacing: "0.05em", marginBottom: "1rem" },
                      },
                      {
                        id: cr1TitleId,
                        type: "Heading",
                        props: { text: "Thoughtful Design", level: "h3" },
                        styles: { fontSize: "1.25rem", fontWeight: "600", color: "var(--text-color)", letterSpacing: "0.02em", marginBottom: "0.75rem" },
                      },
                      {
                        id: cr1DescId,
                        type: "Text",
                        props: { text: "Create experiences that feel simple, useful, and unmistakably yours." },
                        styles: { fontSize: "0.95rem", color: "var(--muted-color)", lineHeight: "1.6" },
                      },
                    ],
                  },

                  // Card Right B
                  {
                    id: cardR2Id,
                    type: "Card",
                    props: { padding: "2rem", bg: "var(--surface-color)" },
                    styles: { borderRadius: "var(--border-radius)", border: "1px solid var(--border-color)" },
                    children: [
                      {
                        id: cr2NumId,
                        type: "Text",
                        props: { text: "03" },
                        styles: { fontSize: "0.75rem", color: "var(--muted-color)", fontWeight: "600", letterSpacing: "0.05em", marginBottom: "1rem" },
                      },
                      {
                        id: cr2TitleId,
                        type: "Heading",
                        props: { text: "Built to Scale", level: "h3" },
                        styles: { fontSize: "1.25rem", fontWeight: "600", color: "var(--text-color)", letterSpacing: "0.02em", marginBottom: "0.75rem" },
                      },
                      {
                        id: cr2DescId,
                        type: "Text",
                        props: { text: "Create flexible systems that can grow alongside the business." },
                        styles: { fontSize: "0.95rem", color: "var(--muted-color)", lineHeight: "1.6" },
                      },
                    ],
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
