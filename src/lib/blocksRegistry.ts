import { BlockDefinition } from "@/types/builder";
import { createHeroEditorialSplitBlock } from "./blocks/heroEditorialSplit";
import { createServicesEditorialListBlock } from "./blocks/servicesEditorialList";

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
    id: "services-editorial-list",
    name: "Services — Editorial List",
    category: "Services",
    description: "An elegant, structured numbered service list separated by fine rules and featuring beautiful balanced typography.",
    previewImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
    createSection: createServicesEditorialListBlock,
  },
];

export const findBlockById = (id: string): BlockDefinition | null => {
  return starterBlocksRegistry.find((b) => b.id === id) || null;
};
