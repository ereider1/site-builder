import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createHeroCenteredBlock = (): Section => {
  const containerId = generateId("comp-container");
  
  const contentId = generateId("comp-container");
  const eyebrowId = generateId("comp-text");
  const headingId = generateId("comp-hero-heading");
  const textId = generateId("comp-hero-text");
  
  const btnContainerId = generateId("comp-container");
  const btnPrimaryId = generateId("comp-hero-btn-primary");
  const btnSecondaryId = generateId("comp-hero-btn-secondary");
  
  const imageId = generateId("comp-hero-image");

  return {
    id: generateId("sec-hero-centered"),
    name: "Hero — Centered",
    type: "Hero",
    blockId: "hero-centered",
    styles: {
      background: "var(--background-color)",
      paddingTop: "10rem", // Spacious, quietly sophisticated breathing room
      paddingBottom: "10rem",
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
        props: { layout: "flex-col", gap: "4rem" },
        styles: { maxWidth: "1000px" }, // Constrained content measure for high-end editorial reading
        children: [
          // Centered typography container
          {
            id: contentId,
            type: "Container",
            props: { layout: "flex-col", gap: "2rem" },
            styles: { textAlign: "center" },
            children: [
              {
                id: eyebrowId,
                type: "Text",
                props: { text: "INDEPENDENT CONSULTING" },
                styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.15em", textTransform: "uppercase", textAlign: "center" },
              },
              {
                id: headingId,
                type: "Heading",
                props: { text: "Build a business ready for what comes next.", level: "h1" },
                styles: { fontSize: "4.5rem", lineHeight: "1.05", fontWeight: "500", color: "var(--text-color)", letterSpacing: "-0.03em", textAlign: "center" },
              },
              {
                id: textId,
                type: "Text",
                props: { text: "We help ambitious companies clarify their direction, strengthen their digital presence, and build systems that scale." },
                styles: { fontSize: "1.25rem", color: "var(--muted-color)", lineHeight: "1.6", maxWidth: "700px", margin: "0 auto", textAlign: "center" },
              },
              {
                id: btnContainerId,
                type: "Container",
                props: { layout: "flex-row", gap: "1rem", justify: "justify-center" },
                styles: {},
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

          // Immersive lower visual block
          {
            id: imageId,
            type: "Image",
            props: {
              src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
              alt: "Minimalist concrete creative architectural workspace studio environment",
              objectFit: "cover",
              aspectRatio: "21/9", // Widescreen visual presence
            },
            styles: { borderRadius: "var(--border-radius)" },
          },
        ],
      },
    ],
  };
};
