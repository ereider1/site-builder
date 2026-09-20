import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createContentTextGridBlock = (): Section => {
  const containerId = generateId("comp-container");
  const headerId = generateId("comp-container");
  const eyebrowId = generateId("comp-text");
  const headingId = generateId("comp-heading");
  
  const gridId = generateId("comp-container");

  // 6 Small Cards inside one Grid Container
  const cards = [
    { num: "01", title: "Brand Strategy", desc: "Align visual identity with primary business scaling goals." },
    { num: "02", title: "Growth Design", desc: "Formulate product pathways that increase sustainable conversion." },
    { num: "03", title: "Digital Products", desc: "Design thoughtfully composed software experiences that move people." },
    { num: "04", title: "Technology", desc: "Build modular custom software architectures with clean, tested code." },
    { num: "05", title: "Bespoke Systems", desc: "Construct fully custom internal pipelines tailored exactly to your workflows." },
    { num: "06", title: "Continuous Support", desc: "Rely on long-term engineering partnership and proactive support systems." }
  ];

  return {
    id: generateId("sec-content-txt-grid"),
    name: "Content — Grid of Text Blocks",
    type: "Content",
    blockId: "content-text-grid",
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
                props: { text: "WHAT WE DO" },
                styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.15em", textTransform: "uppercase", textAlign: "center" },
              },
              {
                id: headingId,
                type: "Heading",
                props: { text: "Our Focus Areas", level: "h2" },
                styles: { fontSize: "2.5rem", fontWeight: "500", color: "var(--text-color)", letterSpacing: "-0.01em", textAlign: "center" },
              },
            ],
          },

          // Grid with 6 items
          {
            id: gridId,
            type: "Container",
            props: { layout: "grid-3", gap: "2.5rem" },
            styles: {},
            children: cards.map((card, i) => {
              const cardId = generateId("comp-card");
              const numId = generateId("comp-text");
              const titleId = generateId("comp-heading");
              const descId = generateId("comp-text");
              
              return {
                id: cardId,
                type: "Card",
                props: { padding: "2rem", bg: "var(--surface-color)" },
                styles: { borderRadius: "var(--border-radius)", border: "1px solid var(--border-color)" },
                children: [
                  {
                    id: numId,
                    type: "Text",
                    props: { text: card.num },
                    styles: { fontSize: "0.75rem", color: "var(--muted-color)", fontWeight: "600", letterSpacing: "0.05em", marginBottom: "0.75rem" },
                  },
                  {
                    id: titleId,
                    type: "Heading",
                    props: { text: card.title, level: "h3" },
                    styles: { fontSize: "1.25rem", fontWeight: "600", color: "var(--text-color)", letterSpacing: "0.02em", marginBottom: "0.75rem" },
                  },
                  {
                    id: descId,
                    type: "Text",
                    props: { text: card.desc },
                    styles: { fontSize: "0.95rem", color: "var(--muted-color)", lineHeight: "1.6" },
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
