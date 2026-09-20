import React, { useState, useEffect } from "react";
import { BuilderComponent, Section } from "@/types/builder";
import { useBuilderStore } from "@/store/builderStore";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ComponentRendererProps {
  component: BuilderComponent;
  sectionId: string;
  isEditing?: boolean;
  onImageClick?: (compId: string) => void;
}

// Fluid font-size scaling using CSS Container Query Widths (cqw)
// This guarantees perfect fluid typography based on actual canvas container width,
// triggering seamlessly both on real device resize operations and editor viewport buttons!
export const getResponsiveFontSize = (fontSize: string | undefined): string | undefined => {
  if (!fontSize) return undefined;
  
  if (fontSize.endsWith("rem")) {
    const val = parseFloat(fontSize);
    if (val >= 4.5) {
      // 4.5rem (72px) scales down to 2.25rem (36px) on mobile viewports
      return `clamp(2.25rem, 11cqw, ${val}rem)`;
    }
    if (val >= 3.5) {
      // 3.5rem - 4.0rem scales down to 2rem (32px) on mobile viewports
      return `clamp(2rem, 10cqw, ${val}rem)`;
    }
    if (val >= 2.5) {
      // 3rem scales down to 1.75rem (28px) on mobile viewports
      return `clamp(1.75rem, 8cqw, ${val}rem)`;
    }
    if (val >= 2.0) {
      // 2rem - 2.5rem scales down to 1.5rem (24px) on mobile viewports
      return `clamp(1.5rem, 6cqw, ${val}rem)`;
    }
    if (val >= 1.25) {
      // 1.25rem - 1.5rem scales down to 1.15rem (18.4px) on mobile viewports
      return `clamp(1.15rem, 4cqw, ${val}rem)`;
    }
    if (val >= 1.0) {
      // Body text 1.125rem (18px) scales down to 0.95rem (15.2px) on mobile viewports
      return `clamp(0.95rem, 3cqw, ${val}rem)`;
    }
  }
  return fontSize;
};

