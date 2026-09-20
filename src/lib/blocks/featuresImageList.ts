import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createFeaturesImageListBlock = (): Section => {
  const containerId = generateId("comp-container");
  
  const imageColId = generateId("comp-container");
  const imageId = generateId("comp-about-image"); // Map to aboutImage slot
  
  const contentColId = generateId("comp-container");
  const eyebrowId = generateId("comp-text");
  const headingId = generateId("comp-heading");
  
  const listId = generateId("comp-container");

  // Feature 1
  const f1Id = generateId("comp-container");
  const f1TitleId = generateId("comp-heading");
  const f1DescId = generateId("comp-text");

  // Feature 2
  const f2Id = generateId("comp-container");
  const f2TitleId = generateId("comp-heading");
  const f2DescId = generateId("comp-text");

  // Feature 3
  const f3Id = generateId("comp-container");
  const f3TitleId = generateId("comp-heading");
  const f3DescId = generateId("comp-text");

  return {
    id: generateId("sec-features-img-list"),
    name: "Features — Image + List",
    type: "Features",
    blockId: "features-image-list",
    styles: {
      background: "var(--background-color)",
      paddingTop: "8rem",
      paddingBottom: "8rem",
    },
    // Explicit content slots
    contentSlots: [
      { componentId: imageId, property: "src", source: "brand.aboutImage" },
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
            id: imageColId,
            type: "Container",
            props: { layout: "flex-col" },
            styles: {},
            children: [
              {
                id: imageId,
                type: "Image",
                props: {
                  src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
                  alt: "High-end contemporary strategy workspace environmental portfolio showcase",
                  objectFit: "cover",
                  aspectRatio: "3/4",
                },
                styles: { borderRadius: "var(--border-radius)" },
              },
            ],
          },

          // Right: List
          {
            id: contentColId,
            type: "Container",
            props: { layout: "flex-col", gap: "3rem" },
            styles: {},
            children: [
              // Header
              {
                id: generateId("comp-container"),
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
                    props: { text: "Everything you need to move forward.", level: "h2" },
                    styles: { fontSize: "2.5rem", fontWeight: "500", color: "var(--text-color)", letterSpacing: "-0.01em" },
                  },
                ],
              },

              // Stacked list
              {
                id: listId,
                type: "Container",
                props: { layout: "flex-col", gap: "0" },
                styles: {},
                children: [
                  // Feature 1
                  {
                    id: f1Id,
                    type: "Container",
                    props: { layout: "flex-col", gap: "0.5rem" },
                    styles: { borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem", paddingBottom: "1.5rem" },
                    children: [
                      {
                        id: f1TitleId,
                        type: "Heading",
                        props: { text: "01 / Clear Strategy", level: "h3" },
                        styles: { fontSize: "1.25rem", fontWeight: "600", color: "var(--text-color)", letterSpacing: "0.02em" },
                      },
                      {
                        id: f1DescId,
                        type: "Text",
                        props: { text: "Turn complex challenges into a focused plan with clear priorities." },
                        styles: { fontSize: "1rem", color: "var(--muted-color)", lineHeight: "1.6" },
                      },
                    ],
                  },
                  // Feature 2
                  {
                    id: f2Id,
                    type: "Container",
                    props: { layout: "flex-col", gap: "0.5rem" },
                    styles: { borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem", paddingBottom: "1.5rem" },
                    children: [
                      {
                        id: f2TitleId,
                        type: "Heading",
                        props: { text: "02 / Thoughtful Design", level: "h3" },
                        styles: { fontSize: "1.25rem", fontWeight: "600", color: "var(--text-color)", letterSpacing: "0.02em" },
                      },
                      {
                        id: f2DescId,
                        type: "Text",
                        props: { text: "Create experiences that feel simple, useful, and unmistakably yours." },
                        styles: { fontSize: "1rem", color: "var(--muted-color)", lineHeight: "1.6" },
                      },
                    ],
                  },
                  // Feature 3
                  {
                    id: f3Id,
                    type: "Container",
                    props: { layout: "flex-col", gap: "0.5rem" },
                    styles: { borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border-color)" },
                    children: [
                      {
                        id: f3TitleId,
                        type: "Heading",
                        props: { text: "03 / Built to Scale", level: "h3" },
                        styles: { fontSize: "1.25rem", fontWeight: "600", color: "var(--text-color)", letterSpacing: "0.02em" },
                      },
                      {
                        id: f3DescId,
                        type: "Text",
                        props: { text: "Create flexible systems that can grow alongside the business." },
                        styles: { fontSize: "1rem", color: "var(--muted-color)", lineHeight: "1.6" },
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
