import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createContentFeaturedStoriesBlock = (): Section => {
  const containerId = generateId("comp-container");
  
  const colLeftId = generateId("comp-container");
  const leftEyebrowId = generateId("comp-text");
  const leftImgId = generateId("comp-work-image"); // Maps to featuredWorkImage slot
  const leftTitleId = generateId("comp-heading");
  const leftDescId = generateId("comp-text");

  const colRightId = generateId("comp-container");
  
  // Story A (small)
  const rStoryAId = generateId("comp-container");
  const sAImgId = generateId("comp-about-image"); // Maps to aboutImage slot
  const sATextColId = generateId("comp-container");
  const sATitleId = generateId("comp-heading");
  const sADescId = generateId("comp-text");

  // Story B (small)
  const rStoryBId = generateId("comp-container");
  const sBImgId = generateId("comp-image");
  const sBTextColId = generateId("comp-container");
  const sBTitleId = generateId("comp-heading");
  const sBDescId = generateId("comp-text");

  return {
    id: generateId("sec-content-stories"),
    name: "Content — Image + Three Stories",
    type: "Content",
    blockId: "content-featured-stories",
    styles: {
      background: "var(--background-color)",
      paddingTop: "8rem",
      paddingBottom: "8rem",
    },
    // Explicit content-slot mappings
    contentSlots: [
      { componentId: leftImgId, property: "src", source: "brand.featuredWorkImage" },
      { componentId: sAImgId, property: "src", source: "brand.aboutImage" },
    ],
    components: [
      {
        id: containerId,
        type: "Container",
        props: { layout: "grid-2", gap: "6rem" },
        styles: { maxWidth: "1280px" },
        children: [
          // Column Left: Immersive Featured Story (60% equivalent visual weight)
          {
            id: colLeftId,
            type: "Container",
            props: { layout: "flex-col", gap: "1.5rem" },
            styles: {},
            children: [
              {
                id: leftEyebrowId,
                type: "Text",
                props: { text: "PERSPECTIVES" },
                styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.15em", textTransform: "uppercase" },
              },
              {
                id: leftImgId,
                type: "Image",
                props: {
                  src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
                  alt: "Widescreen editorial feature workspace design",
                  objectFit: "cover",
                  aspectRatio: "16/10",
                },
                styles: { borderRadius: "var(--border-radius)" },
              },
              {
                id: leftTitleId,
                type: "Heading",
                props: { text: "Good work starts with better questions.", level: "h3" },
                styles: { fontSize: "1.75rem", fontWeight: "600", color: "var(--text-color)", letterSpacing: "-0.01em", lineHeight: "1.3" },
              },
              {
                id: leftDescId,
                type: "Text",
                props: { text: "Why asking the right questions unlocks strategic value and creates lasting positioning before visual design even begins." },
                styles: { fontSize: "1.05rem", color: "var(--muted-color)", lineHeight: "1.7" },
              },
            ],
          },

          // Column Right: Vertical stack of two smaller, highly aligned stories
          {
            id: colRightId,
            type: "Container",
            props: { layout: "flex-col", gap: "3rem" },
            styles: {},
            children: [
              // Story Row A
              {
                id: rStoryAId,
                type: "Container",
                props: { layout: "grid-2", gap: "1.5rem", align: "items-start" },
                styles: { borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" },
                children: [
                  {
                    id: sAImgId,
                    type: "Image",
                    props: {
                      src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80",
                      alt: "Small details portrait workspace visual",
                      objectFit: "cover",
                      aspectRatio: "1/1",
                    },
                    styles: { borderRadius: "var(--border-radius)", maxWidth: "100px" },
                  },
                  {
                    id: sATextColId,
                    type: "Container",
                    props: { layout: "flex-col", gap: "0.5rem" },
                    styles: {},
                    children: [
                      {
                        id: sATitleId,
                        type: "Heading",
                        props: { text: "A thoughtful approach to design.", level: "h4" },
                        styles: { fontSize: "1.15rem", fontWeight: "600", color: "var(--text-color)" },
                      },
                      {
                        id: sADescId,
                        type: "Text",
                        props: { text: "Combine strategic design with precise technological execution." },
                        styles: { fontSize: "0.95rem", color: "var(--muted-color)", lineHeight: "1.6" },
                      },
                    ],
                  },
                ],
              },

              // Story Row B
              {
                id: rStoryBId,
                type: "Container",
                props: { layout: "grid-2", gap: "1.5rem", align: "items-start" },
                styles: { borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" },
                children: [
                  {
                    id: sBImgId,
                    type: "Image",
                    props: {
                      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
                      alt: "Studio environment overview minimal look",
                      objectFit: "cover",
                      aspectRatio: "1/1",
                    },
                    styles: { borderRadius: "var(--border-radius)", maxWidth: "100px" },
                  },
                  {
                    id: sBTextColId,
                    type: "Container",
                    props: { layout: "flex-col", gap: "0.5rem" },
                    styles: {},
                    children: [
                      {
                        id: sBTitleId,
                        type: "Heading",
                        props: { text: "Built with curiosity & scaling power.", level: "h4" },
                        styles: { fontSize: "1.15rem", fontWeight: "600", color: "var(--text-color)" },
                      },
                      {
                        id: sBDescId,
                        type: "Text",
                        props: { text: "Formulate product scaling pathways that increase conversion." },
                        styles: { fontSize: "0.95rem", color: "var(--muted-color)", lineHeight: "1.6" },
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
