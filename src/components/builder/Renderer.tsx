import React, { useState } from "react";
import { BuilderComponent, Section } from "@/types/builder";
import { useBuilderStore } from "@/store/builderStore";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

interface ComponentRendererProps {
  component: BuilderComponent;
  sectionId: string;
  isEditing?: boolean;
}

// Dedicated NavLinksRenderer to support beautiful mobile menu slide-out drawers inline
export const NavLinksRenderer: React.FC<{ links: Array<{ label: string; href: string }> }> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop/Tablet Horizontal Links (>=768px) */}
      <div className="hidden md:flex items-center gap-8 text-[11px] font-semibold uppercase tracking-wider text-stone-500">
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            className="hover:text-stone-900 transition-colors duration-200"
            onClick={(e) => e.preventDefault()}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Mobile Hamburger Trigger (<768px) */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 text-stone-500 hover:text-stone-900 focus:outline-none transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Expanded Drawer Panel */}
      {isOpen && (
        <div className="absolute top-14 left-0 right-0 bg-white border-b border-stone-200 shadow-xl p-6 flex flex-col gap-4 text-xs font-semibold uppercase tracking-widest text-stone-500 z-50 animate-fadeIn md:hidden">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="hover:text-stone-900 py-2 transition-colors border-b border-stone-50"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  component,
  sectionId,
  isEditing = true,
}) => {
  const { selectedComponentId, selectComponent } = useBuilderStore();
  const isSelected = selectedComponentId === component.id;

  const handleClick = (e: React.MouseEvent) => {
    if (!isEditing) return;
    e.stopPropagation();
    selectComponent(component.id);
  };

  const renderComponentContent = () => {
    const { type, props, styles } = component;

    switch (type) {
      case "Container": {
        // High-fidelity responsive column stacking logic
        // grid-2 stacks on mobile/tablet (<1024px) and aligns 2 columns on desktop (lg:)
        // grid-3 stacks on mobile, splits into 2-columns on tablet (md:), and aligns 3-columns on desktop (lg:)
        // flex-row stacks vertically on mobile/tablet and aligns horizontally on desktop
        const layoutClass =
          props.layout === "grid-2"
            ? "grid grid-cols-1 lg:grid-cols-2"
            : props.layout === "grid-3"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : props.layout === "flex-row"
            ? "flex flex-col md:flex-row md:items-center"
            : "flex flex-col";

        const alignClass = props.align || "";
        const justifyClass = props.justify || "";
        
        // Convert static spacings into beautiful, fluid responsive gaps
        const gapClass =
          props.gap === "4rem"
            ? "gap-6 lg:gap-16"
            : props.gap === "3rem"
            ? "gap-5 lg:gap-12"
            : props.gap === "2rem"
            ? "gap-4 lg:gap-8"
            : props.gap === "1.5rem"
            ? "gap-3 lg:gap-6"
            : props.gap === "1rem"
            ? "gap-3 lg:gap-4"
            : "";

        return (
          <div
            className={cn(layoutClass, alignClass, justifyClass, gapClass, "w-full mx-auto")}
            style={{
              maxWidth: styles.maxWidth || "100%",
              marginTop: styles.marginTop,
              marginBottom: styles.marginBottom,
              textAlign: styles.textAlign as any,
            }}
          >
            {component.children?.map((child) => (
              <ComponentRenderer
                key={child.id}
                component={child}
                sectionId={sectionId}
                isEditing={isEditing}
              />
            ))}
          </div>
        );
      }

      case "Card": {
        const paddingClass = props.padding ? `p-${parseFloat(props.padding) * 4}` : "p-6";
        return (
          <div
            className={cn("flex flex-col h-full", paddingClass)}
            style={{
              backgroundColor: props.bg || "#ffffff",
              borderRadius: styles.borderRadius || "0.5rem",
              border: styles.border || "none",
            }}
          >
            {component.children?.map((child) => (
              <ComponentRenderer
                key={child.id}
                component={child}
                sectionId={sectionId}
                isEditing={isEditing}
              />
            ))}
          </div>
        );
      }

      case "Heading": {
        const Tag = (props.level || "h2") as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
        
        // Fluid font-size scaling using pure CSS clamp calculations for zero overflows
        let fontSize = styles.fontSize;
        if (fontSize === "3.75rem" || fontSize === "3.5rem") {
          fontSize = "clamp(2rem, 7vw, 3.5rem)";
        } else if (fontSize === "3rem") {
          fontSize = "clamp(1.75rem, 6vw, 3rem)";
        } else if (fontSize === "2.25rem") {
          fontSize = "clamp(1.5rem, 5vw, 2.25rem)";
        } else if (fontSize === "2rem") {
          fontSize = "clamp(1.35rem, 4vw, 2rem)";
        } else if (fontSize === "1.5rem" || fontSize === "1.35rem") {
          fontSize = "clamp(1.2rem, 3vw, 1.35rem)";
        }

        return (
          <Tag
            className="font-bold tracking-tight text-balance"
            style={{
              fontSize,
              lineHeight: styles.lineHeight || "1.2",
              fontWeight: styles.fontWeight || "700",
              color: styles.color || "inherit",
              marginBottom: styles.marginBottom,
              textAlign: styles.textAlign as any,
            }}
          >
            {props.text || "Heading"}
          </Tag>
        );
      }

      case "Text": {
        return (
          <p
            className="leading-relaxed text-pretty text-sm md:text-[15px] lg:text-base"
            style={{
              fontSize: styles.fontSize || "inherit",
              fontWeight: styles.fontWeight || "400",
              color: styles.color || "inherit",
              marginBottom: styles.marginBottom,
              textAlign: styles.textAlign as any,
            }}
          >
            {props.text || "Body Text"}
          </p>
        );
      }

      case "Button": {
        const isPrimary = props.variant === "primary";
        const btnStyle: React.CSSProperties = {
          borderRadius: styles.borderRadius || "0px",
          backgroundColor: isPrimary ? styles.background || "var(--primary-color, #111111)" : "transparent",
          color: isPrimary ? styles.color || "#ffffff" : styles.color || "var(--primary-color, #111111)",
          border: isPrimary ? "none" : `1px solid ${styles.color || "var(--border-color, #e7e5e4)"}`,
        };

        return (
          <div className={cn("inline-block", styles.textAlign === "center" ? "mx-auto" : "")}>
            <button
              onClick={(e) => e.preventDefault()}
              className={cn(
                "px-4 md:px-5 py-2 md:py-2.5 font-medium transition-all text-xs md:text-sm tracking-wide uppercase select-none",
                isPrimary ? "shadow-sm hover:opacity-90" : "hover:bg-stone-50"
              )}
              style={btnStyle}
            >
              {props.label || "Click Me"}
            </button>
          </div>
        );
      }

      case "Image": {
        return (
          <div
            className="overflow-hidden relative w-full border border-stone-200/20"
            style={{
              aspectRatio: props.aspectRatio || "16/9",
              borderRadius: styles.borderRadius || "0px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={props.src || "https://images.unsplash.com/photo-1506744038136-46273834b3fb"}
              alt={props.alt || "Placeholder image"}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-[1.01]"
              )}
            />
          </div>
        );
      }

      case "Logo": {
        return (
          <div
            className="font-bold tracking-widest uppercase text-stone-900 shrink-0 select-none"
            style={{
              fontSize: styles.fontSize || "1.05rem",
              fontWeight: styles.fontWeight || "800",
              color: styles.color || "inherit",
            }}
          >
            {props.text || "My Logo"}
          </div>
        );
      }

      case "NavLinks": {
        const linksList = (props.links || []) as Array<{ label: string; href: string }>;
        return <NavLinksRenderer links={linksList} />;
      }

      case "Divider": {
        return (
          <hr
            style={{
              borderColor: styles.borderColor || "var(--border-color, #e7e5e4)",
              borderTopWidth: styles.borderTopWidth || "1px",
              marginTop: styles.marginTop || "1rem",
              marginBottom: styles.marginBottom || "1rem",
            }}
          />
        );
      }

      case "Spacer": {
        return <div className="h-4 md:h-8" style={{ height: props.height || "2rem" }} />;
      }

      default:
        return null;
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative transition-all group/comp",
        isEditing && "cursor-pointer rounded hover:outline-2 hover:outline-dashed hover:outline-indigo-400 hover:outline-offset-2",
        isEditing && isSelected && "outline-2 outline-solid outline-indigo-600 outline-offset-2"
      )}
    >
      {isEditing && isSelected && (
        <span className="absolute -top-6 -left-0.5 bg-indigo-600 text-[10px] text-white font-medium px-1.5 py-0.5 rounded shadow z-50 pointer-events-none">
          {component.type}
        </span>
      )}
      {renderComponentContent()}
    </div>
  );
};

