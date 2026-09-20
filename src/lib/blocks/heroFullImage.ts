import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createHeroFullImageBlock = (): Section => {
  const containerId = generateId("comp-container");
  
  const imageId = generateId("comp-hero-image");
  const contentGridId = generateId("comp-container");
  
  const colLeftId = generateId("comp-container");
  const eyebrowId = generateId("comp-text");
  const headingId = generateId("comp-hero-heading");
  
  const colRightId = generateId("comp-container");
  const textId = generateId("comp-hero-text");
  const btnContainerId = generateId("comp-container");
  const btnPrimaryId = generateId("comp-hero-btn-primary");

  return {
    id: generateId("sec-hero-full-image"),
    name: "Hero — Full Image",
    type: "Hero",
    blockId: "hero-full-image",
    styles: {
      background: "var(--background-color)",
      paddingTop: "0rem", // Immersive widescreen section touching navigation boundary
      paddingBottom: "8rem",
    },
    // Explicit content-slot mappings
    contentSlots: [
      { componentId: headingId, property: "text", source: "business.tagline" },
      { componentId: textId, property: "text", source: "business.description" },
      { componentId: imageId, property: "src", source: "brand.heroImage" },
    ],
    components: [
      {
        id: containerId,
        type: "Container",
        props: { layout: "flex-col", gap: "5rem" },
        styles: { maxWidth: "100%" },
        children: [
          // 1. Immersive full-width visual hero banner
          {
            id: imageId,
            type: "Image",
            props: {
              src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
              alt: "Full widescreen editorial strategy creative landscape",
              objectFit: "cover",
              aspectRatio: "21/9",
            },
            styles: { borderRadius: "0px" },
          },

          // 2. Sophisticated asymmetric split narrative directly below the widescreen image
          {
            id: contentGridId,
            type: "Container",
            props: { layout: "grid-2", gap: "6rem" },
            styles: { maxWidth: "1280px", paddingLeft: "1.5rem", paddingRight: "1.5rem" },
            children: [
              // Col Left: Eyebrow + Headline
              {
                id: colLeftId,
                type: "Container",
                props: { layout: "flex-col", gap: "1.5rem" },
                styles: {},
                children: [
                  {
                    id: eyebrowId,
                    type: "Text",
                    props: { text: "CORE INITIATIVE" },
                    styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.15em", textTransform: "uppercase" },
                  },
                  {
                    id: headingId,
                    type: "Heading",
                    props: { text: "Build a business ready for what comes next.", level: "h1" },
                    styles: { fontSize: "3.5rem", lineHeight: "1.1", fontWeight: "500", color: "var(--text-color)", letterSpacing: "-0.02em" },
                  },
                ],
              },

              // Col Right: Supporting Copy + Prominent Call-to-action
              {
                id: colRightId,
                type: "Container",
                props: { layout: "flex-col", gap: "2rem" },
                styles: {},
                children: [
                  {
                    id: textId,
                    type: "Text",
                    props: { text: "We help ambitious companies clarify their direction, strengthen their digital presence, and build systems that scale." },
                    styles: { fontSize: "1.125rem", color: "var(--muted-color)", lineHeight: "1.6" },
                  },
                  {
                    id: btnContainerId,
                    type: "Container",
                    props: { layout: "flex-row" },
                    styles: {},
                    children: [
                      {
                        id: btnPrimaryId,
                        type: "Button",
                        props: { label: "Connect with us", variant: "primary", link: "#cta" },
                        styles: { background: "var(--primary-color)", color: "var(--surface-color)", borderRadius: "var(--border-radius)", fontSize: "0.75rem", letterSpacing: "0.05em" },
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
