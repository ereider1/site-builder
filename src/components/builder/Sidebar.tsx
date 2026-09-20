import React from "react";
import { useBuilderStore } from "@/store/builderStore";
import { Section, BuilderComponent, ComponentType } from "@/types/builder";
import { starterBlocksRegistry } from "@/lib/blocksRegistry";
import { ArrowUp, ArrowDown, Trash2, Plus, LayoutGrid, FileText, Sparkles } from "lucide-react";

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

  // Quick preset adder for sections
  const handleAddSectionPreset = (type: string) => {
    const sectionId = generateId("sec");
    let name = "New Section";
    let background = "#ffffff";
    let components: BuilderComponent[] = [];

    if (type === "Hero") {
      name = "Hero Section";
      background = "#fcfcf9";
      components = [
        {
          id: generateId("comp-container"),
          type: "Container",
          props: { layout: "flex-col", gap: "1.5rem" },
          styles: { maxWidth: "800px", textAlign: "center" },
          children: [
            {
              id: generateId("comp-heading"),
              type: "Heading",
              props: { text: "Stunning Hero Title Goes Here", level: "h1" },
              styles: { fontSize: "3rem", fontWeight: "800" },
            },
            {
              id: generateId("comp-text"),
              type: "Text",
              props: { text: "Add a compelling description of your business or services to quickly capture attention." },
              styles: { fontSize: "1.125rem", color: "#4b5563" },
            },
            {
              id: generateId("comp-btn"),
              type: "Button",
              props: { label: "Learn More", variant: "primary", link: "#" },
              styles: {},
            },
          ],
        },
      ];
    } else if (type === "Services") {
      name = "Services Grid";
      components = [
        {
          id: generateId("comp-container"),
          type: "Container",
          props: { layout: "flex-col", gap: "2rem" },
          styles: {},
          children: [
            {
              id: generateId("comp-heading"),
              type: "Heading",
              props: { text: "Our Services", level: "h2" },
              styles: { fontSize: "2.25rem", fontWeight: "700", textAlign: "center" },
            },
            {
              id: generateId("comp-grid"),
              type: "Container",
              props: { layout: "grid-3", gap: "2rem" },
              styles: {},
              children: [
                {
                  id: generateId("comp-card"),
                  type: "Card",
                  props: { padding: "1.5rem", bg: "#f9fafb" },
                  styles: { borderRadius: "0.5rem" },
                  children: [
                    {
                      id: generateId("comp-heading"),
                      type: "Heading",
                      props: { text: "Service Title", level: "h3" },
                      styles: { fontSize: "1.25rem", fontWeight: "600" },
                    },
                    {
                      id: generateId("comp-text"),
                      type: "Text",
                      props: { text: "Short explanation of this client offering." },
                      styles: { fontSize: "0.875rem", color: "#4b5563" },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];
    } else {
      // Default blank section
      name = "Blank Section";
      components = [
        {
          id: generateId("comp-container"),
          type: "Container",
          props: { layout: "flex-col", gap: "1rem" },
          styles: {},
          children: [
            {
              id: generateId("comp-heading"),
              type: "Heading",
              props: { text: "Empty Section", level: "h2" },
              styles: { fontSize: "1.5rem", fontWeight: "600" },
            },
          ],
        },
      ];
    }

    const newSection: Section = {
      id: sectionId,
      name,
      type,
      styles: {
        background,
        paddingTop: "5rem",
        paddingBottom: "5rem",
      },
      components,
    };

    addSection(newSection);
  };

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

    // Add component directly. If a Container was previously selected, we can pass it as parentId
    addComponent(selectedSectionId, newComp, selectedComponentId || undefined);
    selectComponent(newCompId);
  };

  return (
    <div className="w-80 border-r border-neutral-800 bg-neutral-900 text-neutral-300 flex flex-col h-full select-none text-sm overflow-y-auto">
      {/* 1. Sections Outline List */}
      <div className="p-4 border-b border-neutral-800">
        <h3 className="font-semibold text-xs uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
          <LayoutGrid className="w-3.5 h-3.5" />
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

      {/* 2. Block Library Section (Phase Block Library) */}
      <div className="p-4 border-b border-neutral-800 bg-neutral-900/50">
        <h3 className="font-semibold text-xs uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-1.5 select-none">
          <Sparkles className="w-3.5 h-3.5" />
          Block Library
        </h3>
        <div className="space-y-2">
          {starterBlocksRegistry.map((block) => (
            <button
              key={block.id}
              onClick={() => addBlockToPage(block.id)}
              className="w-full p-3 bg-neutral-850 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-750 rounded-lg text-left transition-all duration-200 flex items-start gap-2.5 group"
            >
              <LayoutGrid className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5 group-hover:scale-105 transition-transform" />
              <div className="space-y-0.5">
                <span className="block text-white font-bold text-xs">{block.name}</span>
                <span className="block text-[10px] text-neutral-500 leading-normal font-medium">{block.description}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2.5 Add Section Presets */}
      <div className="p-4 border-b border-neutral-800">
        <h3 className="font-semibold text-xs uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5" />
          Add Section Preset
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {["Hero", "Services", "Blank"].map((type) => (
            <button
              key={type}
              onClick={() => handleAddSectionPreset(type)}
              className="p-3 bg-neutral-800 hover:bg-neutral-750 border border-neutral-700/30 rounded-lg text-center transition-colors font-medium flex flex-col items-center justify-center gap-1 text-xs"
            >
              <FileText className="w-4 h-4 text-indigo-400" />
              {type} Section
            </button>
          ))}
        </div>
      </div>

      {/* 3. Add Component Elements */}
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