interface SectionRendererProps {
  section: Section;
  isEditing?: boolean;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  section,
  isEditing = true,
}) => {
  const { selectedSectionId, selectSection } = useBuilderStore();
  const isSelected = selectedSectionId === section.id;

  const handleClick = (e: React.MouseEvent) => {
    if (!isEditing) return;
    selectSection(section.id);
  };

  // Converts hardcoded static padding strings (e.g. "5.5rem") to responsive CSS calc scaling blocks!
  const parsePaddingValue = (val: string | undefined, defaultVal: string) => {
    const rawVal = val || defaultVal;
    if (rawVal.endsWith("rem")) {
      const num = parseFloat(rawVal);
      return `calc(var(--spacing-factor, 1) * ${num}rem)`;
    }
    return rawVal;
  };

  const sectionStyle: React.CSSProperties = {
    backgroundColor: section.styles.background || "#ffffff",
    paddingTop: parsePaddingValue(section.styles.paddingTop, "4rem"),
    paddingBottom: parsePaddingValue(section.styles.paddingBottom, "4rem"),
    borderBottom: section.styles.borderBottom || "none",
  };

  return (
    <section
      onClick={handleClick}
      className={cn(
        "relative transition-all w-full",
        isEditing && "hover:outline-2 hover:outline-dashed hover:outline-indigo-500 hover:outline-offset-[-2px] cursor-pointer",
        isEditing && isSelected && "outline-2 outline-solid outline-indigo-600 outline-offset-[-2px]"
      )}
      style={sectionStyle}
    >
      {isEditing && isSelected && (
        <span className="absolute top-2 left-2 bg-indigo-600 text-xs text-white font-semibold px-2 py-1 rounded shadow z-40 pointer-events-none">
          {section.name}
        </span>
      )}
      {/* Set tight, responsive page gutters (px-4 sm:px-8 lg:px-12) to absorb content on mobile */}
      <div className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
        {section.components.map((comp) => (
          <ComponentRenderer
            key={comp.id}
            component={comp}
            sectionId={section.id}
            isEditing={isEditing}
          />
        ))}
      </div>
    </section>
  );
};
