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
      h1: "4.5rem",
      h2: "3rem",
      h3: "1.5rem",
      p: "1.125rem",
      small: "0.75rem",
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
            name: "Navigation",
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
                    styles: { fontSize: "0.875rem", fontWeight: "700", color: "#111111", letterSpacing: "0.05em" },
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
                    styles: { borderRadius: "0px", color: "#111111", fontSize: "0.75rem", letterSpacing: "0.05em" },
                  },
                ],
              },
            ],
          },
          // 2. Hero Section
          {
            id: "sec-hero",
            name: "Hero",
            type: "Hero",
            styles: {
              background: "#fcfcf9",
              paddingTop: "8rem",
              paddingBottom: "8rem",
            },
            components: [
              {
                id: "comp-hero-container",
                type: "Container",
                props: { layout: "grid-2", gap: "6rem", align: "items-center" },
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
                        props: { text: "INDEPENDENT CONSULTING" },
                        styles: { fontSize: "0.75rem", fontWeight: "600", color: "#78716c", letterSpacing: "0.1em", textTransform: "uppercase" },
                      },
                      {
                        id: "comp-hero-heading",
                        type: "Heading",
                        props: { text: "Build a business ready for what comes next.", level: "h1" },
                        styles: { fontSize: "4.5rem", lineHeight: "1.05", fontWeight: "500", color: "#111111", letterSpacing: "-0.02em" },
                      },
                      {
                        id: "comp-hero-text",
                        type: "Text",
                        props: { text: "We help ambitious companies clarify their direction, strengthen their digital presence, and build systems that scale." },
                        styles: { fontSize: "1.25rem", color: "#78716c", lineHeight: "1.6" },
                      },
                      {
                        id: "comp-hero-btn-container",
                        type: "Container",
                        props: { layout: "flex-row", gap: "1rem" },
                        styles: { marginTop: "1rem" },
                        children: [
                          {
                            id: "comp-hero-btn-primary",
                            type: "Button",
                            props: { label: "Connect with us", variant: "primary", link: "#cta" },
                            styles: { background: "#111111", color: "#ffffff", borderRadius: "0px", fontSize: "0.75rem", letterSpacing: "0.05em" },
                          },
                          {
                            id: "comp-hero-btn-secondary",
                            type: "Button",
                            props: { label: "Our capabilities", variant: "secondary", link: "#services" },
                            styles: { color: "#111111", borderRadius: "0px", fontSize: "0.75rem", letterSpacing: "0.05em" },
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
                          aspectRatio: "3/4",
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
            name: "Philosophy",
            type: "Trust",
            styles: {
              background: "#ffffff",
              paddingTop: "10rem",
              paddingBottom: "10rem",
              borderBottom: "1px solid #e7e5e4",
              borderTop: "1px solid #e7e5e4",
            },
            components: [
              {
                id: "comp-trust-container",
                type: "Container",
                props: { layout: "grid-2", gap: "2rem" },
                styles: { maxWidth: "1280px" },
                children: [
                  {
                    id: "comp-trust-left",
                    type: "Text",
                    props: { text: "OUR BELIEF" },
                    styles: { fontSize: "0.75rem", fontWeight: "600", color: "#78716c", letterSpacing: "0.1em", textTransform: "uppercase" },
                  },
                  {
                    id: "comp-trust-right",
                    type: "Container",
                    props: { layout: "flex-col", gap: "2rem" },
                    styles: {},
                    children: [
                      {
                        id: "comp-trust-quote",
                        type: "Heading",
                        props: { text: "We believe the future belongs to companies that can navigate complexity with clarity and absolute intent.", level: "h2" },
                        styles: { fontSize: "3rem", fontWeight: "400", lineHeight: "1.2", color: "#111111", letterSpacing: "-0.01em" },
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
            name: "Services",
            type: "Services",
            styles: {
              background: "#fcfcf9",
              paddingTop: "8rem",
              paddingBottom: "8rem",
            },
            components: [
              {
                id: "comp-services-container",
                type: "Container",
                props: { layout: "grid-2", gap: "6rem" },
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
                        styles: { fontSize: "0.75rem", fontWeight: "600", color: "#78716c", letterSpacing: "0.1em", textTransform: "uppercase" },
                      },
                      {
                        id: "comp-services-heading",
                        type: "Heading",
                        props: { text: "Our Practices", level: "h2" },
                        styles: { fontSize: "2.5rem", fontWeight: "500", color: "#111111", letterSpacing: "-0.01em" },
                      },
                    ],
                  },
                  {
                    id: "comp-services-col-right",
                    type: "Container",
                    props: { layout: "flex-col", gap: "0" },
                    styles: {},
                    children: [
                      // Practice 01
                      {
                        id: "comp-practice-1",
                        type: "Container",
                        props: { layout: "flex-col", gap: "0.75rem" },
                        styles: { borderTop: "1px solid #e7e5e4", paddingTop: "2rem", paddingBottom: "2rem" },
                        children: [
                          {
                            id: "comp-p1-num",
                            type: "Text",
                            props: { text: "01" },
                            styles: { fontSize: "0.75rem", color: "#78716c", letterSpacing: "0.05em", fontWeight: "600" },
                          },
                          {
                            id: "comp-p1-title",
                            type: "Heading",
                            props: { text: "STRATEGY", level: "h3" },
                            styles: { fontSize: "1.25rem", fontWeight: "600", color: "#111111", letterSpacing: "0.05em" },
                          },
                          {
                            id: "comp-p1-desc",
                            type: "Text",
                            props: { text: "Turn complex challenges into clear, actionable direction." },
                            styles: { fontSize: "1rem", color: "#78716c", marginTop: "0.5rem" },
                          },
                        ],
                      },
                      // Practice 02
                      {
                        id: "comp-practice-2",
                        type: "Container",
                        props: { layout: "flex-col", gap: "0.75rem" },
                        styles: { borderTop: "1px solid #e7e5e4", paddingTop: "2rem", paddingBottom: "2rem" },
                        children: [
                          {
                            id: "comp-p2-num",
                            type: "Text",
                            props: { text: "02" },
                            styles: { fontSize: "0.75rem", color: "#78716c", letterSpacing: "0.05em", fontWeight: "600" },
                          },
                          {
                            id: "comp-p2-title",
                            type: "Heading",
                            props: { text: "DIGITAL EXPERIENCES", level: "h3" },
                            styles: { fontSize: "1.25rem", fontWeight: "600", color: "#111111", letterSpacing: "0.05em" },
                          },
                          {
                            id: "comp-p2-desc",
                            type: "Text",
                            props: { text: "Create thoughtful digital experiences that move people to action." },
                            styles: { fontSize: "1rem", color: "#78716c", marginTop: "0.5rem" },
                          },
                        ],
                      },
                      // Practice 03
                      {
                        id: "comp-practice-3",
                        type: "Container",
                        props: { layout: "flex-col", gap: "0.75rem" },
                        styles: { borderTop: "1px solid #e7e5e4", paddingTop: "2rem", paddingBottom: "2rem", borderBottom: "1px solid #e7e5e4" },
                        children: [
                          {
                            id: "comp-p3-num",
                            type: "Text",
                            props: { text: "03" },
                            styles: { fontSize: "0.75rem", color: "#78716c", letterSpacing: "0.05em", fontWeight: "600" },
                          },
                          {
                            id: "comp-p3-title",
                            type: "Heading",
                            props: { text: "CREATIVE DIRECTION", level: "h3" },
                            styles: { fontSize: "1.25rem", fontWeight: "600", color: "#111111", letterSpacing: "0.05em" },
                          },
                          {
                            id: "comp-p3-desc",
                            type: "Text",
                            props: { text: "Bring your brand, content, and customer experience together." },
                            styles: { fontSize: "1rem", color: "#78716c", marginTop: "0.5rem" },
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
            name: "About",
            type: "About",
            styles: {
              background: "#ffffff",
              paddingTop: "8rem",
              paddingBottom: "8rem",
            },
            components: [
              {
                id: "comp-about-container",
                type: "Container",
                props: { layout: "grid-2", gap: "6rem", align: "items-center" },
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
                          aspectRatio: "4/5",
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
                        styles: { fontSize: "0.75rem", fontWeight: "600", color: "#78716c", letterSpacing: "0.1em", textTransform: "uppercase" },
                      },
                      {
                        id: "comp-about-heading",
                        type: "Heading",
                        props: { text: "We combine strategic thinking, thoughtful design, and modern technology to help growing businesses move forward with confidence.", level: "h2" },
                        styles: { fontSize: "2rem", fontWeight: "400", color: "#111111", lineHeight: "1.4", letterSpacing: "-0.01em" },
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
            name: "Process",
            type: "Process",
            styles: {
              background: "#fcfcf9",
              paddingTop: "8rem",
              paddingBottom: "8rem",
              borderTop: "1px solid #e7e5e4",
            },
            components: [
              {
                id: "comp-process-main",
                type: "Container",
                props: { layout: "grid-2", gap: "6rem" },
                styles: { maxWidth: "1280px" },
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
                        styles: { fontSize: "0.75rem", fontWeight: "600", color: "#78716c", letterSpacing: "0.1em", textTransform: "uppercase" },
                      },
                      {
                        id: "comp-process-heading",
                        type: "Heading",
                        props: { text: "Process", level: "h2" },
                        styles: { fontSize: "2.5rem", fontWeight: "500", color: "#111111", letterSpacing: "-0.01em" },
                      },
                    ],
                  },
                  {
                    id: "comp-process-grid",
                    type: "Container",
                    props: { layout: "grid-2", gap: "3rem" },
                    styles: {},
                    children: [
                      // Step 1
                      {
                        id: "comp-step-1",
                        type: "Container",
                        props: { layout: "flex-col", gap: "0.5rem" },
                        styles: { borderTop: "1px solid #111111", paddingTop: "1.5rem" },
                        children: [
                          {
                            id: "comp-step1-title",
                            type: "Heading",
                            props: { text: "01 — Discover", level: "h3" },
                            styles: { fontSize: "1rem", fontWeight: "600", color: "#111111", letterSpacing: "0.05em", textTransform: "uppercase" },
                          },
                          {
                            id: "comp-step1-desc",
                            type: "Text",
                            props: { text: "Understand the challenge, opportunity, audience, and goals." },
                            styles: { fontSize: "1rem", color: "#78716c", marginTop: "0.25rem" },
                          },
                        ],
                      },
                      // Step 2
                      {
                        id: "comp-step-2",
                        type: "Container",
                        props: { layout: "flex-col", gap: "0.5rem" },
                        styles: { borderTop: "1px solid #111111", paddingTop: "1.5rem" },
                        children: [
                          {
                            id: "comp-step2-title",
                            type: "Heading",
                            props: { text: "02 — Define", level: "h3" },
                            styles: { fontSize: "1rem", fontWeight: "600", color: "#111111", letterSpacing: "0.05em", textTransform: "uppercase" },
                          },
                          {
                            id: "comp-step2-desc",
                            type: "Text",
                            props: { text: "Turn insight into a clear strategic direction." },
                            styles: { fontSize: "1rem", color: "#78716c", marginTop: "0.25rem" },
                          },
                        ],
                      },
                      // Step 3
                      {
                        id: "comp-step-3",
                        type: "Container",
                        props: { layout: "flex-col", gap: "0.5rem" },
                        styles: { borderTop: "1px solid #111111", paddingTop: "1.5rem" },
                        children: [
                          {
                            id: "comp-step3-title",
                            type: "Heading",
                            props: { text: "03 — Create", level: "h3" },
                            styles: { fontSize: "1rem", fontWeight: "600", color: "#111111", letterSpacing: "0.05em", textTransform: "uppercase" },
                          },
                          {
                            id: "comp-step3-desc",
                            type: "Text",
                            props: { text: "Build the experience, system, or solution." },
                            styles: { fontSize: "1rem", color: "#78716c", marginTop: "0.25rem" },
                          },
                        ],
                      },
                      // Step 4
                      {
                        id: "comp-step-4",
                        type: "Container",
                        props: { layout: "flex-col", gap: "0.5rem" },
                        styles: { borderTop: "1px solid #111111", paddingTop: "1.5rem" },
                        children: [
                          {
                            id: "comp-step4-title",
                            type: "Heading",
                            props: { text: "04 — Refine", level: "h3" },
                            styles: { fontSize: "1rem", fontWeight: "600", color: "#111111", letterSpacing: "0.05em", textTransform: "uppercase" },
                          },
                          {
                            id: "comp-step4-desc",
                            type: "Text",
                            props: { text: "Test, improve, and prepare everything for launch." },
                            styles: { fontSize: "1rem", color: "#78716c", marginTop: "0.25rem" },
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
            name: "Featured Work",
            type: "Featured Work",
            styles: {
              background: "#ffffff",
              paddingTop: "8rem",
              paddingBottom: "8rem",
            },
            components: [
              {
                id: "comp-work-container",
                type: "Container",
                props: { layout: "flex-col", gap: "4rem" },
                styles: { maxWidth: "1280px" },
                children: [
                  {
                    id: "comp-work-image",
                    type: "Image",
                    props: {
                      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
                      alt: "Premium minimalist architecture design structure representing physical and digital strategy",
                      objectFit: "cover",
                      aspectRatio: "16/9",
                    },
                    styles: { borderRadius: "0px" },
                  },
                  {
                    id: "comp-work-desc",
                    type: "Container",
                    props: { layout: "grid-2", gap: "4rem" },
                    styles: {},
                    children: [
                      {
                        id: "comp-work-desc-left",
                        type: "Heading",
                        props: { text: "THE NEW STANDARD", level: "h3" },
                        styles: { fontSize: "0.75rem", fontWeight: "600", color: "#111111", letterSpacing: "0.1em", textTransform: "uppercase" },
                      },
                      {
                        id: "comp-work-desc-right",
                        type: "Text",
                        props: { text: "Sustainable design strategy" },
                        styles: { fontSize: "1.5rem", color: "#111111", fontWeight: "400", letterSpacing: "-0.01em" },
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
            name: "Testimonial",
            type: "Testimonial",
            styles: {
              background: "#fcfcf9",
              paddingTop: "12rem",
              paddingBottom: "12rem",
            },
            components: [
              {
                id: "comp-testimonial-container",
                type: "Container",
                props: { layout: "flex-col", gap: "3rem" },
                styles: { maxWidth: "900px", margin: "0 auto", textAlign: "center" },
                children: [
                  {
                    id: "comp-testimonial-quote",
                    type: "Heading",
                    props: { text: "\"Northstar helped us turn a complicated business challenge into a clear and actionable plan.\"", level: "h2" },
                    styles: { fontSize: "2.5rem", fontWeight: "400", lineHeight: "1.3", color: "#111111", letterSpacing: "-0.01em", textAlign: "center" },
                  },
                  {
                    id: "comp-testimonial-author",
                    type: "Text",
                    props: { text: "— Maya Chen, Founder" },
                    styles: { fontSize: "0.75rem", fontWeight: "600", color: "#78716c", letterSpacing: "0.1em", textTransform: "uppercase", textAlign: "center" },
                  },
                ],
              },
            ],
          },
          // 9. CTA
          {
            id: "sec-cta",
            name: "CTA",
            type: "CTA",
            styles: {
              background: "#111111", // Pitch black
              paddingTop: "10rem",
              paddingBottom: "10rem",
            },
            components: [
              {
                id: "comp-cta-container",
                type: "Container",
                props: { layout: "flex-col", gap: "3rem" },
                styles: { textAlign: "center", maxWidth: "800px", margin: "0 auto" },
                children: [
                  {
                    id: "comp-cta-heading",
                    type: "Heading",
                    props: { text: "Let's build something better.", level: "h2" },
                    styles: { fontSize: "4rem", fontWeight: "500", color: "#ffffff", textAlign: "center", letterSpacing: "-0.02em", lineHeight: "1.1" },
                  },
                  {
                    id: "comp-cta-btn-container",
                    type: "Container",
                    props: { layout: "flex-row", justify: "justify-center" },
                    styles: {},
                    children: [
                      {
                        id: "comp-cta-button",
                        type: "Button",
                        props: { label: "Work together", variant: "primary", link: "mailto:hello@northstar.studio" },
                        styles: { background: "#ffffff", color: "#111111", borderRadius: "0px", fontSize: "0.75rem", letterSpacing: "0.05em" },
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
            name: "Footer",
            type: "Footer",
            styles: {
              background: "#ffffff",
              paddingTop: "4rem",
              paddingBottom: "4rem",
            },
            components: [
              {
                id: "comp-footer-container",
                type: "Container",
                props: { layout: "flex-col", gap: "4rem" },
                styles: { maxWidth: "1280px" },
                children: [
                  {
                    id: "comp-footer-top",
                    type: "Container",
                    props: { layout: "grid-2", gap: "4rem" },
                    styles: {},
                    children: [
                      {
                        id: "comp-footer-logo-col",
                        type: "Container",
                        props: { layout: "flex-col", gap: "0.5rem" },
                        styles: {},
                        children: [
                          {
                            id: "comp-footer-logo",
                            type: "Logo",
                            props: { text: "NORTHSTAR STUDIO" },
                            styles: { color: "#111111", fontSize: "0.875rem", fontWeight: "700", letterSpacing: "0.05em" },
                          },
                          {
                            id: "comp-footer-text",
                            type: "Text",
                            props: { text: "Strategy for what's next." },
                            styles: { color: "#78716c", fontSize: "0.875rem" },
                          },
                        ],
                      },
                      {
                        id: "comp-footer-contact-col",
                        type: "Container",
                        props: { layout: "grid-2", gap: "2rem" },
                        styles: {},
                        children: [
                          {
                            id: "comp-footer-col-1",
                            type: "Container",
                            props: { layout: "flex-col", gap: "0.25rem" },
                            styles: {},
                            children: [
                              {
                                id: "comp-footer-email",
                                type: "Text",
                                props: { text: "hello@northstar.studio" },
                                styles: { color: "#111111", fontSize: "0.875rem" },
                              },
                              {
                                id: "comp-footer-phone",
                                type: "Text",
                                props: { text: "+1 (555) 000-0000" },
                                styles: { color: "#111111", fontSize: "0.875rem" },
                              },
                            ],
                          },
                          {
                            id: "comp-footer-col-2",
                            type: "Container",
                            props: { layout: "flex-col", gap: "0.25rem" },
                            styles: {},
                            children: [
                              {
                                id: "comp-footer-address",
                                type: "Text",
                                props: { text: "Global Operations" },
                                styles: { color: "#111111", fontSize: "0.875rem" },
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "comp-footer-bottom",
                    type: "Container",
                    props: { layout: "flex-col", gap: "1rem" },
                    styles: {},
                    children: [
                      {
                        id: "comp-footer-divider",
                        type: "Divider",
                        props: {},
                        styles: { borderTop: "1px solid #e7e5e4", marginTop: "0", marginBottom: "0" },
                      },
                      {
                        id: "comp-footer-copyright",
                        type: "Text",
                        props: { text: "© 2026 Northstar Studio. All rights reserved." },
                        styles: { color: "#78716c", fontSize: "0.75rem" },
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
