import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createContentImageGridBlock = (): Section => {
  const containerId = generateId("comp-container");
  const headerId = generateId("comp-container");
  const eyebrowId = generateId("comp-text");
  const headingId = generateId("comp-heading");
  
  const gridId = generateId("comp-container");

  // Item 1
  const col1Id = generateId("comp-container");
  const img1Id = generateId("comp-work-image"); // Maps to featuredWorkImage slot
  const c1EyebrowId = generateId("comp-text");
  const c1TitleId = generateId("comp-heading");
  const c1DescId = generateId("comp-text");

  // Item 2
  const col2Id = generateId("comp-container");
  const img2Id = generateId("comp-about-image"); // Maps to aboutImage slot
  const c2EyebrowId = generateId("comp-text");
  const c2TitleId = generateId("comp-heading");
  const c2DescId = generateId("comp-text");

  // Item 3
  const col3Id = generateId("comp-container");
  const img3Id = generateId("comp-image");
  const c3EyebrowId = generateId("comp-text");
  const c3TitleId = generateId("comp-heading");
  const c3DescId = generateId("comp-text");

  return {
    id: generateId("sec-content-img-grid"),
    name: "Content — Image Grid",
    type: "Content",
    blockId: "content-image-grid",
    styles: {
      background: "var(--background-color)",
      paddingTop: "8rem",
      paddingBottom: "8rem",
    },
    // Map slots cleanly to standard brand assets
    contentSlots: [
      { componentId: img1Id, property: "src", source: "brand.featuredWorkImage" },
      { componentId: img2Id, property: "src", source: "brand.aboutImage" },
    ],
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
            styles: {},
            children: [
              {
                id: eyebrowId,
                type: "Text",
                props: { text: "PERSPECTIVES" },
                styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.15em", textTransform: "uppercase" },
              },
              {
                id: headingId,
                type: "Heading",
                props: { text: "Insights & Stories", level: "h2" },
                styles: { fontSize: "2.5rem", fontWeight: "500", color: "var(--text-color)", letterSpacing: "-0.01em" },
              },
            ],
          },

          // Grid
          {
            id: gridId,
            type: "Container",
            props: { layout: "grid-3", gap: "2.5rem" },
            styles: {},
            children: [
              // Column 1
              {
                id: col1Id,
                type: "Container",
                props: { layout: "flex-col", gap: "1.5rem" },
                styles: {},
                children: [
                  {
                    id: img1Id,
                    type: "Image",
                    props: {
                      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
                      alt: "Studio interior design showcase",
                      objectFit: "cover",
                      aspectRatio: "16/10",
                    },
                    styles: { borderRadius: "var(--border-radius)" },
                  },
                  {
                    id: c1EyebrowId,
                    type: "Text",
                    props: { text: "STRATEGY" },
                    styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.1em" },
                  },
                  {
                    id: c1TitleId,
                    type: "Heading",
                    props: { text: "Good work starts with better questions.", level: "h3" },
                    styles: { fontSize: "1.25rem", fontWeight: "600", color: "var(--text-color)", lineHeight: "1.3" },
                  },
                  {
                    id: c1DescId,
                    type: "Text",
                    props: { text: "How asking the right questions unlocks strategic value before design begins." },
                    styles: { fontSize: "0.95rem", color: "var(--muted-color)", lineHeight: "1.6" },
                  },
                ],
              },
              // Column 2
              {
                id: col2Id,
                type: "Container",
                props: { layout: "flex-col", gap: "1.5rem" },
                styles: {},
                children: [
                  {
                    id: img2Id,
                    type: "Image",
                    props: {
                      src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
                      alt: "Human collaborative design strategy showcase",
                      objectFit: "cover",
                      aspectRatio: "16/10",
                    },
                    styles: { borderRadius: "var(--border-radius)" },
                  },
                  {
                    id: c2EyebrowId,
                    type: "Text",
                    props: { text: "DESIGN" },
                    styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.1em" },
                  },
                  {
                    id: c2TitleId,
                    type: "Heading",
                    props: { text: "Built around clarity, curiosity, and purpose.", level: "h3" },
                    styles: { fontSize: "1.25rem", fontWeight: "600", color: "var(--text-color)", lineHeight: "1.3" },
                  },
                  {
                    id: c2DescId,
                    type: "Text",
                    props: { text: "We combine strategic thinking with world-class execution to build lasting brand equity." },
                    styles: { fontSize: "0.95rem", color: "var(--muted-color)", lineHeight: "1.6" },
                  },
                ],
              },
              // Column 3
              {
                id: col3Id,
                type: "Container",
                props: { layout: "flex-col", gap: "1.5rem" },
                styles: {},
                children: [
                  {
                    id: img3Id,
                    type: "Image",
                    props: {
                      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
                      alt: "Architectural structure landscape showcase",
                      objectFit: "cover",
                      aspectRatio: "16/10",
                    },
                    styles: { borderRadius: "var(--border-radius)" },
                  },
                  {
                    id: c3EyebrowId,
                    type: "Text",
                    props: { text: "SYSTEMS" },
                    styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.1em" },
                  },
                  {
                    id: c3TitleId,
                    type: "Heading",
                    props: { text: "Ideas worth turning into action.", level: "h3" },
                    styles: { fontSize: "1.25rem", fontWeight: "600", color: "var(--text-color)", lineHeight: "1.3" },
                  },
                  {
                    id: c3DescId,
                    type: "Text",
                    props: { text: "A comprehensive project aligning visual elements and core business scaling goals." },
                    styles: { fontSize: "0.95rem", color: "var(--muted-color)", lineHeight: "1.6" },
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
