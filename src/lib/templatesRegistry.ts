import { StarterTemplate } from "@/types/builder";
import { createDefaultProject } from "./defaultProject";

export const starterTemplatesRegistry: StarterTemplate[] = [
  {
    id: "professional-services-modern",
    name: "Professional Services — Modern",
    description: "A premium editorial website for consultants, strategy firms, creative studios, and other professional-service businesses.",
    previewImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
    project: createDefaultProject(),
  },
];

export const findTemplateById = (id: string): StarterTemplate | null => {
  return starterTemplatesRegistry.find((t) => t.id === id) || null;
};
