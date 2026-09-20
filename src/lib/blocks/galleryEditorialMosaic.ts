import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createGalleryEditorialMosaicBlock = (): Section => {
  const containerId = generateId("comp-container");
  const headerId = generateId("comp-container");
  const eyebrowId = generateId("comp-text");
  const headingId = generateId("comp-heading");
  
  const gridId = generateId("comp-container");
  const colLeftId = generateId("comp-container");
  const img1Id = generateId("comp-image");

  const colRightId = generateId("comp-container");
  const img2Id = generateId("comp-image");
  const innerGridId = generateId("comp-container");
  const img3Id = generateId("comp-image");
  const img4Id = generateId("comp-image");

  return {
    id: generateId("sec-gallery-mosaic"),
    name: "Gallery — Editorial Mosaic",
    type: "Gallery",
    blockId: "gallery-editorial-mosaic",
    styles: {
      background: "var(--background-color)",
      paddingTop: "8rem",
      paddingBottom: "8rem",
    },
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
                props: { text: "The Editorial Mosaic", level: "h2" },
                styles: { fontSize: "2.5rem", fontWeight: "500", color: "var(--text-color)", letterSpacing: "-0.01em" },
              },
            ],
          },

          // Mosaic layout (Grid-2: Left spans full height, Right has nested stacked rows)
          {
            id: gridId,
            type: "Container",
            props: { layout: "grid-2", gap: "2.5rem" },
            styles: {},
            children: [
              // Col Left: Tall vertical portrait image (greater weight)
              {
                id: colLeftId,
                type: "Container",
                props: { layout: "flex-col" },
                styles: {},
                children: [
                  {
                    id: img1Id,
                    type: "Image",
                    props: {
                      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
                      alt: "Editorial vertical model portrait alignment and lighting session",
                      objectFit: "cover",
                      aspectRatio: "3/4",
                    },
                    styles: { borderRadius: "var(--border-radius)" },
                  },
                ],
              },

              // Col Right: Vertical stack of asymmetric landscape and square pairs
              {
                id: colRightId,
                type: "Container",
                props: { layout: "flex-col", gap: "1.5rem" },
                styles: {},
                children: [
                  // Row Top: Spacious landscape widescreen
                  {
                    id: img2Id,
                    type: "Image",
                    props: {
                      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
                      alt: "Studio interior design showcase and environmental details",
                      objectFit: "cover",
                      aspectRatio: "16/10",
                    },
                    styles: { borderRadius: "var(--border-radius)" },
                  },

                  // Row Bottom: Grid of 2 square items
                  {
                    id: innerGridId,
                    type: "Container",
                    props: { layout: "grid-2", gap: "1.5rem" },
                    styles: {},
                    children: [
                      {
                        id: img3Id,
                        type: "Image",
                        props: {
                          src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
                          alt: "High-end corporate corporate presentation session",
                          objectFit: "cover",
                          aspectRatio: "1/1",
                        },
                        styles: { borderRadius: "var(--border-radius)" },
                      },
                      {
                        id: img4Id,
                        type: "Image",
                        props: {
                          src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
                          alt: "Immersive architectural visual construction structure",
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
