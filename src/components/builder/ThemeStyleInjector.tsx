import React from "react";
import { Theme } from "@/types/builder";

interface ThemeStyleInjectorProps {
  theme: Theme;
}

export const ThemeStyleInjector: React.FC<ThemeStyleInjectorProps> = ({ theme }) => {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@100..900&family=Syne:wght@400..800&family=Cabinet+Grotesk:wght@400..900&family=Cinzel:wght@400..900&family=Instrument+Serif:ital,wght@0,400;1,400&display=swap');

      :root {
        --primary-color: ${theme.colors.primary};
        --secondary-color: ${theme.colors.secondary};
        --background-color: ${theme.colors.background};
        --surface-color: ${theme.colors.surface};
        --text-color: ${theme.colors.text};
        --muted-color: ${theme.colors.muted};
        --border-color: ${theme.colors.border};
        --border-radius: ${theme.radius};
        
        /* Spacing scaling factor - reduces paddings proportionately across smaller screens */
        --spacing-factor: 1;
      }

      .canvas-container,
      .canvas-container * {
        font-family: ${theme.typography.fontFamily.body} !important;
      }

      .canvas-container h1,
      .canvas-container h2,
      .canvas-container h3,
      .canvas-container h4,
      .canvas-container h5,
      .canvas-container h6,
      .canvas-container h1 *,
      .canvas-container h2 *,
      .canvas-container h3 *,
      .canvas-container h4 *,
      .canvas-container h5 *,
      .canvas-container h6 *,
      .canvas-container .comp-logo,
      .canvas-container .comp-logo * {
        font-family: ${theme.typography.fontFamily.heading} !important;
      }
      
      .canvas-container {
        background-color: var(--background-color);
        color: var(--text-color);
        
        /* Container queries activation - lets fluid clamp() calculate based on actual parent width! */
        container-type: inline-size;
        container-name: canvas;
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
  );
};
