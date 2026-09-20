import React from "react";
import { useBuilderStore } from "@/store/builderStore";
import { Section, BuilderComponent, ComponentType } from "@/types/builder";
import { starterBlocksRegistry } from "@/lib/blocksRegistry";
import { ArrowUp, ArrowDown, Trash2, Plus, LayoutGrid, FileText, Sparkles, Image as ImageIcon } from "lucide-react";

export const Sidebar: React.FC = () => {
  const {
    project,
    activePageId,
    selectedSectionId,
    selectedComponentId,
    selectSection,
    selectComponent,
    addSection,
    deleteSection,
    moveSection,
    addComponent,
    deleteComponent,
    moveComponent,
    addBlockToPage,
  } = useBuilderStore();

  const activePage = project?.pages.find((p) => p.id === activePageId);

  // Helper to generate unique IDs
  const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

  // Group blocks by categories to support multiple blocks per category cleanly
  const categories = Array.from(new Set(starterBlocksRegistry.map((b) => b.category)));

  // Add individual component to the selected Container or first active Section
  const handleAddComponentType = (type: ComponentType) => {
    if (!selectedSectionId) {
      alert("Please select a Section in the canvas first!");
      return;
    }

    const newCompId = generateId("comp");
    let newComp: BuilderComponent;

    switch (type) {
      case "Heading":
        newComp = {
          id: newCompId,
          type: "Heading",
          props: { text: "Custom Heading", level: "h2" },
          styles: { fontSize: "2rem", fontWeight: "700", marginBottom: "1rem" },
        };
        break;
      case "Text":
        newComp = {
          id: newCompId,
          type: "Text",
          props: { text: "This is a customizable body paragraph." },
          styles: { fontSize: "1rem", color: "#374151" },
        };
        break;
      case "Button":
        newComp = {
          id: newCompId,
          type: "Button",
          props: { label: "Learn More", variant: "primary", link: "#" },
          styles: {},
        };
        break;
      case "Image":
        newComp = {
          id: newCompId,
          type: "Image",
          props: {
            src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
            alt: "Placeholder Product",
            aspectRatio: "16/9",
            objectFit: "cover",
          },
          styles: { borderRadius: "0.375rem" },
        };
        break;
      case "Card":
        newComp = {
          id: newCompId,
          type: "Card",
          props: { padding: "1.5rem", bg: "#ffffff" },
          styles: { borderRadius: "0.5rem", border: "1px solid #e5e7eb" },
          children: [
            {
              id: generateId("comp-card-title"),
              type: "Heading",
              props: { text: "Card Title", level: "h3" },
              styles: { fontSize: "1.25rem", fontWeight: "600" },
            },
          ],
        };
        break;
      case "Divider":
        newComp = {
          id: newCompId,
          type: "Divider",
          props: {},
          styles: { borderTop: "1px solid #e5e7eb", marginTop: "1rem", marginBottom: "1rem" },
        };
        break;
      case "Spacer":
        newComp = {
          id: newCompId,
          type: "Spacer",
          props: { height: "2rem" },
          styles: {},
        };
        break;
      default:
        // Basic fallback
        newComp = {
          id: newCompId,
          type: "Text",
          props: { text: "New Element" },
          styles: {},
        };
    }

    addComponent(selectedSectionId, newComp, selectedComponentId || undefined);
    selectComponent(newCompId);
  };

  return (
    <div className="w-80 border-r border-neutral-800 bg-neutral-900 text-neutral-300 flex flex-col h-full select-none text-sm overflow-y-auto">
      {/* 1. Page Sections Outline List */}
      <div className="p-4 border-b border-neutral-800">
        <h3 className="font-semibold text-xs uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
          <LayoutGrid className="w-3.5 h-3.5 animate-none" />
          Page Sections
        </h3>

        {activePage && activePage.sections.length > 0 ? (
          <div className="space-y-1.5">
            {activePage.sections.map((section, idx) => {
              const isSelected = selectedSectionId === section.id;
              return (
                <div
                  key={section.id}
                  onClick={() => selectSection(section.id)}
                  className={`group p-2.5 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected ? "bg-indigo-600 text-white" : "bg-neutral-850 hover:bg-neutral-800"
                  }`}
                >
                  <span className="font-medium truncate max-w-[140px]">
                    {idx + 1}. {section.name}
                  </span>
                  
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveSection(section.id, "up");
                      }}
                      disabled={idx === 0}
                      className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-700/50 disabled:opacity-30"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveSection(section.id, "down");
                      }}
                      disabled={idx === activePage.sections.length - 1}
                      className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-700/50 disabled:opacity-30"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSection(section.id);
                      }}
                      className="p-1 rounded text-red-400 hover:text-red-250 hover:bg-neutral-700/50"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-neutral-500 text-xs italic">No sections added yet.</p>
        )}
      </div>

      {/* 2. Tailblocks-Style Visual Block Library Section */}
      <div className="p-4 border-b border-neutral-800 bg-neutral-900/50">
        <h3 className="font-semibold text-xs uppercase tracking-wider text-indigo-400 mb-4 flex items-center gap-1.5 select-none">
          <Sparkles className="w-3.5 h-3.5" />
          Block Library
        </h3>
        
        <div className="space-y-6">
          {categories.map((category) => {
            const categoryBlocks = starterBlocksRegistry.filter((b) => b.category === category);
            if (categoryBlocks.length === 0) return null;

            return (
              <div key={category} className="space-y-3">
                {/* Minimal, letter-spaced Category Separator Tag */}
                <span className="block text-[10px] font-bold tracking-widest text-stone-500 uppercase pb-1.5 border-b border-neutral-800">
                  {category}
                </span>

                <div className="space-y-3">
                  {categoryBlocks.map((block) => (
                    <div
                      key={block.id}
                      onClick={() => addBlockToPage(block.id)}
                      className="w-full p-2 bg-neutral-850 hover:bg-neutral-800 border border-neutral-800/80 hover:border-neutral-700 rounded-lg text-left transition-all duration-200 cursor-pointer flex flex-col gap-2 group shadow-sm select-none"
                    >
                      {/* 
                        Compact Miniature Visual Blueprint of the Block
                        Communicates composition and proportions elegantly without doc-text bloat.
                        Entire card acts as the clickable insert trigger.
                      */}
                      <div className="w-full aspect-[16/10] bg-neutral-950 border border-neutral-800 rounded-md p-3.5 flex gap-3.5 overflow-hidden relative transition-colors group-hover:border-indigo-500/40 select-none">
                        
                        {/* Render customized high-fidelity CSS miniature vector drawings depending on the blockId */}
                        {block.id === "hero-editorial-split" ? (
                          <>
                            {/* Left column: Miniature editorial typography lines */}
                            <div className="flex-1 flex flex-col justify-center gap-1.5 z-10">
                              <div className="w-8 h-0.75 bg-stone-700/50 rounded-full" />
                              <div className="space-y-0.75">
                                <div className="w-full h-1 bg-indigo-500/40 rounded-sm" />
                                <div className="w-10/12 h-1 bg-indigo-500/40 rounded-sm" />
                              </div>
                              <div className="space-y-0.5 pt-0.5">
                                <div className="w-full h-0.5 bg-stone-800/30 rounded-full" />
                                <div className="w-11/12 h-0.5 bg-stone-800/30 rounded-full" />
                              </div>
                              <div className="flex gap-1 pt-1.5">
                                <div className="w-7 h-2.5 bg-indigo-500/25 border border-indigo-500/10 rounded-sm" />
                                <div className="w-7 h-2.5 bg-transparent border border-stone-800 rounded-sm" />
                              </div>
                            </div>
                            {/* Right column: Image container block */}
                            <div className="w-5/12 bg-neutral-900 border border-neutral-850 rounded flex items-center justify-center relative overflow-hidden shrink-0 z-10">
                              <div className="absolute inset-0 bg-indigo-500/5 opacity-5" />
                              <ImageIcon className="w-3.5 h-3.5 text-stone-700/35" />
                            </div>
                          </>
                        ) : block.id === "services-editorial-list" ? (
                          <div className="w-full flex flex-col justify-between py-1 z-10">
                            {/* Left title eyebrow */}
                            <div className="flex gap-1.5 items-center">
                              <div className="w-6 h-0.75 bg-stone-700/50 rounded-full animate-none" />
                              <div className="w-12 h-1 bg-indigo-500/40 rounded" />
                            </div>
                            
                            {/* Rows stack */}
                            <div className="space-y-1 pt-1 flex-1 flex flex-col justify-center">
                              {[1, 2, 3].map((rowIdx) => (
                                <div key={rowIdx} className="border-t border-neutral-800/80 py-1.5 flex justify-between items-center w-full">
                                  <div className="flex gap-2 items-center">
                                    <span className="text-[7px] text-stone-500/60 font-mono">0{rowIdx}</span>
                                    <div className="space-y-0.5">
                                      <div className="w-10 h-0.75 bg-indigo-500/30 rounded-sm" />
                                      <div className="w-16 h-0.5 bg-stone-800/20 rounded-full" />
                                    </div>
                                  </div>
                                  <span className="text-[7px] text-indigo-500/50 mr-1">→</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        {/* Subtle interactive '+' overlay indicator on Hover */}
                        <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-20">
                          <span className="px-2 py-1 bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-wider rounded shadow-md border border-indigo-500/20">
                            + Add Block
                          </span>
                        </div>
                      </div>

                      {/* Compact Label description area */}
                      <div className="px-1 py-0.5 flex justify-between items-center w-full">
                        <span className="block text-white font-bold text-xs tracking-wide group-hover:text-indigo-400 transition-colors">
                          {block.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Add Component Elements (Displays contextually) */}
      <div className="p-4 flex-1">
        <h3 className="font-semibold text-xs uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5" />
          Add Visual Component
        </h3>

        {selectedSectionId ? (
          <div className="space-y-1.5">
            <p className="text-neutral-500 text-[11px] leading-snug mb-3">
              Click elements below to add them into the selected section{" "}
              {selectedComponentId && (
                <span className="text-indigo-400 font-semibold">(nested inside Container/Card)</span>
              )}:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {(["Heading", "Text", "Button", "Image", "Card", "Divider", "Spacer"] as ComponentType[]).map(
                (compType) => (
                  <button
                    key={compType}
                    onClick={() => handleAddComponentType(compType)}
                    className="p-2.5 bg-neutral-800 hover:bg-neutral-750 border border-neutral-700/30 rounded-lg text-left transition-colors font-medium text-xs truncate"
                  >
                    + {compType}
                  </button>
                )
              )}
            </div>
            
            {/* Quick selection deletion & reordering if component is selected */}
            {selectedComponentId && (
              <div className="mt-6 p-3 bg-neutral-850 border border-neutral-700/40 rounded-lg">
                <p className="text-neutral-400 text-xs font-semibold mb-2">Selected Component Options:</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => moveComponent(selectedSectionId, selectedComponentId, "up")}
                    className="flex-1 p-2 bg-neutral-800 hover:bg-neutral-700 rounded text-center flex justify-center items-center gap-1 text-xs"
                  >
                    <ArrowUp className="w-3 h-3" /> Up
                  </button>
                  <button
                    onClick={() => moveComponent(selectedSectionId, selectedComponentId, "down")}
                    className="flex-1 p-2 bg-neutral-800 hover:bg-neutral-700 rounded text-center flex justify-center items-center gap-1 text-xs"
                  >
                    <ArrowDown className="w-3 h-3" /> Down
                  </button>
                  <button
                    onClick={() => deleteComponent(selectedSectionId, selectedComponentId)}
                    className="p-2 bg-red-950 hover:bg-red-900 text-red-300 rounded flex justify-center items-center"
                    title="Delete Component"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 bg-neutral-850/50 border border-dashed border-neutral-800 rounded-lg text-center">
            <p className="text-neutral-500 text-xs leading-normal">
              Select a section in the workspace canvas to add components.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
