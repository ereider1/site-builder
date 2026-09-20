import { BlockDefinition } from "@/types/builder";
import { createHeroEditorialSplitBlock } from "./blocks/heroEditorialSplit";
import { createHeroCenteredBlock } from "./blocks/heroCentered";
import { createHeroFullImageBlock } from "./blocks/heroFullImage";
import { createServicesEditorialListBlock } from "./blocks/servicesEditorialList";
import { createServicesThreeColumnBlock } from "./blocks/servicesThreeColumn";
import { createFeaturesThreeColumnBlock } from "./blocks/featuresThreeColumn";
import { createFeaturesThreeColumnCardsBlock } from "./blocks/featuresThreeColumnCards";
import { createFeaturesImageListBlock } from "./blocks/featuresImageList";
import { createFeaturesAlternatingBlock } from "./blocks/featuresAlternating";
import { createFeaturesEditorialListBlock } from "./blocks/featuresEditorialList";
import { createFeaturesAsymmetricGridBlock } from "./blocks/featuresAsymmetricGrid";
import { createFeaturesStatementBlock } from "./blocks/featuresStatement";
import { createContentCenteredColumnsBlock } from "./blocks/contentCenteredColumns";
import { createContentImageGridBlock } from "./blocks/contentImageGrid";
import { createContentTextGridBlock } from "./blocks/contentTextGrid";
import { createContentSplitEditorialBlock } from "./blocks/contentSplitEditorial";
import { createContentImageTextBlock } from "./blocks/contentImageText";
import { createContentQuoteImageBlock } from "./blocks/contentQuoteImage";
import { createContentFeaturedStoriesBlock } from "./blocks/contentFeaturedStories";

// 5 New Team Blocks
import { createTeamFourColumnBlock } from "./blocks/teamFourColumn";
import { createTeamImageBioRowsBlock } from "./blocks/teamImageBioRows";
import { createTeamEightGridBlock } from "./blocks/teamEightGrid";
import { createTeamFeaturedBlock } from "./blocks/teamFeatured";
import { createTeamEditorialListBlock } from "./blocks/teamEditorialList";

// 5 New Testimonial Blocks
import { createTestimonialTwoColumnBlock } from "./blocks/testimonialTwoColumn";
import { createTestimonialLargeQuoteBlock } from "./blocks/testimonialLargeQuote";
import { createTestimonialThreeColumnBlock } from "./blocks/testimonialThreeColumn";
import { createTestimonialQuoteImageBlock } from "./blocks/testimonialQuoteImage";
import { createTestimonialEditorialListBlock } from "./blocks/testimonialEditorialList";

