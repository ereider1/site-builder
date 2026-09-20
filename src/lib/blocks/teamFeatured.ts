import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createTeamFeaturedBlock = (): Section => {
  const containerId = generateId("comp-container");
  
  const colLeftId = generateId("comp-container");
  const leftImgId = generateId("comp-about-image"); // Map to aboutImage
  const leftNameId = generateId("comp-heading");
  const leftRoleId = generateId("comp-text");
  const leftBioId = generateId("comp-text");

  const colRightId = generateId("comp-container");
  const rightEyebrowId = generateId("comp-text");
  
  // Supporting group lists
  const members = [
    { name: "Daniel Lee", role: "Strategy Director" },
    { name: "Maya Chen", role: "Design Director" },
    { name: "Sofia Bennett", role: "Brand Strategist" }
  ];

  return {
    id: generateId("sec-team-featured"),
    name: "Team — Featured Person",
    type: "Team",
    blockId: "team-featured",
    styles: {
      background: "var(--background-color)",
      paddingTop: "8rem",
      paddingBottom: "8rem",
    },
    // Explicit content-slot mappings
    contentSlots: [
      { componentId: leftImgId, property: "src", source: "brand.aboutImage" },
    ],
    components: [
      {
        id: containerId,
        type: "Container",
        props: { layout: "grid-2", gap: "6rem", align: "items-start" },
        styles: { maxWidth: "1280px" },
        children: [
          // Column Left: Large Featured Lead Person (greater visual weight)
          {
            id: colLeftId,
            type: "Container",
            props: { layout: "flex-col", gap: "1.5rem" },
            styles: {},
            children: [
              {
                id: leftImgId,
                type: "Image",
                props: {
                  src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
                  alt: "Jane Morgan Creative Director portrait featured studio showcase",
                  objectFit: "cover",
                  aspectRatio: "3/4", // Portrait elegance
                },
                styles: { borderRadius: "var(--border-radius)" },
              },
              {
                id: leftNameId,
                type: "Heading",
                props: { text: "Jane Morgan", level: "h3" },
                styles: { fontSize: "1.75rem", fontWeight: "600", color: "var(--text-color)" },
              },
              {
                id: leftRoleId,
                type: "Text",
                props: { text: "Creative Director & Founder" },
                styles: { fontSize: "1rem", fontWeight: "600", color: "var(--muted-color)" },
              },
              {
                id: leftBioId,
                type: "Text",
                props: { text: "Jane established Northstar with a vision to combine immersive editorial storytelling with structural design principles and robust engineering pipelines." },
                styles: { fontSize: "1.05rem", color: "var(--muted-color)", lineHeight: "1.6" },
              },
            ],
          },

          // Column Right: Supporting Directory List
          {
            id: colRightId,
            type: "Container",
            props: { layout: "flex-col", gap: "2rem" },
            styles: {},
            children: [
              {
                id: rightEyebrowId,
                type: "Text",
                props: { text: "TEAM DIRECTORS" },
                styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" },
              },
              ...members.map((m) => {
                const memRowId = generateId("comp-container");
                const mNameId = generateId("comp-heading");
                const mRoleId = generateId("comp-text");
                
                return {
                  id: memRowId,
                  type: "Container",
                  props: { layout: "flex-col", gap: "0.5rem" },
                  styles: { borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem", paddingBottom: "1.5rem" },
                  children: [
                    {
                      id: mNameId,
                      type: "Heading",
                      props: { text: m.name, level: "h4" },
                      styles: { fontSize: "1.25rem", fontWeight: "600", color: "var(--text-color)" },
                    },
                    {
                      id: mRoleId,
                      type: "Text",
                      props: { text: m.role },
                      styles: { fontSize: "0.95rem", color: "var(--muted-color)" },
                    },
                  ],
                };
              }) as any
            ],
          },
        ],
      },
    ],
  };
};
