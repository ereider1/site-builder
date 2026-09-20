import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createContentQuoteImageBlock = (): Section => {
  const containerId = generateId("comp-container");
  
  const colLeftId = generateId("comp-container");
  const quoteId = generateId("comp-heading");
  const authorId = generateId("comp-text");
  
  const colRightId = generateId("comp-container");
  const imgId = generateId("comp-about-image"); // Maps to aboutImage slot

  return {
    id: generateId("sec-content-quote-img"),
    name: "Content — Quote + Image",
    type: "Content",
    blockId: "content-quote-image",
    styles: {
      background: "var(--background-color)",
      paddingTop: "8rem",
      paddingBottom: "8rem",
    },
    // Explicit content-slot mappings
    contentSlots: [
      { componentId: imgId, property: "src", source: "brand.aboutImage" },
    ],
    components: [
      {
        id: containerId,
        type: "Container",
        props: { layout: "grid-2", gap: "6rem", align: "items-center" },
        styles: { maxWidth: "1280px" },
        children: [
          // Left: Quote column
          {
            id: colLeftId,
            type: "Container",
            props: { layout: "flex-col", gap: "2rem" },
            styles: {},
            children: [
              {
                id: quoteId,
                type: "Heading",
                props: { text: "“Ideas worth turning into action require both massive strategic courage and precise engineering execution.”", level: "h2" },
                styles: { fontSize: "2.5rem", fontWeight: "400", color: "var(--text-color)", letterSpacing: "-0.01em", lineHeight: "1.35", fontStyle: "italic" },
              },
              {
                id: authorId,
                type: "Text",
                props: { text: "— MAYA CHEN, FOUNDER" },
                styles: { fontSize: "0.875rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.1em" },
              },
            ],
          },

          // Right: Image column
          {
            id: colRightId,
            type: "Container",
            props: { layout: "flex-col" },
            styles: {},
            children: [
              {
                id: imgId,
                type: "Image",
                props: {
                  src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
                  alt: "High-contrast geometric architectural minimal staircase outline",
                  objectFit: "cover",
                  aspectRatio: "1/1", // Square photo visual balance
                },
                styles: { borderRadius: "var(--border-radius)" },
              },
            ],
          },
        ],
      },
    ],
  };
};
