import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createHeroEditorialSplitBlock = (): Section => {
  const containerId = generateId("comp-container");
  const colLeftId = generateId("comp-container");
  const colRightId = generateId("comp-container");
  
  const eyebrowId = generateId("comp-text");
  const headingId = generateId("comp-hero-heading");
  const textId = generateId("comp-hero-text");
  const btnContainerId = generateId("comp-container");
  const btnPrimaryId = generateId("comp-hero-btn-primary");
  const btnSecondaryId = generateId("comp-hero-btn-secondary");
  const imageId = generateId("comp-hero-image");

  return {
    id: generateId("sec-hero-split"),
    name: "Hero — Editorial Split",
    type: "Hero",
    blockId: "hero-editorial-split",
    styles: {
      background: "var(--background-color)", // Theme-neutral spacing background
      paddingTop: "8rem",
      paddingBottom: "8rem",
    },
    // Explicit, local metadata content slot mapping definitions
    contentSlots: [
      { componentId: headingId, property: "text", source: "business.tagline" },
      { componentId: textId, property: "text", source: "business.description" },
      { componentId: imageId, property: "src", source: "brand.heroImage" },
    ],
    components: [
      {
        id: containerId,
        type: "Container",
        props: { layout: "grid-2", gap: "6rem", align: "items-center" },
        styles: { maxWidth: "1280px" },
        children: [
          {
            id: colLeftId,
            type: "Container",
            props: { layout: "flex-col", gap: "2rem" },
            styles: {},
            children: [
              {
                id: eyebrowId,
                type: "Text",
                props: { text: "INDEPENDENT CONSULTING" },
                styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.1em", textTransform: "uppercase" },
              },
              {
                id: headingId,
                type: "Heading",
                props: { text: "Build a business ready for what comes next.", level: "h1" },
                styles: { fontSize: "4.5rem", lineHeight: "1.05", fontWeight: "500", color: "var(--text-color)", letterSpacing: "-0.02em" },
              },
              {
                id: textId,
                type: "Text",
                props: { text: "We help ambitious companies clarify their direction, strengthen their digital presence, and build systems that scale." },
                styles: { fontSize: "1.25rem", color: "var(--muted-color)", lineHeight: "1.6" },
              },
              {
                id: btnContainerId,
                type: "Container",
                props: { layout: "flex-row", gap: "1rem" },
                styles: { marginTop: "1rem" },
                children: [
                  {
                    id: btnPrimaryId,
                    type: "Button",
                    props: { label: "Connect with us", variant: "primary", link: "#cta" },
                    styles: { background: "var(--primary-color)", color: "var(--surface-color)", borderRadius: "var(--border-radius)", fontSize: "0.75rem", letterSpacing: "0.05em" },
                  },
                  {
                    id: btnSecondaryId,
                    type: "Button",
                    props: { label: "Our capabilities", variant: "secondary", link: "#services" },
                    styles: { color: "var(--text-color)", borderRadius: "var(--border-radius)", fontSize: "0.75rem", letterSpacing: "0.05em" },
                  },
                ],
              },
            ],
          },
          {
            id: colRightId,
            type: "Container",
            props: { layout: "flex-col", justify: "justify-center" },
            styles: {},
            children: [
              {
                id: imageId,
                type: "Image",
                props: {
                  src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
                  alt: "Minimalist concrete creative architectural workspace studio environment",
                  objectFit: "cover",
                  aspectRatio: "3/4",
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
