import React from "react";
import { BuilderComponent, Section } from "@/types/builder";
import { useBuilderStore } from "@/store/builderStore";
import { cn } from "@/lib/utils";

interface ComponentRendererProps {
  component: BuilderComponent;
  sectionId: string;
  isEditing?: boolean;
}

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
        const layoutClass =
          props.layout === "grid-2"
            ? "grid grid-cols-1 md:grid-cols-2"
            : props.layout === "grid-3"
            ? "grid grid-cols-1 md:grid-cols-3"
            : props.layout === "flex-row"
            ? "flex flex-col sm:flex-row"
            : "flex flex-col";

        const alignClass = props.align || "";
        const justifyClass = props.justify || "";
        const gapClass =
          props.gap === "1rem"
            ? "gap-4"
            : props.gap === "1.5rem"
            ? "gap-6"
            : props.gap === "2rem"
            ? "gap-8"
            : props.gap === "3rem"
            ? "gap-12"
            : props.gap === "4rem"
            ? "gap-16"
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
        return (
          <Tag
            className="font-bold tracking-tight"
            style={{
              fontSize: styles.fontSize,
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
            className="leading-relaxed"
            style={{
              fontSize: styles.fontSize || "1rem",
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
          borderRadius: styles.borderRadius || "0.375rem",
          backgroundColor: isPrimary ? styles.background || "#4f46e5" : "transparent",
          color: isPrimary ? styles.color || "#ffffff" : styles.color || "#4f46e5",
          border: isPrimary ? "none" : `1px solid ${styles.color || "#4f46e5"}`,
        };

        return (
          <div className={cn("inline-block", styles.textAlign === "center" ? "mx-auto" : "")}>
            <button
              onClick={(e) => e.preventDefault()}
              className={cn(
                "px-5 py-2.5 font-medium transition-all text-sm pointer-events-none sm:pointer-events-auto",
                isPrimary ? "shadow-sm hover:opacity-90" : "hover:bg-neutral-50"
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
            className="overflow-hidden relative w-full"
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
                "absolute inset-0 w-full h-full",
                props.objectFit === "contain" ? "object-contain" : "object-cover"
              )}
            />
          </div>
        );
      }

      case "Logo": {
        return (
          <div
            className="font-bold tracking-tight"
            style={{
              fontSize: styles.fontSize || "1.25rem",
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
        return (
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
            {linksList.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="hover:text-neutral-900 transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                {link.label}
              </a>
            ))}
          </div>
        );
      }

      case "Divider": {
        return (
          <hr
            style={{
              borderColor: styles.borderColor || "#e5e7eb",
              borderTopWidth: styles.borderTopWidth || "1px",
              marginTop: styles.marginTop || "1rem",
              marginBottom: styles.marginBottom || "1rem",
            }}
          />
        );
      }

      case "Spacer": {
        return <div style={{ height: props.height || "2rem" }} />;
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

  // Convert custom section background/paddings to inline styles
  const sectionStyle: React.CSSProperties = {
    backgroundColor: section.styles.background || "#ffffff",
    paddingTop: section.styles.paddingTop || "4rem",
    paddingBottom: section.styles.paddingBottom || "4rem",
    borderBottom: section.styles.borderBottom || "none",
  };

  return (
    <section
      onClick={handleClick}
      className={cn(
        "relative transition-all",
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
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
