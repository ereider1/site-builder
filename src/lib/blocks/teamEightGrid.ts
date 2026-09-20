import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createTeamEightGridBlock = (): Section => {
  const containerId = generateId("comp-container");
  const headerId = generateId("comp-container");
  const eyebrowId = generateId("comp-text");
  const headingId = generateId("comp-heading");
  
  const gridId = generateId("comp-container");

  const members = [
    { name: "Jane Morgan", role: "Creative Director", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" },
    { name: "Daniel Lee", role: "Strategy Director", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80" },
    { name: "Maya Chen", role: "Design Director", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
    { name: "Alex Rivera", role: "Technology Director", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
    { name: "Sofia Bennett", role: "Brand Strategist", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
    { name: "Noah Williams", role: "Product Designer", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80" },
    { name: "Olivia Carter", role: "Research Director", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
    { name: "Ethan Brooks", role: "Developer", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80" }
  ];

  return {
    id: generateId("sec-team-8grid"),
    name: "Team — Eight Person Grid",
    type: "Team",
    blockId: "team-eight-grid",
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
                props: { text: "OUR PEOPLE" },
                styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.15em", textTransform: "uppercase" },
              },
              {
                id: headingId,
                type: "Heading",
                props: { text: "Collaborative Excellence", level: "h2" },
                styles: { fontSize: "2.5rem", fontWeight: "500", color: "var(--text-color)", letterSpacing: "-0.01em" },
              },
            ],
          },

          // Grid (3 Columns wrapper)
          {
            id: gridId,
            type: "Container",
            props: { layout: "grid-3", gap: "3rem" },
            styles: {},
            children: members.map((m) => {
              const memId = generateId("comp-container");
              const imgId = generateId("comp-image");
              const nameId = generateId("comp-heading");
              const roleId = generateId("comp-text");
              
              return {
                id: memId,
                type: "Container",
                props: { layout: "flex-col", gap: "0.75rem" },
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
                    styles: { fontSize: "1.05rem", fontWeight: "600", color: "var(--text-color)" },
                  },
                  {
                    id: roleId,
                    type: "Text",
                    props: { text: m.role },
                    styles: { fontSize: "0.85rem", color: "var(--muted-color)" },
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
