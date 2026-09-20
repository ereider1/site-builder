import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createFeaturesAlternatingBlock = (): Section => {
  const containerId = generateId("comp-container");

  // Row 1 (Image left, text right)
  const r1Id = generateId("comp-container");
  const r1ImgId = generateId("comp-hero-image");
  const r1ColRightId = generateId("comp-container");
  const r1EyebrowId = generateId("comp-text");
  const r1HeadingId = generateId("comp-heading");
  const r1DescId = generateId("comp-text");
  const r1BtnId = generateId("comp-btn");

  // Row 2 (Text left, image right)
  const r2Id = generateId("comp-container");
  const r2ImgId = generateId("comp-about-image");
  const r2ColLeftId = generateId("comp-container");
  const r2EyebrowId = generateId("comp-text");
  const r2HeadingId = generateId("comp-heading");
  const r2DescId = generateId("comp-text");
  const r2BtnId = generateId("comp-btn");

  // Row 3 (Image left, text right)
  const r3Id = generateId("comp-container");
  const r3ImgId = generateId("comp-work-image");
  const r3ColRightId = generateId("comp-container");
  const r3EyebrowId = generateId("comp-text");
  const r3HeadingId = generateId("comp-heading");
  const r3DescId = generateId("comp-text");
  const r3BtnId = generateId("comp-btn");

  return {
    id: generateId("sec-features-alt"),
    name: "Features — Alternating",
    type: "Features",
    blockId: "features-alternating",
    styles: {
      background: "var(--background-color)",
      paddingTop: "8rem",
      paddingBottom: "8rem",
    },
    // Map slots cleanly to standard brand assets where appropriate
    contentSlots: [
      { componentId: r1ImgId, property: "src", source: "brand.heroImage" },
      { componentId: r2ImgId, property: "src", source: "brand.aboutImage" },
      { componentId: r3ImgId, property: "src", source: "brand.featuredWorkImage" },
    ],
    components: [
      {
        id: containerId,
        type: "Container",
        props: { layout: "flex-col", gap: "8rem" }, // Spacious rhythm between rows
        styles: { maxWidth: "1280px" },
        children: [
          // Row 1
          {
            id: r1Id,
            type: "Container",
            props: { layout: "grid-2", gap: "6rem", align: "items-center" },
            styles: {},
            children: [
              {
                id: r1ImgId,
                type: "Image",
                props: {
                  src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
                  alt: "Concrete strategy creative architecture workspace",
                  objectFit: "cover",
                  aspectRatio: "16/10",
                },
                styles: { borderRadius: "var(--border-radius)" },
              },
              {
                id: r1ColRightId,
                type: "Container",
                props: { layout: "flex-col", gap: "1.5rem" },
                styles: {},
                children: [
                  {
                    id: r1EyebrowId,
                    type: "Text",
                    props: { text: "STRATEGY" },
                    styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.15em", textTransform: "uppercase" },
                  },
                  {
                    id: r1HeadingId,
                    type: "Heading",
                    props: { text: "Clear Strategy", level: "h2" },
                    styles: { fontSize: "2.25rem", fontWeight: "500", color: "var(--text-color)", letterSpacing: "-0.01em" },
                  },
                  {
                    id: r1DescId,
                    type: "Text",
                    props: { text: "Turn complex challenges into a focused plan with clear priorities." },
                    styles: { fontSize: "1.125rem", color: "var(--muted-color)", lineHeight: "1.6" },
                  },
                  {
                    id: r1BtnId,
                    type: "Button",
                    props: { label: "Learn More", variant: "secondary", link: "#cta" },
                    styles: { color: "var(--text-color)", borderRadius: "var(--border-radius)", fontSize: "0.75rem", letterSpacing: "0.05em" },
                  },
                ],
              },
            ],
          },

          // Row 2
          {
            id: r2Id,
            type: "Container",
            props: { layout: "grid-2", gap: "6rem", align: "items-center" },
            styles: {},
            children: [
              {
                id: r2ColLeftId,
                type: "Container",
                props: { layout: "flex-col", gap: "1.5rem" },
                styles: {},
                children: [
                  {
                    id: r2EyebrowId,
                    type: "Text",
                    props: { text: "DESIGN" },
                    styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.15em", textTransform: "uppercase" },
                  },
                  {
                    id: r2HeadingId,
                    type: "Heading",
                    props: { text: "Thoughtful Design", level: "h2" },
                    styles: { fontSize: "2.25rem", fontWeight: "500", color: "var(--text-color)", letterSpacing: "-0.01em" },
                  },
                  {
                    id: r2DescId,
                    type: "Text",
                    props: { text: "Create experiences that feel simple, useful, and unmistakably yours." },
                    styles: { fontSize: "1.125rem", color: "var(--muted-color)", lineHeight: "1.6" },
                  },
                  {
                    id: r2BtnId,
                    type: "Button",
                    props: { label: "Learn More", variant: "secondary", link: "#cta" },
                    styles: { color: "var(--text-color)", borderRadius: "var(--border-radius)", fontSize: "0.75rem", letterSpacing: "0.05em" },
                  },
                ],
              },
              {
                id: r2ImgId,
                type: "Image",
                props: {
                  src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
                  alt: "Human interaction in clean strategic architectural consulting environment",
                  objectFit: "cover",
                  aspectRatio: "16/10",
                },
                styles: { borderRadius: "var(--border-radius)" },
              },
            ],
          },

          // Row 3
          {
            id: r3Id,
            type: "Container",
            props: { layout: "grid-2", gap: "6rem", align: "items-center" },
            styles: {},
            children: [
              {
                id: r3ImgId,
                type: "Image",
                props: {
                  src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
                  alt: "Sustainable framework architectural visual structure",
                  objectFit: "cover",
                  aspectRatio: "16/10",
                },
                styles: { borderRadius: "var(--border-radius)" },
              },
              {
                id: r3ColRightId,
                type: "Container",
                props: { layout: "flex-col", gap: "1.5rem" },
                styles: {},
                children: [
                  {
                    id: r3EyebrowId,
                    type: "Text",
                    props: { text: "SCALABILITY" },
                    styles: { fontSize: "0.75rem", fontWeight: "600", color: "var(--muted-color)", letterSpacing: "0.15em", textTransform: "uppercase" },
                  },
                  {
                    id: r3HeadingId,
                    type: "Heading",
                    props: { text: "Built to Scale", level: "h2" },
                    styles: { fontSize: "2.25rem", fontWeight: "500", color: "var(--text-color)", letterSpacing: "-0.01em" },
                  },
                  {
                    id: r3DescId,
                    type: "Text",
                    props: { text: "Create flexible systems that can grow alongside the business." },
                    styles: { fontSize: "1.125rem", color: "var(--muted-color)", lineHeight: "1.6" },
                  },
                  {
                    id: r3BtnId,
                    type: "Button",
                    props: { label: "Learn More", variant: "secondary", link: "#cta" },
                    styles: { color: "var(--text-color)", borderRadius: "var(--border-radius)", fontSize: "0.75rem", letterSpacing: "0.05em" },
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
