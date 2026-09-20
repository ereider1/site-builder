import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createContentImageTextBlock = (): Section => {
  const containerId = generateId("comp-container");
  
  const colLeftId = generateId("comp-container");
  const imgId = generateId("comp-about-image"); // Maps to aboutImage slot
  
  const colRightId = generateId("comp-container");
  const eyebrowId = generateId("comp-text");
  const headingId = generateId("comp-heading");
  const text1Id = generateId("comp-text");
  const text2Id = generateId("comp-text");
  const btnId = generateId("comp-btn");

  return {
    id: generateId("sec-content-img-txt"),
    name: "Content — Split Image + Text",
    type: "Content",
    blockId: "content-image-text",
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
          // Left: Image
          {
            id: colLeftId,
            type: "Container",
            props: { layout: "flex-col" },
            styles: {},
            children: [
              {
                id: imgId,
                type: "Image",
                props: {
                  src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
                  alt: "Contemporary light architectural workspace interior design project portfolio environment",
                  objectFit: "cover",
                  aspectRatio: "3/4",
                },
                styles: { borderRadius: "var(--border-radius)" },
              },
            ],
          },

          // Right: Text Content
          {
            id: colRightId,
            type: "Container",
            props: { layout: "flex-col", gap: "1.5rem" },
            styles: {},
            children: [
              {
                id: eyebrowId,
                type: "Text",
                props: { text: "ABOUT THE COMPANY" },
                styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.15em", textTransform: "uppercase" },
              },
              {
                id: headingId,
                type: "Heading",
                props: { text: "Built around clarity, curiosity, and purpose.", level: "h2" },
                styles: { fontSize: "2.5rem", fontWeight: "500", color: "var(--text-color)", letterSpacing: "-0.01em", lineHeight: "1.2" },
              },
              {
                id: text1Id,
                type: "Text",
                props: { text: "We believe the future belongs to companies that can navigate complexity with clarity and absolute intent. We combine strategic design with precise technological execution." },
                styles: { fontSize: "1.125rem", color: "var(--muted-color)", lineHeight: "1.7" },
              },
              {
                id: text2Id,
                type: "Text",
                props: { text: "Our collaborative methodology is designed to translate business objectives into high-fidelity products, creating substantial, lasting brand equity." },
                styles: { fontSize: "1rem", color: "var(--muted-color)", lineHeight: "1.7" },
              },
              {
                id: btnId,
                type: "Button",
                props: { label: "Learn more", variant: "secondary", link: "#cta" },
                styles: { color: "var(--text-color)", borderRadius: "var(--border-radius)", fontSize: "0.75rem", letterSpacing: "0.05em", marginTop: "1rem" },
              },
            ],
          },
        ],
      },
    ],
  };
};
