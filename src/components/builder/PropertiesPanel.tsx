import React from "react";
import { useBuilderStore } from "@/store/builderStore";
import { findComponent } from "@/lib/treeUtils";
import { starterThemesRegistry } from "@/lib/themesRegistry";
import { Sliders, Paintbrush } from "lucide-react";

export const PropertiesPanel: React.FC = () => {
  const {
    project,
    activePageId,
    selectedSectionId,
    selectedComponentId,
    updateComponent,
    updateSection,
    updateTheme,
    switchProjectTheme,
  } = useBuilderStore();

  const activePage = project?.pages.find((p) => p.id === activePageId);
  const selectedSection = activePage?.sections.find((s) => s.id === selectedSectionId);

  // If a component is selected, retrieve it recursively
  const selectedComponent =
    selectedSection && selectedComponentId
      ? findComponent(selectedSection.components, selectedComponentId)
      : null;

  // Handles updating properties of the selected component
  const handlePropChange = (key: string, value: any) => {
    if (!selectedSectionId || !selectedComponentId || !selectedComponent) return;
    updateComponent(selectedSectionId, selectedComponentId, {
      props: {
        ...selectedComponent.props,
        [key]: value,
      },
    });
  };

  // Handles updating inline styles of the selected component
  const handleStyleChange = (key: string, value: any) => {
    if (!selectedSectionId || !selectedComponentId || !selectedComponent) return;
    updateComponent(selectedSectionId, selectedComponentId, {
      styles: {
        ...selectedComponent.styles,
        [key]: value,
      },
    });
  };

  const handleSectionPropChange = (key: string, value: any) => {
    if (!selectedSectionId || !selectedSection) return;
    updateSection(selectedSectionId, { [key]: value });
  };

  const handleSectionStyleChange = (key: string, value: any) => {
    if (!selectedSectionId || !selectedSection) return;
    updateSection(selectedSectionId, {
      styles: {
        ...selectedSection.styles,
        [key]: value,
      },
    });
  };

  // If nothing is selected, show Global Theme customization
  if (!selectedSectionId) {
    if (!project) return null;
    return (
      <div className="w-80 border-l border-stone-200 bg-stone-50 text-stone-700 p-4 h-full flex flex-col text-sm overflow-y-auto select-none">
        
        {/* First-class Visual Header Banner for Global Project Theme */}
        <div className="flex items-center gap-1.5 px-3 py-2 bg-white border border-stone-200 rounded-lg mb-4 select-none shadow-sm">
          <Paintbrush className="w-4 h-4 text-indigo-600" />
          <span className="font-bold text-xs uppercase tracking-wider text-stone-800">Project Theme & Styling</span>
        </div>
        
        <p className="text-stone-400 text-xs mb-4 leading-normal font-medium">
          Customize the primary design language, typography fonts, and visual token-scale variables globally across your website.
        </p>

        {/* Dynamic Theme Selector (Phase Theme System) */}
        <div className="space-y-2.5 mb-6 pb-6 border-b border-stone-200">
          <label className="block text-xs font-semibold text-stone-500">Select Global Theme</label>
          <div className="space-y-2">
            {starterThemesRegistry.map((theme) => {
              const isActive = project.themeId === theme.id || (!project.themeId && theme.id === "editorial");
              return (
                <button
                  key={theme.id}
                  onClick={() => switchProjectTheme(theme.id)}
                  className={`w-full p-3 rounded-lg text-left transition-all border flex flex-col gap-1.5 group shadow-sm ${
                    isActive
                      ? "bg-indigo-50 border-indigo-500 text-indigo-950 font-bold"
                      : "bg-white border-stone-200 hover:border-stone-400 text-stone-600"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-xs group-hover:text-indigo-600 transition-colors">{theme.name}</span>
                    <div className="flex gap-1 shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full border border-stone-300" style={{ backgroundColor: theme.colors.background }} title="Page Background" />
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.colors.primary }} title="Primary Theme Color" />
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.colors.secondary }} title="Accent Action Color" />
                    </div>
                  </div>
                  <span className="text-[10px] text-stone-400 leading-normal font-medium">{theme.description}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-500 mb-1.5">Primary Branding Brand Color</label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={project.theme.colors.primary}
                onChange={(e) => updateTheme({ colors: { ...project.theme.colors, primary: e.target.value } })}
                className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
              />
              <span className="text-xs font-mono uppercase font-semibold text-stone-600">{project.theme.colors.primary}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 mb-1.5">Secondary Interaction Accent Color</label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={project.theme.colors.secondary}
                onChange={(e) => updateTheme({ colors: { ...project.theme.colors, secondary: e.target.value } })}
                className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
              />
              <span className="text-xs font-mono uppercase font-semibold text-stone-600">{project.theme.colors.secondary}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 mb-1.5">Border Radius</label>
            <select
              value={project.theme.radius}
              onChange={(e) => updateTheme({ radius: e.target.value })}
              className="w-full bg-white border border-stone-200 rounded px-2 py-1.5 text-xs text-stone-700 focus:outline-none focus:border-stone-400 shadow-sm"
            >
              <option value="0px">Sharp (0px)</option>
              <option value="0.25rem">Light (4px)</option>
              <option value="0.5rem">Standard (8px)</option>
              <option value="0.75rem">More Rounded (12px)</option>
              <option value="1rem">Maximum (16px)</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 border-l border-stone-200 bg-stone-50 text-stone-700 p-4 h-full flex flex-col text-sm overflow-y-auto select-none">
      
      {/* Prominent High-Contrast Header Banner for Component Properties */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-white border border-stone-200 rounded-lg mb-4 select-none shadow-sm">
        <Sliders className="w-4 h-4 text-indigo-600" />
        <span className="font-bold text-xs uppercase tracking-wider text-stone-800">Properties Inspector</span>
      </div>

      {selectedComponent ? (
        // COMPONENT EDITING FIELDS
        <div className="space-y-4">
          <div className="bg-white p-2.5 rounded border border-stone-200 text-xs shadow-sm">
            <span className="text-stone-400 font-semibold">Selected Component: </span>
            <strong className="text-indigo-600">{selectedComponent.type}</strong>
          </div>

          {/* Heading Component Editing */}
          {selectedComponent.type === "Heading" && (
            <>
              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1">Heading Text</label>
                <textarea
                  value={selectedComponent.props.text || ""}
                  onChange={(e) => handlePropChange("text", e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded p-2 text-xs text-stone-800 focus:outline-none focus:border-stone-400 shadow-sm"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1">Semantic Level</label>
                <select
                  value={selectedComponent.props.level || "h2"}
                  onChange={(e) => handlePropChange("level", e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded p-1.5 text-xs text-stone-700 focus:outline-none focus:border-stone-400 shadow-sm"
                >
                  <option value="h1">H1 (Hero Heading)</option>
                  <option value="h2">H2 (Section Heading)</option>
                  <option value="h3">H3 (Sub-heading)</option>
                  <option value="h4">H4 (Card Title)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1">Font Size</label>
                <input
                  type="text"
                  value={selectedComponent.styles.fontSize || ""}
                  onChange={(e) => handleStyleChange("fontSize", e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded p-1.5 text-xs text-stone-700 focus:outline-none focus:border-stone-400 shadow-sm"
                  placeholder="e.g. 2.25rem or 32px"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1">Font Weight</label>
                <select
                  value={selectedComponent.styles.fontWeight || "700"}
                  onChange={(e) => handleStyleChange("fontWeight", e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded p-1.5 text-xs text-stone-700 focus:outline-none focus:border-stone-400 shadow-sm"
                >
                  <option value="400">Regular (400)</option>
                  <option value="500">Medium (500)</option>
                  <option value="600">Semi-Bold (600)</option>
                  <option value="700">Bold (700)</option>
                  <option value="800">Extra-Bold (800)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1">Alignment</label>
                <select
                  value={selectedComponent.styles.textAlign || "left"}
                  onChange={(e) => handleStyleChange("textAlign", e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded p-1.5 text-xs text-stone-700 focus:outline-none focus:border-stone-400 shadow-sm"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1">Text Color</label>
                <input
                  type="text"
                  value={selectedComponent.styles.color || ""}
                  onChange={(e) => handleStyleChange("color", e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded p-1.5 text-xs text-stone-700 focus:outline-none focus:border-stone-400 shadow-sm"
                  placeholder="e.g. #111827 or inherit"
                />
              </div>
            </>
          )}

          {/* Text Component Editing */}
          {selectedComponent.type === "Text" && (
            <>
              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1">Body Text</label>
                <textarea
                  value={selectedComponent.props.text || ""}
                  onChange={(e) => handlePropChange("text", e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded p-2 text-xs text-stone-800 focus:outline-none focus:border-stone-400 shadow-sm"
                  rows={5}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1">Font Size</label>
                <input
                  type="text"
                  value={selectedComponent.styles.fontSize || "1rem"}
                  onChange={(e) => handleStyleChange("fontSize", e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded p-1.5 text-xs text-stone-700 focus:outline-none focus:border-stone-400 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1">Alignment</label>
                <select
                  value={selectedComponent.styles.textAlign || "left"}
                  onChange={(e) => handleStyleChange("textAlign", e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded p-1.5 text-xs text-stone-700 focus:outline-none focus:border-stone-400 shadow-sm"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1">Text Color</label>
                <input
                  type="text"
                  value={selectedComponent.styles.color || ""}
                  onChange={(e) => handleStyleChange("color", e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded p-1.5 text-xs text-stone-700 focus:outline-none focus:border-stone-400 shadow-sm"
                />
              </div>
            </>
          )}

          {/* Button Component Editing */}
          {selectedComponent.type === "Button" && (
            <>
              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1">Label</label>
                <input
                  type="text"
                  value={selectedComponent.props.label || ""}
                  onChange={(e) => handlePropChange("label", e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded p-1.5 text-xs text-stone-700 focus:outline-none focus:border-stone-400 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1">Link URL</label>
                <input
                  type="text"
                  value={selectedComponent.props.link || ""}
                  onChange={(e) => handlePropChange("link", e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded p-1.5 text-xs text-stone-700 focus:outline-none focus:border-stone-400 shadow-sm"
                  placeholder="#services or link"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1">Button Variant</label>
                <select
                  value={selectedComponent.props.variant || "primary"}
                  onChange={(e) => handlePropChange("variant", e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded p-1.5 text-xs text-stone-700 focus:outline-none focus:border-stone-400 shadow-sm"
                >
                  <option value="primary">Primary (Filled)</option>
                  <option value="secondary">Secondary (Outline)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1">Background Color</label>
                <input
                  type="text"
                  value={selectedComponent.styles.background || ""}
                  onChange={(e) => handleStyleChange("background", e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded p-1.5 text-xs text-stone-700 focus:outline-none focus:border-stone-400 shadow-sm"
                  placeholder="e.g. #4f46e5"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1">Text Color</label>
                <input
                  type="text"
                  value={selectedComponent.styles.color || ""}
                  onChange={(e) => handleStyleChange("color", e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded p-1.5 text-xs text-stone-700 focus:outline-none focus:border-stone-400 shadow-sm"
                  placeholder="e.g. #ffffff"
                />
              </div>
            </>
          )}

          {/* Image Component Editing */}
          {selectedComponent.type === "Image" && (
            <>
              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1">Image URL Source</label>
                <textarea
                  value={selectedComponent.props.src || ""}
                  onChange={(e) => handlePropChange("src", e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded p-2 text-xs text-stone-800 focus:outline-none focus:border-stone-400 shadow-sm"
                  rows={4}
                  placeholder="Unsplash/External image url"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1">Alt Accessibility Text</label>
                <input
                  type="text"
                  value={selectedComponent.props.alt || ""}
                  onChange={(e) => handlePropChange("alt", e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded p-1.5 text-xs text-stone-700 focus:outline-none focus:border-stone-400 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1">Aspect Ratio</label>
                <select
                  value={selectedComponent.props.aspectRatio || "16/9"}
                  onChange={(e) => handlePropChange("aspectRatio", e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded p-1.5 text-xs text-stone-700 focus:outline-none focus:border-stone-400 shadow-sm"
                >
                  <option value="16/9">Desktop (16/9)</option>
                  <option value="16/10">Widescreen (16/10)</option>
                  <option value="4/3">Standard (4/3)</option>
                  <option value="1/1">Square (1/1)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1">Fit Mode</label>
                <select
                  value={selectedComponent.props.objectFit || "cover"}
                  onChange={(e) => handlePropChange("objectFit", e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded p-1.5 text-xs text-stone-700 focus:outline-none focus:border-stone-400 shadow-sm"
                >
                  <option value="cover">Cover (Fill & Crop)</option>
                  <option value="contain">Contain (Fit Full Image)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1">Border Radius</label>
                <input
                  type="text"
                  value={selectedComponent.styles.borderRadius || ""}
                  onChange={(e) => handleStyleChange("borderRadius", e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded p-1.5 text-xs text-stone-700 focus:outline-none focus:border-stone-400 shadow-sm"
                  placeholder="e.g. 0.5rem or 8px"
                />
              </div>
            </>
          )}
        </div>
      ) : selectedSection ? (
        // SECTION EDITING FIELDS
        <div className="space-y-4">
          <div className="bg-white p-2.5 rounded border border-stone-200 text-xs shadow-sm">
            <span className="text-stone-400 font-semibold">Selected Structure: </span>
            <strong className="text-indigo-600 font-bold">Section ({selectedSection.type})</strong>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 mb-1">Section Display Name</label>
            <input
              type="text"
              value={selectedSection.name}
              onChange={(e) => handleSectionPropChange("name", e.target.value)}
              className="w-full bg-white border border-stone-200 rounded p-1.5 text-xs text-stone-700 focus:outline-none focus:border-stone-400 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 mb-1">Background Fill</label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={selectedSection.styles.background?.startsWith("#") ? selectedSection.styles.background : "#ffffff"}
                onChange={(e) => handleSectionStyleChange("background", e.target.value)}
                className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={selectedSection.styles.background || ""}
                onChange={(e) => handleSectionStyleChange("background", e.target.value)}
                className="w-full bg-white border border-stone-200 rounded p-1.5 text-xs text-stone-700 focus:outline-none focus:border-stone-400 shadow-sm"
                placeholder="e.g. #f3f4f6"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 mb-1">Top Spacing (Padding)</label>
            <select
              value={selectedSection.styles.paddingTop || "4rem"}
              onChange={(e) => handleSectionStyleChange("paddingTop", e.target.value)}
              className="w-full bg-white border border-stone-200 rounded p-1.5 text-xs text-stone-700 focus:outline-none focus:border-stone-400 shadow-sm"
            >
              <option value="1.25rem">Header Small (1.25rem)</option>
              <option value="3rem">Compact (3rem)</option>
              <option value="4rem">Standard (4rem)</option>
              <option value="6rem">Comfortable (6rem)</option>
              <option value="8rem">Spacious (8rem)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 mb-1">Bottom Spacing (Padding)</label>
            <select
              value={selectedSection.styles.paddingBottom || "4rem"}
              onChange={(e) => handleSectionStyleChange("paddingBottom", e.target.value)}
              className="w-full bg-white border border-stone-200 rounded p-1.5 text-xs text-stone-700 focus:outline-none focus:border-stone-400 shadow-sm"
            >
              <option value="1.25rem">Header Small (1.25rem)</option>
              <option value="3rem">Compact (3rem)</option>
              <option value="4rem">Standard (4rem)</option>
              <option value="6rem">Comfortable (6rem)</option>
              <option value="8rem">Spacious (8rem)</option>
            </select>
          </div>
        </div>
      ) : null}
    </div>
  );
};
