export type ThemeColors = {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
};

export type ThemeTypography = {
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

export type Theme = {
  colors: ThemeColors;
  typography: ThemeTypography;
  radius: string;
  spacing: Record<string, string>;
};

export type ComponentType =
  | 'Section'
  | 'Container'
  | 'Heading'
  | 'Text'
  | 'Button'
  | 'Image'
  | 'Logo'
  | 'NavLinks'
  | 'Card'
  | 'Divider'
  | 'Spacer';

export interface BuilderComponent {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  styles: Record<string, any>; // CSS properties or utility classes
  children?: BuilderComponent[];
}

export interface SectionSlotMapping {
  componentId: string;
  property: string;
  source: string;
}

export interface Section {
  id: string;
  name: string;
  type: string; // e.g., 'Hero', 'Services', 'Footer'
  components: BuilderComponent[];
  styles: Record<string, any>;
  blockId?: string; // Optional indicator of block library origin
  contentSlots?: SectionSlotMapping[]; // Optional local slot definitions for dynamic population
}

export interface Page {
  id: string;
  path: string;
  name: string;
  sections: Section[];
}

export interface Project {
  id: string;
  name: string;
  theme: Theme;
  themeId?: string; // Optional indicator of active token-based Theme ID
  pages: Page[];
  createdAt: number;
  updatedAt: number;
}

export interface StarterTemplate {
  id: string;
  name: string;
  description: string;
  previewImage?: string;
  project: Project;
}

export interface ProjectMetadata {
  id: string;
  name: string;
  templateId: string;
  createdAt: number;
  updatedAt: number;
}

export interface BlockDefinition {
  id: string;
  name: string;
  category: string;
  description: string;
  previewImage?: string;
  createSection: () => Section;
}