// Dedicated NavLinksRenderer to support beautiful mobile menu slide-out drawers inline
export const NavLinksRenderer: React.FC<{ links: Array<{ label: string; href: string }> }> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Resize listener: close menu deterministically if resizing past tablet/desktop width (768px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keyboard accessibility: Escape key closes active mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Prevent unwanted background scrolling on preview container (isolated from Editor UI!)
  useEffect(() => {
    const scrollContainer = document.querySelector(".canvas-container")?.parentElement;
    if (isOpen) {
      if (scrollContainer) {
        scrollContainer.style.overflowY = "hidden";
      }
    } else {
      if (scrollContainer) {
        scrollContainer.style.overflowY = "auto";
      }
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.style.overflowY = "auto";
      }
    };
  }, [isOpen]);

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
          aria-expanded={isOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Expanded Drawer Panel - Theme Token Aware & Fully Accessible */}
      {isOpen && (
        <div
          id="mobile-nav-drawer"
          className="absolute top-14 left-0 right-0 p-6 flex flex-col gap-4 text-xs font-semibold uppercase tracking-widest z-50 animate-fadeIn md:hidden shadow-xl"
          style={{
            background: "var(--background-color)",
            borderBottom: "1px solid var(--border-color)",
            color: "var(--text-color)"
          }}
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-4">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="py-2.5 transition-colors"
                style={{
                  borderBottom: "1px solid var(--border-color)",
                  color: "var(--text-color)"
                }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  component,
  sectionId,
  isEditing = true,
  onImageClick,
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
                onImageClick={onImageClick}
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
                onImageClick={onImageClick}
              />
            ))}
          </div>
        );
      }

      case "Heading": {
        const Tag = (props.level || "h2") as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
        
        return (
          <Tag
            className="font-bold tracking-tight text-balance"
            style={{
              fontSize: getResponsiveFontSize(styles.fontSize),
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
            className="leading-relaxed text-pretty"
            style={{
              fontSize: getResponsiveFontSize(styles.fontSize || "1.125rem"),
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
        const handleImageClickTrigger = (e: React.MouseEvent) => {
          if (!isEditing && onImageClick) {
            e.stopPropagation();
            onImageClick(component.id);
          }
        };

        return (
          <div
            onClick={handleImageClickTrigger}
            className={cn(
              "overflow-hidden relative w-full border border-stone-200/20",
              !isEditing && onImageClick && "cursor-zoom-in"
            )}
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
            className="font-bold tracking-widest uppercase text-stone-900 shrink-0 select-none animate-none"
            style={{
              fontSize: styles.fontSize || "0.875rem",
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
        `comp-${component.type.toLowerCase()}`,
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

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Recursively collect all Image components under this section
  const sectionImages: BuilderComponent[] = [];
  const gatherImages = (comp: BuilderComponent) => {
    if (comp.type === "Image") {
      sectionImages.push(comp);
    }
    if (comp.children) {
      comp.children.forEach(gatherImages);
    }
  };
  section.components.forEach(gatherImages);

  const handleImageClick = (compId: string) => {
    // If lightbox is explicitly disabled at Section Container props level, do not open
    const isLightboxEnabled = section.components[0]?.props?.lightboxEnabled !== false;
    if (!isLightboxEnabled) return;

    const clickedIdx = sectionImages.findIndex((img) => img.id === compId);
    if (clickedIdx !== -1) {
      setActiveImageIndex(clickedIdx);
      setIsLightboxOpen(true);
    }
  };

  const handleNext = () => {
    const isLoopEnabled = section.components[0]?.props?.loopGallery !== false;
    setActiveImageIndex((prev) => {
      if (prev === sectionImages.length - 1) {
        return isLoopEnabled ? 0 : prev;
      }
      return prev + 1;
    });
  };

  const handlePrev = () => {
    const isLoopEnabled = section.components[0]?.props?.loopGallery !== false;
    setActiveImageIndex((prev) => {
      if (prev === 0) {
        return isLoopEnabled ? sectionImages.length - 1 : prev;
      }
      return prev - 1;
    });
  };

  // Keyboard navigation & Escape closures
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, activeImageIndex, sectionImages]);

  // Lock scroll on preview viewport parent container when open
  useEffect(() => {
    const scrollContainer = document.querySelector(".canvas-container")?.parentElement;
    if (isLightboxOpen) {
      if (scrollContainer) {
        scrollContainer.style.overflowY = "hidden";
      }
    } else {
      if (scrollContainer) {
        scrollContainer.style.overflowY = "auto";
      }
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.style.overflowY = "auto";
      }
    };
  }, [isLightboxOpen]);

  // Swipe / touch detection
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handlePointerDown = (e: React.PointerEvent) => {
    setTouchStart(e.clientX);
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    if (touchStart === null) return;
    const diffX = touchStart - e.clientX;
    const threshold = 50;
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStart(null);
  };

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
      id={section.id}
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
            onImageClick={handleImageClick}
          />
        ))}
      </div>

      {/* Shared Gallery Lightbox overlay bounded perfectly inside preview viewport context */}
      {isLightboxOpen && sectionImages.length > 0 && (
        <div
          id="gallery-lightbox"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          className="absolute inset-0 bg-neutral-950/95 flex flex-col items-center justify-between p-6 z-[100] animate-fadeIn select-none"
          role="dialog"
          aria-modal="true"
          aria-label="Image Gallery Lightbox"
        >
          {/* Backdrop click dismiss trigger */}
          <div className="absolute inset-0 z-10 cursor-default" onClick={() => setIsLightboxOpen(false)} />

          {/* Header row: image counter + close button */}
          <div className="w-full flex justify-between items-center z-20 text-neutral-400 font-semibold text-sm">
            <span className="font-mono text-xs">{activeImageIndex + 1} / {sectionImages.length}</span>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 hover:text-white transition-colors focus:outline-none"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6 animate-none" />
            </button>
          </div>

          {/* Center row: prev button, image, next button */}
          <div className="w-full flex-1 flex items-center justify-between gap-4 z-20 relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="p-3 text-neutral-400 hover:text-white transition-colors focus:outline-none"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div className="flex-1 max-w-[85%] h-[55vh] md:h-[65vh] flex items-center justify-center relative overflow-hidden">
              <img
                src={sectionImages[activeImageIndex]?.props?.src}
                alt={sectionImages[activeImageIndex]?.props?.alt || "Gallery Image"}
                className="max-w-full max-h-full object-contain transition-transform duration-300 pointer-events-none"
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="p-3 text-neutral-400 hover:text-white transition-colors focus:outline-none"
              aria-label="Next Image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>

          {/* Footer row: Caption based on alt text */}
          <div className="w-full text-center z-20 text-neutral-300 text-sm max-w-[600px] mx-auto min-h-[24px]">
            <p className="font-medium tracking-wide">{sectionImages[activeImageIndex]?.props?.alt || ""}</p>
          </div>
        </div>
      )}
    </section>
  );
};
