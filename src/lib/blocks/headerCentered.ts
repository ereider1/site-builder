import { Section } from "@/types/builder";

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const createHeaderCenteredBlock = (): Section => {
  const containerId = generateId("comp-container");
  const logoId = generateId("comp-logo");
  const linksId = generateId("comp-navlinks");
  const btnId = generateId("comp-btn");

  return {
    id: generateId("sec-nav-centered"),
    name: "Header — Centered",
    type: "Header",
    blockId: "header-centered",
    styles: {
      background: "var(--background-color)",
      paddingTop: "2.5rem", // More generous vertical spacing for centers
      paddingBottom: "2.5rem",
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
        props: { layout: "flex-col", gap: "1.5rem", align: "items-center" }, // Centered Stack alignment
        styles: { maxWidth: "1280px" },
        children: [
          // 1. Top Centered Branding Logo (focal point)
          {
            id: logoId,
            type: "Logo",
            props: { text: "Northstar Studio" },
            styles: { fontSize: "1.25rem", fontWeight: "800", color: "var(--text-color)", letterSpacing: "0.2em", textAlign: "center" },
          },
          
          // 2. Middle Navigation Links (Desktop: Centered Row / Mobile: Hamburger + Overlay Drawer Panel)
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
            styles: { textAlign: "center" },
          },

          // 3. Bottom Centered CTA Button
          {
            id: btnId,
            type: "Button",
            props: { label: "Let's Talk", variant: "primary", link: "#contact" },
            styles: { background: "var(--primary-color)", color: "var(--surface-color)", borderRadius: "var(--border-radius)", fontSize: "0.75rem", letterSpacing: "0.05em" },
          },
        ],
      },
    ],
  };
};
