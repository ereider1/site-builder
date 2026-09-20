import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createTeamFourColumnBlock = (): Section => {
  const containerId = generateId("comp-container");
  const headerId = generateId("comp-container");
  const eyebrowId = generateId("comp-text");
  const headingId = generateId("comp-heading");
  
  const gridId = generateId("comp-container");

  // Four Team Members inside a grid-3 (natively wraps beautifully to next line)
  const members = [
    { name: "Jane Morgan", role: "Creative Director", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80" },
    { name: "Daniel Lee", role: "Strategy Director", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80" },
    { name: "Maya Chen", role: "Design Director", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" },
    { name: "Sofia Bennett", role: "Brand Strategist", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" }
  ];

  return {
    id: generateId("sec-team-4col"),
    name: "Team — Four Column",
    type: "Team",
    blockId: "team-four-column",
    styles: {
      background: "var(--background-color)",
      paddingTop: "8rem",
      paddingBottom: "8rem",
    },
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
                props: { text: "OUR TEAM" },
                styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.15em", textTransform: "uppercase" },
              },
              {
                id: headingId,
                type: "Heading",
                props: { text: "The Minds Behind the Work", level: "h2" },
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
            children: members.map((m) => {
              const memId = generateId("comp-container");
              const imgId = generateId("comp-image");
              const nameId = generateId("comp-heading");
              const roleId = generateId("comp-text");
              
              return {
                id: memId,
                type: "Container",
                props: { layout: "flex-col", gap: "1rem" },
                styles: {},
                children: [
                  {
                    id: imgId,
                    type: "Image",
                    props: {
                      src: m.img,
                      alt: m.name,
                      objectFit: "cover",
                      aspectRatio: "1/1",
                    },
                    styles: { borderRadius: "var(--border-radius)" },
                  },
                  {
                    id: nameId,
                    type: "Heading",
                    props: { text: m.name, level: "h3" },
                    styles: { fontSize: "1.15rem", fontWeight: "600", color: "var(--text-color)" },
                  },
                  {
                    id: roleId,
                    type: "Text",
                    props: { text: m.role },
                    styles: { fontSize: "0.875rem", color: "var(--muted-color)" },
                  },
                ],
              };
            }) as any
          },
        ],
      },
    ],
  };
};
