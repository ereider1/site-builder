import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createFeaturesEditorialListBlock = (): Section => {
  const containerId = generateId("comp-container");
  const headerId = generateId("comp-container");
  const eyebrowId = generateId("comp-text");
  const headingId = generateId("comp-heading");
  
  const listContainerId = generateId("comp-container");

  // Feature Row 1
  const r1Id = generateId("comp-container");
  const r1GridId = generateId("comp-container");
  const r1Col1Id = generateId("comp-container");
  const r1NumId = generateId("comp-text");
  const r1TitleId = generateId("comp-heading");
  const r1DescId = generateId("comp-text");
  const r1ArrowId = generateId("comp-text");

  // Feature Row 2
  const r2Id = generateId("comp-container");
  const r2GridId = generateId("comp-container");
  const r2Col1Id = generateId("comp-container");
  const r2NumId = generateId("comp-text");
  const r2TitleId = generateId("comp-heading");
  const r2DescId = generateId("comp-text");
  const r2ArrowId = generateId("comp-text");

  // Feature Row 3
  const r3Id = generateId("comp-container");
  const r3GridId = generateId("comp-container");
  const r3Col1Id = generateId("comp-container");
  const r3NumId = generateId("comp-text");
  const r3TitleId = generateId("comp-heading");
  const r3DescId = generateId("comp-text");
  const r3ArrowId = generateId("comp-text");

  return {
    id: generateId("sec-features-list"),
    name: "Features — Editorial List",
    type: "Features",
    blockId: "features-editorial-list",
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
                props: { text: "FEATURES" },
                styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.15em", textTransform: "uppercase" },
              },
              {
                id: headingId,
                type: "Heading",
                props: { text: "Our Focus Areas", level: "h2" },
                styles: { fontSize: "2.5rem", fontWeight: "500", color: "var(--text-color)", letterSpacing: "-0.01em" },
              },
            ],
          },

          // List Rows Stacks
          {
            id: listContainerId,
            type: "Container",
            props: { layout: "flex-col", gap: "0" },
            styles: {},
            children: [
              // Row 01
              {
                id: r1Id,
                type: "Container",
                props: { layout: "flex-col" },
                styles: { borderTop: "1px solid var(--border-color)", paddingTop: "2.5rem", paddingBottom: "2.5rem" },
                children: [
                  {
                    id: r1GridId,
                    type: "Container",
                    props: { layout: "grid-3", gap: "2rem", align: "items-start" },
                    styles: {},
                    children: [
                      // Column 1: Number + Title
                      {
                        id: r1Col1Id,
                        type: "Container",
                        props: { layout: "flex-col", gap: "0.75rem" },
                        styles: {},
                        children: [
                          {
                            id: r1NumId,
                            type: "Text",
                            props: { text: "01" },
                            styles: { fontSize: "0.75rem", color: "var(--muted-color)", fontWeight: "600", letterSpacing: "0.05em" },
                          },
                          {
                            id: r1TitleId,
                            type: "Heading",
                            props: { text: "Clear Strategy", level: "h3" },
                            styles: { fontSize: "1.35rem", fontWeight: "600", color: "var(--text-color)", letterSpacing: "0.02em" },
                          },
                        ],
                      },
                      // Column 2: Description
                      {
                        id: r1DescId,
                        type: "Text",
                        props: { text: "Turn complex challenges into a focused plan with clear priorities." },
                        styles: { fontSize: "1.05rem", color: "var(--muted-color)", lineHeight: "1.6" },
                      },
                      // Column 3: Action Arrow
                      {
                        id: r1ArrowId,
                        type: "Text",
                        props: { text: "→" },
                        styles: { fontSize: "1.5rem", color: "var(--text-color)", textAlign: "right" },
                      },
                    ],
                  },
                ],
              },

              // Row 02
              {
                id: r2Id,
                type: "Container",
                props: { layout: "flex-col" },
                styles: { borderTop: "1px solid var(--border-color)", paddingTop: "2.5rem", paddingBottom: "2.5rem" },
                children: [
                  {
                    id: r2GridId,
                    type: "Container",
                    props: { layout: "grid-3", gap: "2rem", align: "items-start" },
                    styles: {},
                    children: [
                      // Column 1: Number + Title
                      {
                        id: r2Col1Id,
                        type: "Container",
                        props: { layout: "flex-col", gap: "0.75rem" },
                        styles: {},
                        children: [
                          {
                            id: r2NumId,
                            type: "Text",
                            props: { text: "02" },
                            styles: { fontSize: "0.75rem", color: "var(--muted-color)", fontWeight: "600", letterSpacing: "0.05em" },
                          },
                          {
                            id: r2TitleId,
                            type: "Heading",
                            props: { text: "Thoughtful Design", level: "h3" },
                            styles: { fontSize: "1.35rem", fontWeight: "600", color: "var(--text-color)", letterSpacing: "0.02em" },
                          },
                        ],
                      },
                      // Column 2: Description
                      {
                        id: r2DescId,
                        type: "Text",
                        props: { text: "Create experiences that feel simple, useful, and unmistakably yours." },
                        styles: { fontSize: "1.05rem", color: "var(--muted-color)", lineHeight: "1.6" },
                      },
                      // Column 3: Action Arrow
                      {
                        id: r2ArrowId,
                        type: "Text",
                        props: { text: "→" },
                        styles: { fontSize: "1.5rem", color: "var(--text-color)", textAlign: "right" },
                      },
                    ],
                  },
                ],
              },

              // Row 03
              {
                id: r3Id,
                type: "Container",
                props: { layout: "flex-col" },
                styles: { borderTop: "1px solid var(--border-color)", paddingTop: "2.5rem", paddingBottom: "2.5rem", borderBottom: "1px solid var(--border-color)" },
                children: [
                  {
                    id: r3GridId,
                    type: "Container",
                    props: { layout: "grid-3", gap: "2rem", align: "items-start" },
                    styles: {},
                    children: [
                      // Column 1: Number + Title
                      {
                        id: r3Col1Id,
                        type: "Container",
                        props: { layout: "flex-col", gap: "0.75rem" },
                        styles: {},
                        children: [
                          {
                            id: r3NumId,
                            type: "Text",
                            props: { text: "03" },
                            styles: { fontSize: "0.75rem", color: "var(--muted-color)", fontWeight: "600", letterSpacing: "0.05em" },
                          },
                          {
                            id: r3TitleId,
                            type: "Heading",
                            props: { text: "Built to Scale", level: "h3" },
                            styles: { fontSize: "1.35rem", fontWeight: "600", color: "var(--text-color)", letterSpacing: "0.02em" },
                          },
                        ],
                      },
                      // Column 2: Description
                      {
                        id: r3DescId,
                        type: "Text",
                        props: { text: "Create flexible systems that can grow alongside the business." },
                        styles: { fontSize: "1.05rem", color: "var(--muted-color)", lineHeight: "1.6" },
                      },
                      // Column 3: Action Arrow
                      {
                        id: r3ArrowId,
                        type: "Text",
                        props: { text: "→" },
                        styles: { fontSize: "1.5rem", color: "var(--text-color)", textAlign: "right" },
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
