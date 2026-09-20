import { BlockDefinition } from "@/types/builder";
import { createHeroEditorialSplitBlock } from "./blocks/heroEditorialSplit";
import { createServicesEditorialListBlock } from "./blocks/servicesEditorialList";
import { createHeroCenteredBlock } from "./blocks/heroCentered";
import { createHeroFullImageBlock } from "./blocks/heroFullImage";
import { createServicesThreeColumnBlock } from "./blocks/servicesThreeColumn";

export const starterBlocksRegistry: BlockDefinition[] = [
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
];

export const findBlockById = (id: string): BlockDefinition | null => {
  return starterBlocksRegistry.find((b) => b.id === id) || null;
};
