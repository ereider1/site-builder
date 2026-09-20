import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createGalleryFeaturedGridBlock = (): Section => {
  const containerId = generateId("comp-container");
  const headerId = generateId("comp-container");
  const eyebrowId = generateId("comp-text");
  const headingId = generateId("comp-heading");
  
  const gridId = generateId("comp-container");
  
  const colLeftId = generateId("comp-container");
  const imgLargeId = generateId("comp-work-image"); // Map to featuredWorkImage slot

  const colRightId = generateId("comp-container");
  const innerGridId = generateId("comp-container");
  const img2Id = generateId("comp-image");
  const img3Id = generateId("comp-image");
  const img4Id = generateId("comp-image");
  const img5Id = generateId("comp-image");

  return {
    id: generateId("sec-gallery-grid"),
    name: "Gallery — Featured Grid",
    type: "Gallery",
    blockId: "gallery-featured-grid",
    styles: {
      background: "var(--background-color)",
      paddingTop: "8rem",
      paddingBottom: "8rem",
    },
    // Explicit content-slot mappings
    contentSlots: [
      { componentId: imgLargeId, property: "src", source: "brand.featuredWorkImage" },
    ],
    components: [
      {
        id: containerId,
        type: "Container",
        props: { layout: "flex-col", gap: "4rem", lightboxEnabled: true, loopGallery: true }, // Outer Gallery settings
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
                props: { text: "GALLERY" },
                styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.15em", textTransform: "uppercase" },
              },
              {
                id: headingId,
                type: "Heading",
                props: { text: "Studio Workspace Showcase", level: "h2" },
                styles: { fontSize: "2.5rem", fontWeight: "500", color: "var(--text-color)", letterSpacing: "-0.01em" },
              },
            ],
          },

          // Asymmetric Grid (Large Image Left, 4 small grid on Right)
          {
            id: gridId,
            type: "Container",
            props: { layout: "grid-2", gap: "2.5rem" },
            styles: {},
            children: [
              // Col Left: Majestic wide featured photo
              {
                id: colLeftId,
                type: "Container",
                props: { layout: "flex-col" },
                styles: {},
                children: [
                  {
                    id: imgLargeId,
                    type: "Image",
                    props: {
                      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
                      alt: "Centered creative high-contrast minimal workspace landscape photo",
                      objectFit: "cover",
                      aspectRatio: "1/1",
                    },
                    styles: { borderRadius: "var(--border-radius)" },
                  },
                ],
              },

              // Col Right: 2x2 grid of small adjacent photos
              {
                id: colRightId,
                type: "Container",
                props: { layout: "flex-col" },
                styles: {},
                children: [
                  {
                    id: innerGridId,
                    type: "Container",
                    props: { layout: "grid-2", gap: "1.5rem" },
                    styles: {},
                    children: [
                      {
                        id: img2Id,
                        type: "Image",
                        props: {
                          src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
                          alt: "Architectural strategy and detailed collaborative portfolio",
                          objectFit: "cover",
                          aspectRatio: "1/1",
                        },
                        styles: { borderRadius: "var(--border-radius)" },
                      },
                      {
                        id: img3Id,
                        type: "Image",
                        props: {
                          src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
                          alt: "Bespoke engineering visual framework structures",
                          objectFit: "cover",
                          aspectRatio: "1/1",
                        },
                        styles: { borderRadius: "var(--border-radius)" },
                      },
                      {
                        id: img4Id,
                        type: "Image",
                        props: {
                          src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
                          alt: "Creative director brand alignment session details",
                          objectFit: "cover",
                          aspectRatio: "1/1",
                        },
                        styles: { borderRadius: "var(--border-radius)" },
                      },
                      {
                        id: img5Id,
                        type: "Image",
                        props: {
                          src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
                          alt: "Portrait of lead strategist presenting workflow pipelines",
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
          },
        ],
      },
    ],
  };
};
