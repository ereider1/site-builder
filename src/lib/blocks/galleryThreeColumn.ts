import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createGalleryThreeColumnBlock = (): Section => {
  const containerId = generateId("comp-container");
  const headerId = generateId("comp-container");
  const eyebrowId = generateId("comp-text");
  const headingId = generateId("comp-heading");
  
  const gridId = generateId("comp-container");
  const img1Id = generateId("comp-image");
  const img2Id = generateId("comp-image");
  const img3Id = generateId("comp-image");
  const img4Id = generateId("comp-image");
  const img5Id = generateId("comp-image");
  const img6Id = generateId("comp-image");

  return {
    id: generateId("sec-gallery-3col"),
    name: "Gallery — Three Column",
    type: "Gallery",
    blockId: "gallery-three-column",
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
                props: { text: "Studio Collections", level: "h2" },
                styles: { fontSize: "2.5rem", fontWeight: "500", color: "var(--text-color)", letterSpacing: "-0.01em" },
              },
            ],
          },

          // 3 Column Grid with 6 images
          {
            id: gridId,
            type: "Container",
            props: { layout: "grid-3", gap: "2.5rem" },
            styles: {},
            children: [
              {
                id: img1Id,
                type: "Image",
                props: {
                  src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
                  alt: "Minimalist display concrete studio workspace environment",
                  objectFit: "cover",
                  aspectRatio: "16/10",
                },
                styles: { borderRadius: "var(--border-radius)" },
              },
              {
                id: img2Id,
                type: "Image",
                props: {
                  src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
                  alt: "High-end corporate collaborative alignment strategy session",
                  objectFit: "cover",
                  aspectRatio: "16/10",
                },
                styles: { borderRadius: "var(--border-radius)" },
              },
              {
                id: img3Id,
                type: "Image",
                props: {
                  src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
                  alt: "Immersive architectural visual framework structure",
                  objectFit: "cover",
                  aspectRatio: "16/10",
                },
                styles: { borderRadius: "var(--border-radius)" },
              },
              {
                id: img4Id,
                type: "Image",
                props: {
                  src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
                  alt: "Branding session detail and customer feedback maps",
                  objectFit: "cover",
                  aspectRatio: "16/10",
                },
                styles: { borderRadius: "var(--border-radius)" },
              },
              {
                id: img5Id,
                type: "Image",
                props: {
                  src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
                  alt: "Portrait session creative team director detail review",
                  objectFit: "cover",
                  aspectRatio: "16/10",
                },
                styles: { borderRadius: "var(--border-radius)" },
              },
              {
                id: img6Id,
                type: "Image",
                props: {
                  src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
                  alt: "Creative meeting overview and design asset review",
                  objectFit: "cover",
                  aspectRatio: "16/10",
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
