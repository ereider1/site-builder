import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createContentSplitEditorialBlock = (): Section => {
  const containerId = generateId("comp-container");
  
  const colLeftId = generateId("comp-container");
  const eyebrowId = generateId("comp-text");
  const headingId = generateId("comp-heading");
  
  const colRightId = generateId("comp-container");
  const text1Id = generateId("comp-text");
  const text2Id = generateId("comp-text");
  const btnId = generateId("comp-btn");

  return {
    id: generateId("sec-content-split"),
    name: "Content — Split Editorial",
    type: "Content",
    blockId: "content-split-editorial",
    styles: {
      background: "var(--background-color)",
      paddingTop: "8rem",
      paddingBottom: "8rem",
    },
    // Explicit content-slot mappings
    contentSlots: [
      { componentId: headingId, property: "text", source: "business.tagline" },
    ],
    components: [
      {
        id: containerId,
        type: "Container",
        props: { layout: "grid-2", gap: "6rem", align: "items-start" },
        styles: { maxWidth: "1280px" },
        children: [
          // Left Column
          {
            id: colLeftId,
            type: "Container",
            props: { layout: "flex-col", gap: "1.5rem" },
            styles: {},
            children: [
              {
                id: eyebrowId,
                type: "Text",
                props: { text: "OUR STORY" },
                styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.15em", textTransform: "uppercase" },
              },
              {
                id: headingId,
                type: "Heading",
                props: { text: "A thoughtful approach to what's next.", level: "h2" },
                styles: { fontSize: "3rem", fontWeight: "500", color: "var(--text-color)", letterSpacing: "-0.02em", lineHeight: "1.15" },
              },
            ],
          },

          // Right Column
          {
            id: colRightId,
            type: "Container",
            props: { layout: "flex-col", gap: "2rem" },
            styles: { borderLeft: "1px solid var(--border-color)", paddingLeft: "3rem" }, // Vertical separating rule
            children: [
              {
                id: text1Id,
                type: "Text",
                props: { text: "We combine strategic thinking, thoughtful design, and modern technology to help growing businesses move forward with absolute confidence." },
                styles: { fontSize: "1.125rem", color: "var(--muted-color)", lineHeight: "1.7" },
              },
              {
                id: text2Id,
                type: "Text",
                props: { text: "Our team operates at the intersection of brand strategy, digital product engineering, and business intelligence to form robust digital platforms." },
                styles: { fontSize: "1.125rem", color: "var(--muted-color)", lineHeight: "1.7" },
              },
              {
                id: btnId,
                type: "Button",
                props: { label: "Learn more →", variant: "secondary", link: "#cta" },
                styles: { color: "var(--text-color)", borderRadius: "var(--border-radius)", fontSize: "0.75rem", letterSpacing: "0.05em" },
              },
            ],
          },
        ],
      },
    ],
  };
};
