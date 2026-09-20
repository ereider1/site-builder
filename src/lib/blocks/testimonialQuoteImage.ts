import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createTestimonialQuoteImageBlock = (): Section => {
  const containerId = generateId("comp-container");
  
  const colLeftId = generateId("comp-container");
  const quoteId = generateId("comp-heading");
  const metaContainerId = generateId("comp-container");
  const nameId = generateId("comp-text");
  const roleId = generateId("comp-text");

  const colRightId = generateId("comp-container");
  const imgId = generateId("comp-about-image"); // Map to aboutImage slot

  return {
    id: generateId("sec-testimonial-img"),
    name: "Testimonial — Quote + Image",
    type: "Testimonial",
    blockId: "testimonial-quote-image",
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
          // Left: Quote Column
          {
            id: colLeftId,
            type: "Container",
            props: { layout: "flex-col", gap: "2rem" },
            styles: {},
            children: [
              {
                id: quoteId,
                type: "Heading",
                props: { text: "“Northstar helped us turn a complicated business challenge into a clear and actionable plan. Our engineering speed surged, but the design alignment was the real win.”", level: "h2" },
                styles: { fontSize: "2.25rem", fontStyle: "italic", fontWeight: "400", color: "var(--text-color)", letterSpacing: "-0.01em", lineHeight: "1.35" },
              },
              {
                id: metaContainerId,
                type: "Container",
                props: { layout: "flex-col", gap: "0.25rem" },
                styles: {},
                children: [
                  {
                    id: nameId,
                    type: "Text",
                    props: { text: "MAYA CHEN" },
                    styles: { fontSize: "0.875rem", fontWeight: "600", color: "var(--text-color)", letterSpacing: "0.05em" },
                  },
                  {
                    id: roleId,
                    type: "Text",
                    props: { text: "Founder, Harbor Studio" },
                    styles: { fontSize: "0.875rem", color: "var(--muted-color)" },
                  },
                ],
              },
            ],
          },

          // Right: Image Column
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
                  src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
                  alt: "Maya Chen client feedback workspace architectural portrait",
                  objectFit: "cover",
                  aspectRatio: "1/1",
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
