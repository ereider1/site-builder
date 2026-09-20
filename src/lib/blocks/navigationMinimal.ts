import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createNavigationMinimalBlock = (): Section => {
  const containerId = generateId("comp-container");
  
  const innerContainerId = generateId("comp-container");
  const logoId = generateId("comp-logo");
  const linksId = generateId("comp-navlinks");
  const btnId = generateId("comp-btn");

  return {
    id: generateId("sec-nav-minimal"),
    name: "Navigation — Minimal",
    type: "Header",
    blockId: "navigation-minimal",
    styles: {
      background: "var(--background-color)",
      paddingTop: "1.5rem", // Slim, elegant header heights
      paddingBottom: "1.5rem",
      borderBottom: "1px solid var(--border-color)",
    },
    // Explicit content-slot mappings
    contentSlots: [
      { componentId: logoId, property: "text", source: "business.name" },
    ],
    components: [
      {
        id: containerId,
        type: "Container",
        props: { layout: "flex-col" },
        styles: { maxWidth: "1280px" },
        children: [
          {
            id: innerContainerId,
            type: "Container",
            props: { layout: "flex-row", justify: "justify-between", align: "items-center" },
            styles: {},
            children: [
              // Left: Logo
              {
                id: logoId,
                type: "Logo",
                props: { text: "Northstar Studio" },
                styles: { fontSize: "0.875rem", fontWeight: "800", color: "var(--text-color)", letterSpacing: "0.15em" },
              },
              
              // Center: Navigation Links (Desktop: Row / Mobile: Hamburger + Overlay Drawer Panel)
              {
                id: linksId,
                type: "NavLinks",
                props: {
                  links: [
                    { label: "Home", href: "#" },
                    { label: "About", href: "#about" },
                    { label: "Services", href: "#services" },
                    { label: "Contact", href: "#contact" },
                  ],
                },
                styles: {},
              },

              // Right: Optional primary CTA button
              {
                id: btnId,
                type: "Button",
                props: { label: "Connect", variant: "primary", link: "#contact" },
                styles: { background: "var(--primary-color)", color: "var(--surface-color)", borderRadius: "var(--border-radius)", fontSize: "0.75rem", letterSpacing: "0.05em" },
              },
            ],
          },
        ],
      },
    ],
  };
};
