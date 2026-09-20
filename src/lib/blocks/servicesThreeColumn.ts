import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createServicesThreeColumnBlock = (): Section => {
  const containerId = generateId("comp-container");
  
  const headerId = generateId("comp-container");
  const eyebrowId = generateId("comp-text");
  const headingId = generateId("comp-services-heading");
  
  const gridId = generateId("comp-container");

  // Card 1
  const card1Id = generateId("comp-card");
  const c1NumId = generateId("comp-text");
  const c1TitleId = generateId("comp-heading");
  const c1DescId = generateId("comp-text");
  const c1ArrowId = generateId("comp-text");

  // Card 2
  const card2Id = generateId("comp-card");
  const c2NumId = generateId("comp-text");
  const c2TitleId = generateId("comp-heading");
  const c2DescId = generateId("comp-text");
  const c2ArrowId = generateId("comp-text");

  // Card 3
  const card3Id = generateId("comp-card");
  const c3NumId = generateId("comp-text");
  const c3TitleId = generateId("comp-heading");
  const c3DescId = generateId("comp-text");
  const c3ArrowId = generateId("comp-text");

  return {
    id: generateId("sec-services-cards"),
    name: "Services — Three Column",
    type: "Services",
    blockId: "services-three-column",
    styles: {
      background: "var(--background-color)",
      paddingTop: "8rem",
      paddingBottom: "8rem",
    },
    contentSlots: [], // Static capabilities copy
    components: [
      {
        id: containerId,
        type: "Container",
        props: { layout: "flex-col", gap: "4rem" },
        styles: { maxWidth: "1280px" },
        children: [
          // Section Header Block
          {
            id: headerId,
            type: "Container",
            props: { layout: "flex-col", gap: "1rem" },
            styles: {},
            children: [
              {
                id: eyebrowId,
                type: "Text",
                props: { text: "CAPABILITIES" },
                styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.1em", textTransform: "uppercase" },
              },
              {
                id: headingId,
                type: "Heading",
                props: { text: "Our Practices", level: "h2" },
                styles: { fontSize: "2.5rem", fontWeight: "500", color: "var(--text-color)", letterSpacing: "-0.01em" },
              },
            ],
          },

          // 3 Column Grid
          {
            id: gridId,
            type: "Container",
            props: { layout: "grid-3", gap: "2.5rem" },
            styles: {},
            children: [
              // Card 01
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
                    props: { text: "Strategy", level: "h3" },
                    styles: { fontSize: "1.35rem", fontWeight: "600", color: "var(--text-color)", letterSpacing: "0.02em", marginBottom: "1rem" },
                  },
                  {
                    id: c1DescId,
                    type: "Text",
                    props: { text: "Turn complex challenges into clear, actionable direction." },
                    styles: { fontSize: "1rem", color: "var(--muted-color)", lineHeight: "1.6", marginBottom: "2rem" },
                  },
                  {
                    id: c1ArrowId,
                    type: "Text",
                    props: { text: "→" },
                    styles: { fontSize: "1.5rem", color: "var(--text-color)" },
                  },
                ],
              },

              // Card 02
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
                    props: { text: "Digital Experiences", level: "h3" },
                    styles: { fontSize: "1.35rem", fontWeight: "600", color: "var(--text-color)", letterSpacing: "0.02em", marginBottom: "1rem" },
                  },
                  {
                    id: c2DescId,
                    type: "Text",
                    props: { text: "Create thoughtful digital experiences that move people to action." },
                    styles: { fontSize: "1rem", color: "var(--muted-color)", lineHeight: "1.6", marginBottom: "2rem" },
                  },
                  {
                    id: c2ArrowId,
                    type: "Text",
                    props: { text: "→" },
                    styles: { fontSize: "1.5rem", color: "var(--text-color)" },
                  },
                ],
              },

              // Card 03
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
                    props: { text: "Creative Direction", level: "h3" },
                    styles: { fontSize: "1.35rem", fontWeight: "600", color: "var(--text-color)", letterSpacing: "0.02em", marginBottom: "1rem" },
                  },
                  {
                    id: c3DescId,
                    type: "Text",
                    props: { text: "Bring your brand, content, and customer experience together." },
                    styles: { fontSize: "1rem", color: "var(--muted-color)", lineHeight: "1.6", marginBottom: "2rem" },
                  },
                  {
                    id: c3ArrowId,
                    type: "Text",
                    props: { text: "→" },
                    styles: { fontSize: "1.5rem", color: "var(--text-color)" },
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
