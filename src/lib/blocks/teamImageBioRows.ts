import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createTeamImageBioRowsBlock = (): Section => {
  const containerId = generateId("comp-container");
  const headerId = generateId("comp-container");
  const eyebrowId = generateId("comp-text");
  const headingId = generateId("comp-heading");
  
  const rowsContainerId = generateId("comp-container");

  const members = [
    { name: "Jane Morgan", role: "Creative Director", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80", bio: "Jane leads our creative team with over 15 years of design experience directing world-class digital narratives." },
    { name: "Daniel Lee", role: "Strategy Director", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80", bio: "Daniel helps client companies map complex landscapes into actionable trajectories with absolute business intent." },
    { name: "Maya Chen", role: "Design Director", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80", bio: "Maya aligns visual products, brand guidelines, and engineering features into single coherent creative directions." },
    { name: "Sofia Bennett", role: "Brand Strategist", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80", bio: "Sofia uncovers alternative positioning opportunities to elevate growing companies above noise levels." }
  ];

  return {
    id: generateId("sec-team-rows"),
    name: "Team — Image + Bio Rows",
    type: "Team",
    blockId: "team-image-bio-rows",
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
        styles: { maxWidth: "1000px" },
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
                props: { text: "PEOPLE" },
                styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.15em", textTransform: "uppercase" },
              },
              {
                id: headingId,
                type: "Heading",
                props: { text: "Our Directors", level: "h2" },
                styles: { fontSize: "2.5rem", fontWeight: "500", color: "var(--text-color)", letterSpacing: "-0.01em" },
              },
            ],
          },

          // Stacked rows
          {
            id: rowsContainerId,
            type: "Container",
            props: { layout: "flex-col", gap: "0" },
            styles: {},
            children: members.map((m, idx) => {
              const rowId = generateId("comp-container");
              const gridId = generateId("comp-container");
              const imgId = generateId("comp-image");
              const textColId = generateId("comp-container");
              const nameId = generateId("comp-heading");
              const roleId = generateId("comp-text");
              const bioId = generateId("comp-text");
              
              const isLast = idx === members.length - 1;
              const borderStyles = isLast
                ? { borderTop: "1px solid var(--border-color)", paddingTop: "2.5rem", paddingBottom: "2.5rem" }
                : { borderTop: "1px solid var(--border-color)", paddingTop: "2.5rem", paddingBottom: "2.5rem" };

              return {
                id: rowId,
                type: "Container",
                props: { layout: "flex-col" },
                styles: borderStyles,
                children: [
                  {
                    id: gridId,
                    type: "Container",
                    props: { layout: "grid-2", gap: "3rem", align: "items-start" },
                    styles: {},
                    children: [
                      // Portrait
                      {
                        id: imgId,
                        type: "Image",
                        props: {
                          src: m.img,
                          alt: m.name,
                          objectFit: "cover",
                          aspectRatio: "1/1",
                        },
                        styles: { borderRadius: "var(--border-radius)", maxWidth: "320px" },
                      },
                      // Bio & details
                      {
                        id: textColId,
                        type: "Container",
                        props: { layout: "flex-col", gap: "1rem" },
                        styles: {},
                        children: [
                          {
                            id: nameId,
                            type: "Heading",
                            props: { text: m.name, level: "h3" },
                            styles: { fontSize: "1.5rem", fontWeight: "600", color: "var(--text-color)" },
                          },
                          {
                            id: roleId,
                            type: "Text",
                            props: { text: m.role },
                            styles: { fontSize: "1rem", fontWeight: "600", color: "var(--muted-color)" },
                          },
                          {
                            id: bioId,
                            type: "Text",
                            props: { text: m.bio },
                            styles: { fontSize: "1.05rem", color: "var(--muted-color)", lineHeight: "1.6" },
                          },
                        ],
                      },
                    ],
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
