import { Project, Theme } from "@/types/builder";

export const defaultTheme: Theme = {
  colors: {
    primary: "#171717",
    secondary: "#4f46e5",
    background: "#ffffff",
    surface: "#f9fafb",
    text: "#1f2937",
    muted: "#4b5563",
    border: "#e5e7eb",
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
  radius: "0.5rem",
  spacing: {
    sectionPadding: "6rem",
  },
};

export const createDefaultProject = (): Project => {
  return {
    id: "demo-project",
    name: "My Custom Website",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    theme: defaultTheme,
    pages: [
      {
        id: "home-page",
        name: "Home",
        path: "/",
        sections: [
          // 1. Navigation
          {
            id: "sec-nav",
            name: "Header Navigation",
            type: "Navigation",
            styles: {
              background: "#ffffff",
              paddingTop: "1.25rem",
              paddingBottom: "1.25rem",
              borderBottom: "1px solid #e5e7eb",
              maxWidth: "1280px",
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
                    props: { text: "Apex Agency" },
                    styles: { fontSize: "1.25rem", fontWeight: "700" },
                  },
                  {
                    id: "comp-nav-links",
                    type: "NavLinks",
                    props: {
                      links: [
                        { label: "Services", href: "#services" },
                        { label: "About", href: "#about" },
                        { label: "Work", href: "#work" },
                      ],
                    },
                    styles: {},
                  },
                  {
                    id: "comp-nav-btn",
                    type: "Button",
                    props: { label: "Get Started", variant: "primary", link: "#cta" },
                    styles: {},
                  },
                ],
              },
            ],
          },
          // 2. Hero Section
          {
            id: "sec-hero",
            name: "Hero Section",
            type: "Hero",
            styles: {
              background: "#f9fafb",
              paddingTop: "6rem",
              paddingBottom: "6rem",
            },
            components: [
              {
                id: "comp-hero-container",
                type: "Container",
                props: { layout: "grid-2", gap: "3rem" },
                styles: { maxWidth: "1280px" },
                children: [
                  {
                    id: "comp-hero-col-left",
                    type: "Container",
                    props: { layout: "flex-col", gap: "1.5rem" },
                    styles: {},
                    children: [
                      {
                        id: "comp-hero-heading",
                        type: "Heading",
                        props: { text: "We Build Digital Products That Scale", level: "h1" },
                        styles: { fontSize: "3.75rem", lineHeight: "1.1", fontWeight: "800" },
                      },
                      {
                        id: "comp-hero-text",
                        type: "Text",
                        props: { text: "A design-driven team crafting beautiful digital experiences, custom websites, and highly optimized platforms for ambitious modern brands." },
                        styles: { fontSize: "1.125rem", color: "#4b5563" },
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
                            props: { label: "View Our Services", variant: "primary", link: "#services" },
                            styles: {},
                          },
                          {
                            id: "comp-hero-btn-secondary",
                            type: "Button",
                            props: { label: "Read Our Story", variant: "secondary", link: "#about" },
                            styles: {},
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
                          src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
                          alt: "Office Dashboard",
                          objectFit: "cover",
                          aspectRatio: "16/10",
                        },
                        styles: { borderRadius: "0.75rem" },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          // 3. Services Section
          {
            id: "sec-services",
            name: "Services Section",
            type: "Services",
            styles: {
              background: "#ffffff",
              paddingTop: "6rem",
              paddingBottom: "6rem",
            },
            components: [
              {
                id: "comp-services-container",
                type: "Container",
                props: { layout: "flex-col", gap: "4rem" },
                styles: { maxWidth: "1280px" },
                children: [
                  {
                    id: "comp-services-header",
                    type: "Container",
                    props: { layout: "flex-col", gap: "1rem" },
                    styles: { textAlign: "center", maxWidth: "600px", margin: "0 auto" },
                    children: [
                      {
                        id: "comp-services-heading",
                        type: "Heading",
                        props: { text: "What We Excel At", level: "h2" },
                        styles: { fontSize: "2.25rem", fontWeight: "700" },
                      },
                      {
                        id: "comp-services-subtext",
                        type: "Text",
                        props: { text: "We combine engineering excellence with world-class design to help your business flourish in the digital world." },
                        styles: { fontSize: "1rem", color: "#4b5563" },
                      },
                    ],
                  },
                  {
                    id: "comp-services-grid",
                    type: "Container",
                    props: { layout: "grid-3", gap: "2rem" },
                    styles: {},
                    children: [
                      {
                        id: "comp-service-card-1",
                        type: "Card",
                        props: { padding: "2rem", bg: "#f9fafb" },
                        styles: { borderRadius: "0.75rem", border: "1px solid #e5e7eb" },
                        children: [
                          {
                            id: "comp-service-card-1-heading",
                            type: "Heading",
                            props: { text: "Web Design", level: "h3" },
                            styles: { fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.75rem" },
                          },
                          {
                            id: "comp-service-card-1-text",
                            type: "Text",
                            props: { text: "Responsive, custom-built websites crafted with deep strategic intent to engage visitors and drive higher conversion rates." },
                            styles: { fontSize: "0.95rem", color: "#4b5563" },
                          },
                        ],
                      },
                      {
                        id: "comp-service-card-2",
                        type: "Card",
                        props: { padding: "2rem", bg: "#f9fafb" },
                        styles: { borderRadius: "0.75rem", border: "1px solid #e5e7eb" },
                        children: [
                          {
                            id: "comp-service-card-2-heading",
                            type: "Heading",
                            props: { text: "Brand Identity", level: "h3" },
                            styles: { fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.75rem" },
                          },
                          {
                            id: "comp-service-card-2-text",
                            type: "Text",
                            props: { text: "Defining visual languages, unique style kits, typographic scales, and assets that position your brand ahead of the curve." },
                            styles: { fontSize: "0.95rem", color: "#4b5563" },
                          },
                        ],
                      },
                      {
                        id: "comp-service-card-3",
                        type: "Card",
                        props: { padding: "2rem", bg: "#f9fafb" },
                        styles: { borderRadius: "0.75rem", border: "1px solid #e5e7eb" },
                        children: [
                          {
                            id: "comp-service-card-3-heading",
                            type: "Heading",
                            props: { text: "Custom Software", level: "h3" },
                            styles: { fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.75rem" },
                          },
                          {
                            id: "comp-service-card-3-text",
                            type: "Text",
                            props: { text: "Bespoke web applications designed with scalability, extreme speed, robust security, and absolute maintainability in mind." },
                            styles: { fontSize: "0.95rem", color: "#4b5563" },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          // 4. About Section
          {
            id: "sec-about",
            name: "About Section",
            type: "About",
            styles: {
              background: "#f9fafb",
              paddingTop: "6rem",
              paddingBottom: "6rem",
            },
            components: [
              {
                id: "comp-about-container",
                type: "Container",
                props: { layout: "grid-2", gap: "4rem", align: "items-center" },
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
                          src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
                          alt: "Collaborative Team Work",
                          objectFit: "cover",
                          aspectRatio: "1/1",
                        },
                        styles: { borderRadius: "0.75rem" },
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
                        id: "comp-about-heading",
                        type: "Heading",
                        props: { text: "We Are Guided By Design Excellence", level: "h2" },
                        styles: { fontSize: "2.25rem", fontWeight: "700" },
                      },
                      {
                        id: "comp-about-text",
                        type: "Text",
                        props: { text: "Founded in 2021, Apex Agency was built on a simple conviction: design isn't just how something looks, it's how it works. We operate at the intersection of stunning visuals and flawless code to build digital homes that amplify our client's stories." },
                        styles: { fontSize: "1rem", color: "#4b5563" },
                      },
                      {
                        id: "comp-about-button",
                        type: "Button",
                        props: { label: "Learn More About Us", variant: "secondary", link: "#about" },
                        styles: {},
                      },
                    ],
                  },
                ],
              },
            ],
          },
          // 5. CTA Section
          {
            id: "sec-cta",
            name: "Call to Action Section",
            type: "CTA",
            styles: {
              background: "#4f46e5",
              paddingTop: "6rem",
              paddingBottom: "6rem",
            },
            components: [
              {
                id: "comp-cta-container",
                type: "Container",
                props: { layout: "flex-col", gap: "1.5rem" },
                styles: { textAlign: "center", maxWidth: "800px", margin: "0 auto" },
                children: [
                  {
                    id: "comp-cta-heading",
                    type: "Heading",
                    props: { text: "Ready to elevate your online footprint?", level: "h2" },
                    styles: { fontSize: "2.25rem", fontWeight: "700", color: "#ffffff" },
                  },
                  {
                    id: "comp-cta-text",
                    type: "Text",
                    props: { text: "Let's work together to create a website that represents your brand perfectly and moves your clients to action." },
                    styles: { fontSize: "1.125rem", color: "#e0e7ff" },
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
                        props: { label: "Let's Work Together", variant: "primary", link: "mailto:hello@apex.agency" },
                        styles: { background: "#ffffff", color: "#4f46e5", hoverBg: "#f3f4f6" },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          // 6. Footer Section
          {
            id: "sec-footer",
            name: "Footer Section",
            type: "Footer",
            styles: {
              background: "#111827",
              paddingTop: "4rem",
              paddingBottom: "4rem",
              borderTop: "1px solid #374151",
            },
            components: [
              {
                id: "comp-footer-container",
                type: "Container",
                props: { layout: "flex-col", gap: "2rem" },
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
                        props: { text: "Apex Agency" },
                        styles: { color: "#ffffff", fontSize: "1.25rem", fontWeight: "700" },
                      },
                      {
                        id: "comp-footer-text",
                        type: "Text",
                        props: { text: "© 2026 Apex Agency. All rights reserved." },
                        styles: { color: "#9ca3af", fontSize: "0.875rem" },
                      },
                    ],
                  },
                  {
                    id: "comp-footer-divider",
                    type: "Divider",
                    props: {},
                    styles: { borderTop: "1px solid #374151" },
                  },
                  {
                    id: "comp-footer-bottom",
                    type: "Text",
                    props: { text: "A stunning predefined design ready to scale up your brand and clients. Created using the Web Page Design System." },
                    styles: { color: "#6b7280", fontSize: "0.75rem", textAlign: "center" },
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
