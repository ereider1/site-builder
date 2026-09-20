import { BlockDefinition } from "@/types/builder";
import { createHeroEditorialSplitBlock } from "./blocks/heroEditorialSplit";

export const starterBlocksRegistry: BlockDefinition[] = [
  {
    id: "hero-editorial-split",
    name: "Hero — Editorial Split",
    category: "Hero",
    description: "A premium editorial hero with oversized typography, supporting copy, actions, and a large visual portrait workspace photo.",
    previewImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
    createSection: createHeroEditorialSplitBlock,
  },
];

export const findBlockById = (id: string): BlockDefinition | null => {
  return starterBlocksRegistry.find((b) => b.id === id) || null;
};
