import { Project, BuilderComponent } from "@/types/builder";
import { updateComponentInArray } from "./treeUtils";

export interface BusinessProfile {
  businessName?: string;
  tagline?: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  country?: string;
}

export interface BrandAssets {
  logo?: string;
  heroImage?: string;
  aboutImage?: string;
  featuredWorkImage?: string;
  galleryImages?: string[];
}

export interface SocialLinks {
  website?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
}

export interface UserContent {
  business?: BusinessProfile;
  brand?: BrandAssets;
  socials?: SocialLinks;
}

export interface ContentSlot {
  slotId: string;
  componentId: string;
  property: string; // e.g. "text", "src"
  source: string; // dot-notated source lookup, e.g. "business.tagline"
  fallbackBehavior: "keep-template";
}

// 1. Declare the EXPLICIT, rigid slot mappings for 'professional-services-modern' template
export const templateContentSlots: ContentSlot[] = [
  // NAVIGATION
  {
    slotId: "nav.businessName",
    componentId: "comp-nav-logo",
    property: "text",
    source: "business.businessName",
    fallbackBehavior: "keep-template",
  },
  // HERO
  {
    slotId: "hero.headline",
    componentId: "comp-hero-heading",
    property: "text",
    source: "business.tagline",
    fallbackBehavior: "keep-template",
  },
  {
    slotId: "hero.description",
    componentId: "comp-hero-text",
    property: "text",
    source: "business.description",
    fallbackBehavior: "keep-template",
  },
  {
    slotId: "hero.image",
    componentId: "comp-hero-image",
    property: "src",
    source: "brand.heroImage",
    fallbackBehavior: "keep-template",
  },
  // ABOUT
  {
    slotId: "about.image",
    componentId: "comp-about-image",
    property: "src",
    source: "brand.aboutImage",
    fallbackBehavior: "keep-template",
  },
  // FEATURED WORK
  {
    slotId: "work.image",
    componentId: "comp-work-image",
    property: "src",
    source: "brand.featuredWorkImage",
    fallbackBehavior: "keep-template",
  },
  // FOOTER
  {
    slotId: "footer.businessName",
    componentId: "comp-footer-logo",
    property: "text",
    source: "business.businessName",
    fallbackBehavior: "keep-template",
  },
  {
    slotId: "footer.email",
    componentId: "comp-footer-email",
    property: "text",
    source: "business.email",
    fallbackBehavior: "keep-template",
  },
  {
    slotId: "footer.phone",
    componentId: "comp-footer-phone",
    property: "text",
    source: "business.phone",
    fallbackBehavior: "keep-template",
  },
  {
    slotId: "footer.address",
    componentId: "comp-footer-address",
    property: "text",
    source: "business.address",
    fallbackBehavior: "keep-template",
  },
];

// Helper to safely fetch dot-notated values from UserContent object
const getValueByPath = (obj: any, path: string): any => {
  const parts = path.split(".");
  let current = obj;
  for (const part of parts) {
    if (current == null) return undefined;
    current = current[part];
  }
  return current;
};

// Deterministic population function: takes clone, applies mapping values if present, leaves original template values untouched on mismatch/empty
export function populateProject(project: Project, content: UserContent): Project {
  // 1. Deep clone the project state to avoid sharing memory addresses
  const populatedProject: Project = JSON.parse(JSON.stringify(project));

  const page = populatedProject.pages[0]; // Populating home-page standard
  if (!page) return populatedProject;

  // 2. Iterate through each explicit content slot
  for (const slot of templateContentSlots) {
    // 3. Resolve the user's content value
    const userValue = getValueByPath(content, slot.source);

    // 4. Fallback safeguard: if user content is empty, missing, or undefined, keep template content intact
    if (userValue === undefined || userValue === null || userValue === "") {
      continue;
    }

    // Find section containing the component
    const section = page.sections.find((sec) => {
      // Find recursively inside section component list
      return sectionContainsComponent(sec.components, slot.componentId);
    });

    if (section) {
      // 5. Build component updates block
      const updateBlock: any = {};
      if (slot.property === "src") {
        updateBlock.props = { src: userValue };
      } else {
        updateBlock.props = { [slot.property]: userValue };
      }

      // Update component list inside section
      section.components = updateComponentInArray(
        section.components,
        slot.componentId,
        updateBlock
      );
    }
  }

  populatedProject.updatedAt = Date.now();
  return populatedProject;
}

// Helper: check if component is inside array recursively
function sectionContainsComponent(components: BuilderComponent[], id: string): boolean {
  for (const comp of components) {
    if (comp.id === id) return true;
    if (comp.children && comp.children.length > 0) {
      if (sectionContainsComponent(comp.children, id)) return true;
    }
  }
  return false;
}
