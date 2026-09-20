import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createTeamEditorialListBlock = (): Section => {
  const containerId = generateId("comp-container");
  const headerId = generateId("comp-container");
  const eyebrowId = generateId("comp-text");
  const headingId = generateId("comp-heading");
  
  const listContainerId = generateId("comp-container");

  const directors = [
    { name: "Jane Morgan", role: "Creative Director", num: "01" },
    { name: "Daniel Lee", role: "Strategy Director", num: "02" },
    { name: "Maya Chen", role: "Design Director", num: "03" }
  ];

  return {
    id: generateId("sec-team-list"),
    name: "Team — Editorial List",
    type: "Team",
    blockId: "team-editorial-list",
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
                props: { text: "DIRECTORY" },
                styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.15em", textTransform: "uppercase" },
              },
              {
                id: headingId,
                type: "Heading",
                props: { text: "Our Leaders", level: "h2" },
                styles: { fontSize: "2.5rem", fontWeight: "500", color: "var(--text-color)", letterSpacing: "-0.01em" },
              },
            ],
          },

          // Stacks
          {
            id: listContainerId,
            type: "Container",
            props: { layout: "flex-col", gap: "0" },
            styles: {},
            children: directors.map((d, idx) => {
              const rowId = generateId("comp-container");
              const gridId = generateId("comp-container");
              const leftColId = generateId("comp-container");
              const numId = generateId("comp-text");
              const nameId = generateId("comp-heading");
              const roleId = generateId("comp-text");
              const arrowId = generateId("comp-text");
              
              const isLast = idx === directors.length - 1;
              const rowStyles = isLast
                ? { borderTop: "1px solid var(--border-color)", paddingTop: "2rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border-color)" }
                : { borderTop: "1px solid var(--border-color)", paddingTop: "2rem", paddingBottom: "2rem" };

              return {
                id: rowId,
                type: "Container",
                props: { layout: "flex-col" },
                styles: rowStyles,
                children: [
                  {
                    id: gridId,
                    type: "Container",
                    props: { layout: "grid-3", gap: "2rem", align: "items-center" },
                    styles: {},
                    children: [
                      // Col 1: Number + Name
                      {
                        id: leftColId,
                        type: "Container",
                        props: { layout: "flex-col", gap: "0.5rem" },
                        styles: {},
                        children: [
                          {
                            id: numId,
                            type: "Text",
                            props: { text: d.num },
                            styles: { fontSize: "0.75rem", color: "var(--muted-color)", fontWeight: "600", letterSpacing: "0.05em" },
                          },
                          {
                            id: nameId,
                            type: "Heading",
                            props: { text: d.name, level: "h3" },
                            styles: { fontSize: "1.35rem", fontWeight: "600", color: "var(--text-color)", letterSpacing: "0.02em" },
                          },
                        ],
                      },
                      // Col 2: Role
                      {
                        id: roleId,
                        type: "Text",
                        props: { text: d.role },
                        styles: { fontSize: "1.05rem", color: "var(--muted-color)" },
                      },
                      // Col 3: Arrow
                      {
                        id: arrowId,
                        type: "Text",
                        props: { text: "→" },
                        styles: { fontSize: "1.5rem", color: "var(--text-color)", textAlign: "right" },
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
