import { Project, Theme } from "@/types/builder";

export const defaultTheme: Theme = {
  colors: {
    primary: "#111111", // Pitch charcoal
    secondary: "#111111", // Elegant dark accent
    background: "#fcfcf9", // Premium warm paper white
    surface: "#ffffff",
    text: "#1c1917", // Stone anthracite body text
    muted: "#78716c", // Stone gray
    border: "#e7e5e4", // Clean warm gray border
  },
  typography: {
    fontFamily: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
    },
    scale: {
      h1: "3.75rem",
      h2: "2.25rem",
      h3: "1.5rem",
      p: "1rem",
      small: "0.875rem",
    },
  },
  radius: "0px", // Professional, crisp sharp edges
  spacing: {
    sectionPadding: "6rem",
  },
};

export const createDefaultProject = (): Project => {
  return {
    id: "northstar-studio-project",
    name: "Northstar Studio — Professional Services",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    theme: defaultTheme,
    pages: [
      {
        id: "home-page",
        name: "Home",
        path: "/",
        sections: [
          // 1. Navigation (Header)
          {
            id: "sec-nav",
            name: "01 — Header Navigation",
            type: "Navigation",
            styles: {
              background: "#fcfcf9",
              paddingTop: "1.5rem",
              paddingBottom: "1.5rem",
              borderBottom: "1px solid #e7e5e4",
            },
            components: [
              {
                id: "comp-nav-container",
                type: "Container",
                props: { layout: "flex-row", justify: "justify-between", align: "items-center" },
                styles: {},
                children: [
                  {
                    id: "comp-nav-logo",
                    type: "Logo",
                    props: { text: "NORTHSTAR STUDIO" },
                    styles: { fontSize: "1.1rem", fontWeight: "700", color: "#111111" },
                  },
                  {
                    id: "comp-nav-links",
                    type: "NavLinks",
                    props: {
                      links: [
                        { label: "Capabilities", href: "#services" },
                        { label: "About", href: "#about" },
                        { label: "Process", href: "#process" },
                        { label: "Selected Work", href: "#work" },
                      ],
                    },
                    styles: {},
                  },
                  {
                    id: "comp-nav-btn",
                    type: "Button",
                    props: { label: "Start Conversation", variant: "secondary", link: "#cta" },
                    styles: { borderRadius: "0px", color: "#111111" },
                  },
                ],
              },
            ],
          },
          // 2. Hero Section
          {
            id: "sec-hero",
            name: "02 — Hero Studio Header",
            type: "Hero",
            styles: {
              background: "#fcfcf9",
              paddingTop: "6.5rem",
              paddingBottom: "6.5rem",
              borderBottom: "1px solid #e7e5e4",
            },
            components: [
              {
                id: "comp-hero-container",
                type: "Container",
                props: { layout: "grid-2", gap: "4rem" },
                styles: { maxWidth: "1280px" },
                children: [
                  {
                    id: "comp-hero-col-left",
                    type: "Container",
                    props: { layout: "flex-col", gap: "2rem" },
                    styles: {},
                    children: [
                      {
                        id: "comp-hero-eyebrow",
                        type: "Text",
                        props: { text: "INDEPENDENT CONSULTING — STRATEGY FOR WHAT'S NEXT." },
                        styles: { fontSize: "0.75rem", fontWeight: "600", color: "#78716c" },
                      },
                      {
                        id: "comp-hero-heading",
                        type: "Heading",
                        props: { text: "Build a business ready for what comes next.", level: "h1" },
                        styles: { fontSize: "3.5rem", lineHeight: "1.1", fontWeight: "800", color: "#111111" },
                      },
                      {
                        id: "comp-hero-text",
                        type: "Text",
                        props: { text: "We help ambitious companies clarify their direction, strengthen their digital presence, and build systems that scale." },
                        styles: { fontSize: "1.125rem", color: "#78716c" },
                      },
                      {
                        id: "comp-hero-btn-container",
                        type: "Container",
                        props: { layout: "flex-row", gap: "1rem" },
                        styles: {},
                        children: [
                          {
                            id: "comp-hero-btn-primary",
                            type: "Button",
                            props: { label: "Connect with us", variant: "primary", link: "#cta" },
                            styles: { background: "#111111", color: "#ffffff", borderRadius: "0px" },
                          },
                          {
                            id: "comp-hero-btn-secondary",
                            type: "Button",
                            props: { label: "Our Capabilities", variant: "secondary", link: "#services" },
                            styles: { color: "#111111", borderRadius: "0px" },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "comp-hero-col-right",
                    type: "Container",
                    props: { layout: "flex-col", justify: "justify-center" },
                    styles: {},
                    children: [
                      {
                        id: "comp-hero-image",
                        type: "Image",
                        props: {
                          src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
                          alt: "Minimalist concrete creative architectural workspace studio environment",
                          objectFit: "cover",
                          aspectRatio: "4/3",
                        },
                        styles: { borderRadius: "0px" },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          // 3. Trust / Introduction
          {
            id: "sec-trust",
            name: "03 — Core Philosophy",
            type: "Trust",
            styles: {
              background: "#ffffff",
              paddingTop: "5rem",
              paddingBottom: "5rem",
              borderBottom: "1px solid #e7e5e4",
            },
            components: [
              {
                id: "comp-trust-container",
                type: "Container",
                props: { layout: "grid-2", gap: "3rem" },
                styles: { maxWidth: "1280px" },
                children: [
                  {
                    id: "comp-trust-left",
                    type: "Text",
                    props: { text: "OUR BELIEF" },
                    styles: { fontSize: "0.75rem", fontWeight: "700", color: "#78716c" },
                  },
                  {
                    id: "comp-trust-right",
                    type: "Container",
                    props: { layout: "flex-col", gap: "2.5rem" },
                    styles: {},
                    children: [
                      {
                        id: "comp-trust-quote",
                        type: "Heading",
                        props: { text: "We believe the future belongs to companies that can navigate complexity with clarity and absolute intent.", level: "h2" },
                        styles: { fontSize: "2rem", fontWeight: "500", lineHeight: "1.3", color: "#111111" },
                      },
                      {
                        id: "comp-trust-divider",
                        type: "Divider",
                        props: {},
                        styles: { borderTop: "1px solid #e7e5e4" },
                      },
                      {
                        id: "comp-trust-sectors",
                        type: "Text",
                        props: { text: "STRATEGY  ·  DIGITAL SYSTEMS  ·  BRAND ARCHITECTURE" },
                        styles: { fontSize: "0.8rem", fontWeight: "600", color: "#78716c" },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          // 4. Services
          {
            id: "sec-services",
            name: "04 — Core Practices",
            type: "Services",
            styles: {
              background: "#fcfcf9",
              paddingTop: "6.5rem",
              paddingBottom: "6.5rem",
              borderBottom: "1px solid #e7e5e4",
            },
            components: [
              {
                id: "comp-services-container",
                type: "Container",
                props: { layout: "grid-2", gap: "4rem" },
                styles: { maxWidth: "1280px" },
                children: [
                  {
                    id: "comp-services-col-left",
                    type: "Container",
                    props: { layout: "flex-col", gap: "1.5rem" },
                    styles: {},
                    children: [
                      {
                        id: "comp-services-eyebrow",
                        type: "Text",
                        props: { text: "CAPABILITIES" },
                        styles: { fontSize: "0.75rem", fontWeight: "700", color: "#78716c" },
                      },
                      {
                        id: "comp-services-heading",
                        type: "Heading",
                        props: { text: "Our Practices", level: "h2" },
                        styles: { fontSize: "2.25rem", fontWeight: "800", color: "#111111" },
                      },
                      {
                        id: "comp-services-desc",
                        type: "Text",
                        props: { text: "We combine strategic thinking, thoughtful design, and modern technology to help growing businesses move forward with confidence." },
                        styles: { fontSize: "1rem", color: "#78716c" },
                      },
                    ],
                  },
                  {
                    id: "comp-services-col-right",
                    type: "Container",
                    props: { layout: "flex-col", gap: "2rem" },
                    styles: {},
                    children: [
                      // Practice 01
                      {
                        id: "comp-practice-1",
                        type: "Container",
                        props: { layout: "flex-col", gap: "0.5rem" },
                        styles: { borderTop: "1px solid #e7e5e4", paddingTop: "1.5rem" },
                        children: [
                          {
                            id: "comp-p1-title",
                            type: "Heading",
                            props: { text: "Strategy", level: "h3" },
                            styles: { fontSize: "1.35rem", fontWeight: "700", color: "#111111" },
                          },
                          {
                            id: "comp-p1-desc",
                            type: "Text",
                            props: { text: "Turn complex business challenges into clear, actionable direction." },
                            styles: { fontSize: "0.95rem", color: "#78716c" },
                          },
                        ],
                      },
                      // Practice 02
                      {
                        id: "comp-practice-2",
                        type: "Container",
                        props: { layout: "flex-col", gap: "0.5rem" },
                        styles: { borderTop: "1px solid #e7e5e4", paddingTop: "1.5rem" },
                        children: [
                          {
                            id: "comp-p2-title",
                            type: "Heading",
                            props: { text: "Digital Experiences", level: "h3" },
                            styles: { fontSize: "1.35rem", fontWeight: "700", color: "#111111" },
                          },
                          {
                            id: "comp-p2-desc",
                            type: "Text",
                            props: { text: "Create thoughtful digital experiences that move people to action." },
                            styles: { fontSize: "0.95rem", color: "#78716c" },
                          },
                        ],
                      },
                      // Practice 03
                      {
                        id: "comp-practice-3",
                        type: "Container",
                        props: { layout: "flex-col", gap: "0.5rem" },
                        styles: { borderTop: "1px solid #e7e5e4", paddingTop: "1.5rem" },
                        children: [
                          {
                            id: "comp-p3-title",
                            type: "Heading",
                            props: { text: "Creative Direction", level: "h3" },
                            styles: { fontSize: "1.35rem", fontWeight: "700", color: "#111111" },
                          },
                          {
                            id: "comp-p3-desc",
                            type: "Text",
                            props: { text: "Bring your brand, content, and customer experience together." },
                            styles: { fontSize: "0.95rem", color: "#78716c" },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          // 5. About
          {
            id: "sec-about",
            name: "05 — About Corporate Manifesto",
            type: "About",
            styles: {
              background: "#ffffff",
              paddingTop: "6.5rem",
              paddingBottom: "6.5rem",
              borderBottom: "1px solid #e7e5e4",
            },
            components: [
              {
                id: "comp-about-container",
                type: "Container",
                props: { layout: "grid-2", gap: "5rem", align: "items-center" },
                styles: { maxWidth: "1280px" },
                children: [
                  {
                    id: "comp-about-col-left",
                    type: "Container",
                    props: { layout: "flex-col" },
                    styles: {},
                    children: [
                      {
                        id: "comp-about-image",
                        type: "Image",
                        props: {
                          src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
                          alt: "Human interaction in clean strategic architectural consulting environment",
                          objectFit: "cover",
                          aspectRatio: "1/1",
                        },
                        styles: { borderRadius: "0px" },
                      },
                    ],
                  },
                  {
                    id: "comp-about-col-right",
                    type: "Container",
                    props: { layout: "flex-col", gap: "1.5rem" },
                    styles: {},
                    children: [
                      {
                        id: "comp-about-eyebrow",
                        type: "Text",
                        props: { text: "WHO WE ARE" },
                        styles: { fontSize: "0.75rem", fontWeight: "700", color: "#78716c" },
                      },
                      {
                        id: "comp-about-heading",
                        type: "Heading",
                        props: { text: "A team of strategic thinkers and makers.", level: "h2" },
                        styles: { fontSize: "2.25rem", fontWeight: "800", color: "#111111" },
                      },
                      {
                        id: "comp-about-text",
                        type: "Text",
                        props: { text: "We combine strategic thinking, thoughtful design, and modern technology to help growing businesses move forward with confidence." },
                        styles: { fontSize: "1rem", color: "#78716c" },
                      },
                      {
                        id: "comp-about-button",
                        type: "Button",
                        props: { label: "Learn More About Us", variant: "secondary", link: "#cta" },
                        styles: { color: "#111111", borderRadius: "0px" },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          // 6. Process
          {
            id: "sec-process",
            name: "06 — Dynamic Process Methodology",
            type: "Process",
            styles: {
              background: "#fcfcf9",
              paddingTop: "6.5rem",
              paddingBottom: "6.5rem",
              borderBottom: "1px solid #e7e5e4",
            },
            components: [
              {
                id: "comp-process-main",
                type: "Container",
                props: { layout: "flex-col", gap: "4rem" },
                styles: {},
                children: [
                  {
                    id: "comp-process-header",
                    type: "Container",
                    props: { layout: "flex-col", gap: "1rem" },
                    styles: {},
                    children: [
                      {
                        id: "comp-process-eyebrow",
                        type: "Text",
                        props: { text: "OUR METHODOLOGY" },
                        styles: { fontSize: "0.75rem", fontWeight: "700", color: "#78716c" },
                      },
                      {
                        id: "comp-process-heading",
                        type: "Heading",
                        props: { text: "Process", level: "h2" },
                        styles: { fontSize: "2.25rem", fontWeight: "800", color: "#111111" },
                      },
                    ],
                  },
                  {
                    id: "comp-process-grid",
                    type: "Container",
                    props: { layout: "grid-2", gap: "3rem" },
                    styles: {},
                    children: [
                      // Column Left: Step 1 & 2
                      {
                        id: "comp-process-col-1",
                        type: "Container",
                        props: { layout: "flex-col", gap: "3rem" },
                        styles: {},
                        children: [
                          {
                            id: "comp-step-1",
                            type: "Container",
                            props: { layout: "flex-col", gap: "0.5rem" },
                            styles: { borderTop: "1px solid #e7e5e4", paddingTop: "1.5rem" },
                            children: [
                              {
                                id: "comp-step1-num",
                                type: "Text",
                                props: { text: "01" },
                                styles: { fontSize: "0.875rem", fontWeight: "700", color: "#111111" },
                              },
                              {
                                id: "comp-step1-title",
                                type: "Heading",
                                props: { text: "Discover", level: "h3" },
                                styles: { fontSize: "1.25rem", fontWeight: "700", color: "#111111" },
                              },
                              {
                                id: "comp-step1-desc",
                                type: "Text",
                                props: { text: "Understand the challenge, opportunity, audience, and goals." },
                                styles: { fontSize: "0.95rem", color: "#78716c" },
                              },
                            ],
                          },
                          {
                            id: "comp-step-2",
                            type: "Container",
                            props: { layout: "flex-col", gap: "0.5rem" },
                            styles: { borderTop: "1px solid #e7e5e4", paddingTop: "1.5rem" },
                            children: [
                              {
                                id: "comp-step2-num",
                                type: "Text",
                                props: { text: "02" },
                                styles: { fontSize: "0.875rem", fontWeight: "700", color: "#111111" },
                              },
                              {
                                id: "comp-step2-title",
                                type: "Heading",
                                props: { text: "Define", level: "h3" },
                                styles: { fontSize: "1.25rem", fontWeight: "700", color: "#111111" },
                              },
                              {
                                id: "comp-step2-desc",
                                type: "Text",
                                props: { text: "Turn insight into a clear strategic direction." },
                                styles: { fontSize: "0.95rem", color: "#78716c" },
                              },
                            ],
                          },
                        ],
                      },
                      // Column Right: Step 3 & 4
                      {
                        id: "comp-process-col-2",
                        type: "Container",
                        props: { layout: "flex-col", gap: "3rem" },
                        styles: {},
                        children: [
                          {
                            id: "comp-step-3",
                            type: "Container",
                            props: { layout: "flex-col", gap: "0.5rem" },
                            styles: { borderTop: "1px solid #e7e5e4", paddingTop: "1.5rem" },
                            children: [
                              {
                                id: "comp-step3-num",
                                type: "Text",
                                props: { text: "03" },
                                styles: { fontSize: "0.875rem", fontWeight: "700", color: "#111111" },
                              },
                              {
                                id: "comp-step3-title",
                                type: "Heading",
                                props: { text: "Create", level: "h3" },
                                styles: { fontSize: "1.25rem", fontWeight: "700", color: "#111111" },
                              },
                              {
                                id: "comp-step3-desc",
                                type: "Text",
                                props: { text: "Build the experience, system, or solution." },
                                styles: { fontSize: "0.95rem", color: "#78716c" },
                              },
                            ],
                          },
                          {
                            id: "comp-step-4",
                            type: "Container",
                            props: { layout: "flex-col", gap: "0.5rem" },
                            styles: { borderTop: "1px solid #e7e5e4", paddingTop: "1.5rem" },
                            children: [
                              {
                                id: "comp-step4-num",
                                type: "Text",
                                props: { text: "04" },
                                styles: { fontSize: "0.875rem", fontWeight: "700", color: "#111111" },
                              },
                              {
                                id: "comp-step4-title",
                                type: "Heading",
                                props: { text: "Refine", level: "h3" },
                                styles: { fontSize: "1.25rem", fontWeight: "700", color: "#111111" },
                              },
                              {
                                id: "comp-step4-desc",
                                type: "Text",
                                props: { text: "Test, improve, and prepare everything for launch." },
                                styles: { fontSize: "0.95rem", color: "#78716c" },
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
          },
          // 7. Featured Work
          {
            id: "sec-work",
            name: "07 — Selected Featured Project",
            type: "Featured Work",
            styles: {
              background: "#ffffff",
              paddingTop: "6.5rem",
              paddingBottom: "6.5rem",
              borderBottom: "1px solid #e7e5e4",
            },
            components: [
              {
                id: "comp-work-container",
                type: "Container",
                props: { layout: "flex-col", gap: "3rem" },
                styles: {},
                children: [
                  {
                    id: "comp-work-header",
                    type: "Container",
                    props: { layout: "flex-col", gap: "1rem" },
                    styles: {},
                    children: [
                      {
                        id: "comp-work-eyebrow",
                        type: "Text",
                        props: { text: "FEATURED WORK" },
                        styles: { fontSize: "0.75rem", fontWeight: "700", color: "#78716c" },
                      },
                      {
                        id: "comp-work-heading",
                        type: "Heading",
                        props: { text: "The New Standard", level: "h2" },
                        styles: { fontSize: "2.25rem", fontWeight: "800", color: "#111111" },
                      },
                    ],
                  },
                  {
                    id: "comp-work-image",
                    type: "Image",
                    props: {
                      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
                      alt: "Premium minimalist architecture design structure representing physical and digital strategy",
                      objectFit: "cover",
                      aspectRatio: "16/9",
                    },
                    styles: { borderRadius: "0px" },
                  },
                  {
                    id: "comp-work-desc",
                    type: "Container",
                    props: { layout: "grid-2", gap: "3rem" },
                    styles: {},
                    children: [
                      {
                        id: "comp-work-desc-left",
                        type: "Heading",
                        props: { text: "Global Strategy & Digital Identity overhaul for a leading sustainable design framework.", level: "h3" },
                        styles: { fontSize: "1.25rem", fontWeight: "600", color: "#111111" },
                      },
                      {
                        id: "comp-work-desc-right",
                        type: "Text",
                        props: { text: "A comprehensive project aligning visual elements, core business strategy, and internal scalable digital operations for premium global visibility." },
                        styles: { fontSize: "0.95rem", color: "#78716c" },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          // 8. Testimonial
          {
            id: "sec-testimonial",
            name: "08 — Client Quote",
            type: "Testimonial",
            styles: {
              background: "#fcfcf9",
              paddingTop: "6.5rem",
              paddingBottom: "6.5rem",
              borderBottom: "1px solid #e7e5e4",
            },
            components: [
              {
                id: "comp-testimonial-container",
                type: "Container",
                props: { layout: "flex-col", gap: "2rem" },
                styles: { maxWidth: "800px", margin: "0 auto", textAlign: "center" },
                children: [
                  {
                    id: "comp-testimonial-eyebrow",
                    type: "Text",
                    props: { text: "CLIENT SUCCESS" },
                    styles: { fontSize: "0.75rem", fontWeight: "700", color: "#78716c", textAlign: "center" },
                  },
                  {
                    id: "comp-testimonial-quote",
                    type: "Heading",
                    props: { text: "\"Northstar helped us turn a complicated business challenge into a clear and actionable plan.\"", level: "h2" },
                    styles: { fontSize: "2rem", fontWeight: "500", lineHeight: "1.4", color: "#111111", textAlign: "center" },
                  },
                  {
                    id: "comp-testimonial-author",
                    type: "Text",
                    props: { text: "— Maya Chen, Founder" },
                    styles: { fontSize: "0.95rem", fontWeight: "600", color: "#78716c", textAlign: "center" },
                  },
                ],
              },
            ],
          },
          // 9. CTA (Call To Action)
          {
            id: "sec-cta",
            name: "09 — Primary CTA",
            type: "CTA",
            styles: {
              background: "#111111", // Pitch black high-contrast background
              paddingTop: "8rem",
              paddingBottom: "8rem",
            },
            components: [
              {
                id: "comp-cta-container",
                type: "Container",
                props: { layout: "flex-col", gap: "2rem" },
                styles: { textAlign: "center", maxWidth: "800px", margin: "0 auto" },
                children: [
                  {
                    id: "comp-cta-heading",
                    type: "Heading",
                    props: { text: "Let's build something better.", level: "h2" },
                    styles: { fontSize: "3rem", fontWeight: "800", color: "#ffffff", textAlign: "center" },
                  },
                  {
                    id: "comp-cta-text",
                    type: "Text",
                    props: { text: "Reach out to start a conversation about your strategy, brand, or digital platform." },
                    styles: { fontSize: "1.125rem", color: "#78716c", textAlign: "center" },
                  },
                  {
                    id: "comp-cta-btn-container",
                    type: "Container",
                    props: { layout: "flex-row", gap: "1rem", justify: "justify-center" },
                    styles: { marginTop: "1rem" },
                    children: [
                      {
                        id: "comp-cta-button",
                        type: "Button",
                        props: { label: "Work together", variant: "primary", link: "mailto:hello@northstar.studio" },
                        styles: { background: "#ffffff", color: "#111111", borderRadius: "0px" },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          // 10. Footer
          {
            id: "sec-footer",
            name: "10 — Site Footer",
            type: "Footer",
            styles: {
              background: "#111111",
              paddingTop: "4rem",
              paddingBottom: "4rem",
              borderTop: "1px solid #1c1917",
            },
            components: [
              {
                id: "comp-footer-container",
                type: "Container",
                props: { layout: "flex-col", gap: "2.5rem" },
                styles: { maxWidth: "1280px" },
                children: [
                  {
                    id: "comp-footer-top",
                    type: "Container",
                    props: { layout: "flex-row", justify: "justify-between", align: "items-start" },
                    styles: {},
                    children: [
                      {
                        id: "comp-footer-logo",
                        type: "Logo",
                        props: { text: "NORTHSTAR STUDIO" },
                        styles: { color: "#ffffff", fontSize: "1rem", fontWeight: "700" },
                      },
                      {
                        id: "comp-footer-text",
                        type: "Text",
                        props: { text: "© 2026 Northstar Studio. Operating Globally." },
                        styles: { color: "#78716c", fontSize: "0.875rem" },
                      },
                    ],
                  },
                  {
                    id: "comp-footer-divider",
                    type: "Divider",
                    props: {},
                    styles: { borderTop: "1px solid #1c1917" },
                  },
                  {
                    id: "comp-footer-bottom",
                    type: "Text",
                    props: { text: "Premium website crafted for Northstar Studio. All rights reserved. Created in Copenhagen." },
                    styles: { color: "#78716c", fontSize: "0.75rem", textAlign: "center" },
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