export const starterBlocksRegistry: BlockDefinition[] = [
  // 1. HERO CATEGORY
  {
    id: "hero-editorial-split",
    name: "Hero — Editorial Split",
    category: "Hero",
    description: "A premium editorial hero with oversized typography, supporting copy, actions, and a large visual portrait workspace photo.",
    previewImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
    createSection: createHeroEditorialSplitBlock,
  },
  {
    id: "hero-centered",
    name: "Hero — Centered",
    category: "Hero",
    description: "A gorgeous symmetric hero with centralized display typography, clear action buttons, and a widescreen lower visual showcase.",
    previewImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
    createSection: createHeroCenteredBlock,
  },
  {
    id: "hero-full-image",
    name: "Hero — Full Image",
    category: "Hero",
    description: "An immersive widescreen full-width visual banner flowing into a sophisticated asymmetric split text introduction directly below.",
    previewImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
    createSection: createHeroFullImageBlock,
  },

  // 2. SERVICES CATEGORY
  {
    id: "services-editorial-list",
    name: "Services — Editorial List",
    category: "Services",
    description: "An elegant, structured numbered service list separated by fine rules and featuring beautiful balanced typography.",
    previewImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
    createSection: createServicesEditorialListBlock,
  },
  {
    id: "services-three-column",
    name: "Services — Three Column",
    category: "Services",
    description: "A clean 3-column services grid featuring refined, sharp-geometry cards with fine-scaled borders and generous line space.",
    previewImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
    createSection: createServicesThreeColumnBlock,
  },

  // 3. FEATURES CATEGORY
  {
    id: "features-three-column",
    name: "Features — Three Column",
    category: "Features",
    description: "Centered heading followed by three evenly spaced feature columns separated by thin borders and large numbers.",
    previewImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
    createSection: createFeaturesThreeColumnBlock,
  },
  {
    id: "features-three-column-cards",
    name: "Features — Three Column Cards",
    category: "Features",
    description: "Three clean, sharp-geometry, and ultra-restrained cards featuring visual indicators, headers, and secondary buttons.",
    previewImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
    createSection: createFeaturesThreeColumnCardsBlock,
  },
  {
    id: "features-image-list",
    name: "Features — Image + List",
    category: "Features",
    description: "A highly prominent visual portrait photo left paired adjacent with a spacious horizontal numbered feature list right.",
    previewImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80",
    createSection: createFeaturesImageListBlock,
  },
  {
    id: "features-alternating",
    name: "Features — Alternating",
    category: "Features",
    description: "Multiple feature rows with alternating image/text visual columns to create a majestic page scrolling rhythm.",
    previewImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
    createSection: createFeaturesAlternatingBlock,
  },
  {
    id: "features-editorial-list",
    name: "Features — Editorial List",
    category: "Features",
    description: "A large practice heading followed by numbered horizontal feature rows with minimalist borders and action arrows.",
    previewImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
    createSection: createFeaturesEditorialListBlock,
  },
  {
    id: "features-asymmetric-grid",
    name: "Features — Asymmetric Grid",
    category: "Features",
    description: "An intentionally staggered, uneven grid layout pairing a wide directive card with stacked, narrow feature cards.",
    previewImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
    createSection: createFeaturesAsymmetricGridBlock,
  },
  {
    id: "features-statement",
    name: "Features — Statement + Features",
    category: "Features",
    description: "A massive, oversized left column editorial statement balanced with stacked, numbered right column support features.",
    previewImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
    createSection: createFeaturesStatementBlock,
  },

  // 4. CONTENT CATEGORY
  {
    id: "content-centered-columns",
    name: "Content — Centered Intro + Columns",
    category: "Content",
    description: "Large centered introduction paragraph balanced with three clean, text-based columns representing details.",
    previewImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
    createSection: createContentCenteredColumnsBlock,
  },
  {
    id: "content-image-grid",
    name: "Content — Image Grid",
    category: "Content",
    description: "A beautiful, spacious rows grid of editorial stories containing a widescreen photo, category, title, and body.",
    previewImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
    createSection: createContentImageGridBlock,
  },
  {
    id: "content-text-grid",
    name: "Content — Grid of Text Blocks",
    category: "Content",
    description: "A structured, quiet grid layout comprising 6 small cards with thin borders and extensive breathing whitespace.",
    previewImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
    createSection: createContentTextGridBlock,
  },
  {
    id: "content-split-editorial",
    name: "Content — Split Editorial",
    category: "Content",
    description: "A gorgeous split layout with heavy bold story statements left, and multiple supporting story copy columns right.",
    previewImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
    createSection: createContentSplitEditorialBlock,
  },
  {
    id: "content-image-text",
    name: "Content — Split Image + Text",
    category: "Content",
    description: "Spacious portrait photo layout on the left, balanced with comprehensive story content and labels on the right.",
    previewImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80",
    createSection: createContentImageTextBlock,
  },
  {
    id: "content-quote-image",
    name: "Content — Quote + Image",
    category: "Content",
    description: "A massive, prominent editorial pull-quote left matched with a beautifully balanced square photo landscape on the right.",
    previewImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
    createSection: createContentQuoteImageBlock,
  },
  {
    id: "content-featured-stories",
    name: "Content — Image + Three Stories",
    category: "Content",
    description: "A large featured story block with widescreen image on the left, balanced with smaller vertical story units on the right.",
    previewImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
    createSection: createContentFeaturedStoriesBlock,
  },

  // 5. TEAM CATEGORY (Phase Team complete)
  {
    id: "team-four-column",
    name: "Team — Four Column",
    category: "Team",
    description: "A clean, horizontal row of team member portraits, with their names, roles, and fine spacing grid alignment.",
    previewImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    createSection: createTeamFourColumnBlock,
  },
  {
    id: "team-image-bio-rows",
    name: "Team — Image + Bio Rows",
    category: "Team",
    description: "Spacious alternating/standard rows pairing square team portraits left with detailed role bios on the right.",
    previewImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    createSection: createTeamImageBioRowsBlock,
  },
  {
    id: "team-eight-grid",
    name: "Team — Eight Person Grid",
    category: "Team",
    description: "A dense, high-impact scannable grid showcasing 8 team member portraits side-by-side with minimal textual descriptions.",
    previewImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    createSection: createTeamEightGridBlock,
  },
  {
    id: "team-featured",
    name: "Team — Featured Person",
    category: "Team",
    description: "A visually majestic lead person portrait left balanced adjacent with a vertical support list of group directors right.",
    previewImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    createSection: createTeamFeaturedBlock,
  },
  {
    id: "team-editorial-list",
    name: "Team — Editorial List",
    category: "Team",
    description: "A gorgeous typography-driven team directory index separated by thin, clean rules and right-pointing indicators.",
    previewImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
    createSection: createTeamEditorialListBlock,
  },

  // 6. TESTIMONIAL CATEGORY (Phase Testimonial complete)
  {
    id: "testimonial-two-column",
    name: "Testimonial — Two Column",
    category: "Testimonial",
    description: "Two clean, understated client testimonial cards side-by-side on desktop, stacking beautifully on mobile screens.",
    previewImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
    createSection: createTestimonialTwoColumnBlock,
  },
  {
    id: "testimonial-large-quote",
    name: "Testimonial — Large Quote",
    category: "Testimonial",
    description: "One giant centered client quote statement forming the absolute focal point of strategic credibility and voice.",
    previewImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
    createSection: createTestimonialLargeQuoteBlock,
  },
  {
    id: "testimonial-three-column",
    name: "Testimonial — Three Column",
    category: "Testimonial",
    description: "Three horizontal client testimonials separated by fine top-borders, utilizing light visual layouts.",
    previewImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
    createSection: createTestimonialThreeColumnBlock,
  },
  {
    id: "testimonial-quote-image",
    name: "Testimonial — Quote + Image",
    category: "Testimonial",
    description: "Large quote statement column on the left balanced adjacent with a square portrait of the client on the right.",
    previewImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    createSection: createTestimonialQuoteImageBlock,
  },
  {
    id: "testimonial-editorial-list",
    name: "Testimonial — Editorial List",
    category: "Testimonial",
    description: "Several high-end client quote statements stacked vertically and divided by fine, minimalist horizontal rule lines.",
    previewImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
    createSection: createTestimonialEditorialListBlock,
  },
];

export const findBlockById = (id: string): BlockDefinition | null => {
  return starterBlocksRegistry.find((b) => b.id === id) || null;
};
