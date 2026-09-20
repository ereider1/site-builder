import { Theme } from "@/types/builder";

export interface ThemeDefinition {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
    border: string;
  };
  typography: {
    fontFamily: {
      heading: string;
      body: string;
    };
    scale: {
      h1: string;
      h2: string;
      h3: string;
      p: string;
      small: string;
    };
  };
  radius: string;
  spacing: Record<string, string>;
}

export const starterThemesRegistry: ThemeDefinition[] = [
  {
    id: "editorial",
    name: "Editorial",
    description: "A premium, sophisticated system with warm backgrounds, classic serif display headings, and zero rounding.",
    colors: {
      primary: "#111111", // Pitch charcoal
      secondary: "#111111", // Muted anthracite
      background: "#fcfcf9", // Premium warm paper white
      surface: "#ffffff",
      text: "#1c1917", // Stone anthracite text
      muted: "#78716c", // Stone gray
      border: "#e7e5e4", // Warm gray border
    },
    typography: {
      fontFamily: {
        heading: "'Playfair Display', Georgia, serif",
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
    radius: "0px", // Crisp, sharp geometric edges
    spacing: {
      sectionPadding: "6rem",
    },
  },
  {
    id: "modern",
    name: "Modern",
    description: "A clean, energetic layout with a vibrant secondary accent, contemporary geometric headers, and subtle rounding.",
    colors: {
      primary: "#0f172a", // Deep slate navy
      secondary: "#3b82f6", // Electric vibrant accent blue
      background: "#ffffff", // Crisp bright white
      surface: "#f8fafc", // Cool slate gray surface
      text: "#0f172a", // Deep slate text
      muted: "#64748b", // Slate gray muted text
      border: "#e2e8f0", // Clean slate border
    },
    typography: {
      fontFamily: {
        heading: "Inter, sans-serif",
        body: "Inter, sans-serif",
      },
      scale: {
        h1: "4rem",
        h2: "2.75rem",
        h3: "1.35rem",
        p: "1rem",
        small: "0.8rem",
      },
    },
    radius: "8px", // Clean modern rounded corners
    spacing: {
      sectionPadding: "5rem",
    },
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "An ultra-restrained system focusing on space and typographic scale, zinc lines, and maximum breathing room.",
    colors: {
      primary: "#09090b", // Absolute dark zinc
      secondary: "#09090b",
      background: "#fafafa", // Minimal paper light gray
      surface: "#ffffff",
      text: "#09090b", // Pure dark zinc text
      muted: "#71717a", // Zinc gray muted copy
      border: "#e4e4e7", // Fine zinc border line
    },
    typography: {
      fontFamily: {
        heading: "Inter, sans-serif",
        body: "Inter, sans-serif",
      },
      scale: {
        h1: "3.75rem",
        h2: "2.5rem",
        h3: "1.25rem",
        p: "0.95rem",
        small: "0.75rem",
      },
    },
    radius: "2px", // Crisp, fine micro rounded corners
    spacing: {
      sectionPadding: "7rem",
    },
  },
];

export const findThemeById = (id: string): ThemeDefinition | null => {
  return starterThemesRegistry.find((t) => t.id === id) || null;
};

// Maps a ThemeDefinition into our standard Theme structure for store integration
export const mapDefinitionToTheme = (def: ThemeDefinition): Theme => {
  return {
    colors: { ...def.colors },
    typography: { ...def.typography },
    radius: def.radius,
    spacing: { ...def.spacing },
  };
};
