import { BlockDefinition } from "@/types/builder";
import { createHeroEditorialSplitBlock } from "./blocks/heroEditorialSplit";
import { createHeroCenteredBlock } from "./blocks/heroCentered";
import { createHeroFullImageBlock } from "./blocks/heroFullImage";
import { createServicesEditorialListBlock } from "./blocks/servicesEditorialList";
import { createServicesThreeColumnBlock } from "./blocks/servicesThreeColumn";
import { createFeaturesThreeColumnBlock } from "./blocks/featuresThreeColumn";
import { createFeaturesThreeColumnCardsBlock } from "./blocks/featuresThreeColumnCards";
import { createFeaturesImageListBlock } from "./blocks/featuresImageList";
import { createFeaturesAlternatingBlock } from "./blocks/featuresAlternating";
import { createFeaturesEditorialListBlock } from "./blocks/featuresEditorialList";
import { createFeaturesAsymmetricGridBlock } from "./blocks/featuresAsymmetricGrid";
import { createFeaturesStatementBlock } from "./blocks/featuresStatement";

export const starterBlocksRegistry: BlockDefinition[] = [
  // 1. HERO CATEGORY
  {
    id: "hero-editorial-split",
    name: "Hero — Editorial Split",
    category: "Hero",
    description: "A premium editorial hero with oversized typography, supporting copy, actions, and a large visual portrait workspace photo.",
    previewImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
    createSection: createHeroEditorialSplitBlock,
  },
  {
    id: "hero-centered",
    name: "Hero — Centered",
    category: "Hero",
    description: "A gorgeous symmetric hero with centralized display typography, clear action buttons, and a widescreen lower visual showcase.",
    previewImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
    createSection: createHeroCenteredBlock,
  },
  {
    id: "hero-full-image",
    name: "Hero — Full Image",
    category: "Hero",
    description: "An immersive widescreen full-width visual banner flowing into a sophisticated asymmetric split text introduction directly below.",
    previewImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
    createSection: createHeroFullImageBlock,
  },

  // 2. SERVICES CATEGORY
  {
    id: "services-editorial-list",
    name: "Services — Editorial List",
    category: "Services",
    description: "An elegant, structured numbered service list separated by fine rules and featuring beautiful balanced typography.",
    previewImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
    createSection: createServicesEditorialListBlock,
  },
  {
    id: "services-three-column",
    name: "Services — Three Column",
    category: "Services",
    description: "A clean 3-column services grid featuring refined, sharp-geometry cards with fine-scaled borders and generous line space.",
    previewImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
    createSection: createServicesThreeColumnBlock,
  },

  // 3. FEATURES CATEGORY (Phase Expand Block Library)
  {
    id: "features-three-column",
    name: "Features — Three Column",
    category: "Features",
    description: "Centered heading followed by three evenly spaced feature columns separated by thin borders and large numbers.",
    previewImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
    createSection: createFeaturesThreeColumnBlock,
  },
  {
    id: "features-three-column-cards",
    name: "Features — Three Column Cards",
    category: "Features",
    description: "Three clean, sharp-geometry, and ultra-restrained cards featuring visual indicators, headers, and secondary buttons.",
    previewImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
    createSection: createFeaturesThreeColumnCardsBlock,
  },
  {
    id: "features-image-list",
    name: "Features — Image + List",
    category: "Features",
    description: "A highly prominent visual portrait photo left paired adjacent with a spacious horizontal numbered feature list right.",
    previewImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80",
    createSection: createFeaturesImageListBlock,
  },
  {
    id: "features-alternating",
    name: "Features — Alternating",
    category: "Features",
    description: "Multiple feature rows with alternating image/text visual columns to create a majestic page scrolling rhythm.",
    previewImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
    createSection: createFeaturesAlternatingBlock,
  },
  {
    id: "features-editorial-list",
    name: "Features — Editorial List",
    category: "Features",
    description: "A large practice heading followed by numbered horizontal feature rows with minimalist borders and action arrows.",
    previewImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
    createSection: createFeaturesEditorialListBlock,
  },
  {
    id: "features-asymmetric-grid",
    name: "Features — Asymmetric Grid",
    category: "Features",
    description: "An intentionally staggered, uneven grid layout pairing a wide directive card with stacked, narrow feature cards.",
    previewImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
    createSection: createFeaturesAsymmetricGridBlock,
  },
  {
    id: "features-statement",
    name: "Features — Statement + Features",
    category: "Features",
    description: "A massive, oversized left column editorial statement balanced with stacked, numbered right column support features.",
    previewImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
    createSection: createFeaturesStatementBlock,
  },
];

export const findBlockById = (id: string): BlockDefinition | null => {
  return starterBlocksRegistry.find((b) => b.id === id) || null;
};
