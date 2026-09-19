import React from "react";
import { useBuilderStore } from "@/store/builderStore";
import { SectionRenderer } from "./Renderer";
import { cn } from "@/lib/utils";

export const Canvas: React.FC = () => {
  const { project, activePageId, viewport, selectSection } = useBuilderStore();

  if (!project) return null;

  const activePage = project.pages.find((p) => p.id === activePageId);

  // Width classes matching viewport selection
  const viewportWidthClass =
    viewport === "mobile"
      ? "max-w-[375px]"
      : viewport === "tablet"
      ? "max-w-[768px]"
      : "max-w-full";

  const handleOuterClick = (e: React.MouseEvent) => {
    // Clear selections if clicking outside elements
    if (e.target === e.currentTarget) {
      selectSection(null);
    }
  };

  return (
    <div
      onClick={handleOuterClick}
      className="flex-1 bg-neutral-950 p-6 overflow-y-auto flex justify-center items-start transition-all"
    >
      {/* Dynamic Token-Based Design System Style Injection */}
      <style>{`
        :root {
          --primary-color: ${project.theme.colors.primary};
          --secondary-color: ${project.theme.colors.secondary};
          --background-color: ${project.theme.colors.background};
          --surface-color: ${project.theme.colors.surface};
          --text-color: ${project.theme.colors.text};
          --muted-color: ${project.theme.colors.muted};
          --border-color: ${project.theme.colors.border};
          --border-radius: ${project.theme.radius};
        }
        .canvas-container {
          font-family: ${project.theme.typography.fontFamily.body};
          background-color: var(--background-color);
          color: var(--text-color);
        }
      `}</style>

      <div
        className={cn(
          "w-full bg-white shadow-2xl transition-all duration-300 min-h-[85vh] origin-top border border-neutral-800/40 rounded-sm overflow-hidden canvas-container",
          viewportWidthClass
        )}
      >
        {activePage && activePage.sections.length > 0 ? (
          <div className="flex flex-col">
            {activePage.sections.map((section) => (
              <SectionRenderer key={section.id} section={section} isEditing={true} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-neutral-900 text-neutral-500">
            <p className="text-sm font-medium">Empty Canvas</p>
            <p className="text-xs mt-1">Use the Left Sidebar to add a section preset.</p>
          </div>
        )}
      </div>
    </div>
  );
};
