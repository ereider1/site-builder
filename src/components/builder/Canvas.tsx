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
      className="flex-1 bg-stone-100 p-6 overflow-y-auto flex justify-center items-start transition-all"
    >
      {/* 
        Dynamic Token-Based Design System Style Injection
        Combines standard browser-level Media Queries with editor-level viewport scopes (.viewport-mobile, .viewport-tablet)
        to render actual responsive layouts both on real devices AND inside editor viewport toggles!
      */}
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
          
          /* Spacing scaling factor - reduces paddings proportionately across smaller screens */
          --spacing-factor: 1;
        }
        
        .canvas-container {
          font-family: ${project.theme.typography.fontFamily.body};
          background-color: var(--background-color);
          color: var(--text-color);
          
          /* Container queries activation - lets fluid clamp() calculate based on actual parent width! */
          container-type: inline-size;
          container-name: canvas;
        }

        .canvas-container h1,
        .canvas-container h2,
        .canvas-container h3,
        .canvas-container h4,
        .canvas-container h5,
        .canvas-container h6 {
          font-family: ${project.theme.typography.fontFamily.heading};
        }

        /* ------------------------------------------------ */
        /* 1. Global Responsive Spacing Scales (Paddings)   */
        /* ------------------------------------------------ */
        
        @media (max-width: 1023px) {
          :root { --spacing-factor: 0.75; }
        }
        .viewport-tablet {
          --spacing-factor: 0.75;
        }

        @media (max-width: 767px) {
          :root { --spacing-factor: 0.55; }
        }
        .viewport-mobile {
          --spacing-factor: 0.55;
        }

        /* ------------------------------------------------ */
        /* 2. Editor Viewport Stacking & Column Overrides   */
        /* ------------------------------------------------ */
        
        /* Tablet Viewport Override Styles (.viewport-tablet) */
        .viewport-tablet .md\\:grid-cols-2 {
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        }
        .viewport-tablet .md\\:flex-row {
          flex-direction: row !important;
        }
        .viewport-tablet .lg\\:grid-cols-2 {
          grid-template-columns: repeat(1, minmax(0, 1fr)) !important; /* Stack larger grids */
        }

        /* Mobile Viewport Override Styles (.viewport-mobile) */
        .viewport-mobile .grid-cols-1,
        .viewport-mobile .md\\:grid-cols-2,
        .viewport-mobile .lg\\:grid-cols-2,
        .viewport-mobile .lg\\:grid-cols-3,
        .viewport-mobile .grid {
          grid-template-columns: repeat(1, minmax(0, 1fr)) !important; /* Force single column stacks */
        }

        .viewport-mobile .md\\:flex-row,
        .viewport-mobile .flex {
          flex-direction: column !important; /* Force vertical flex columns */
        }
        
        /* Force mobile navigation toggles inside mobile editor viewport parent on desktop screens */
        .viewport-mobile .hidden.md\\:flex {
          display: none !important;
        }
        .viewport-mobile .md\\:hidden.flex {
          display: flex !important;
          flex-direction: row !important;
        }
        .viewport-mobile .md\\:hidden {
          display: block !important;
        }

        /* Break out mobile navigation drawer from nested component relative parent trapping */
        .viewport-mobile [id^="sec-nav"] .group\\/comp {
          position: static !important;
        }

        .viewport-mobile .justify-between {
          justify-content: flex-start !important;
          gap: 1.5rem !important;
        }

        .viewport-mobile .w-80 {
          width: 100% !important;
        }

        /* ------------------------------------------------ */
        /* 3. Utility Transitions                           */
        /* ------------------------------------------------ */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>

      <div
        className={cn(
          "w-full bg-white shadow-2xl transition-all duration-300 min-h-[85vh] origin-top border border-neutral-800/40 rounded-sm overflow-hidden canvas-container",
          viewportWidthClass,
          viewport === "mobile" ? "viewport-mobile" : viewport === "tablet" ? "viewport-tablet" : ""
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
