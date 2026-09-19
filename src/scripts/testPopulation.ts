import { createDefaultProject } from "../lib/defaultProject";
import { populateProject, UserContent } from "../lib/contentSlots";
import { findComponent } from "../lib/treeUtils";

// Assert helper to simplify verification
function assertEquals(actual: any, expected: any, testName: string) {
  if (actual === expected) {
    console.log(`✅ PASS: ${testName}`);
  } else {
    console.error(`❌ FAIL: ${testName}`);
    console.error(`   Expected: "${expected}"`);
    console.error(`   Actual:   "${actual}"`);
    process.exit(1);
  }
}

function runTests() {
  console.log("==================================================");
  console.log("STARTING PHASE F CONTENT SLOTS VALIDATION TESTS");
  console.log("==================================================");

  // 1. Get base read-only template source
  const baseTemplateProject = createDefaultProject();

  // 2. Define standard test profile
  const testProfile: UserContent = {
    business: {
      businessName: "Harbor & Co.",
      tagline: "Clarity for what's next.",
      description: "We help growing businesses turn complex challenges into clear strategies and thoughtful digital experiences.",
      phone: "+1 555 010 2040",
      email: "hello@harbor.example",
      address: "120 Market Street",
      city: "San Francisco",
      country: "United States",
    },
    brand: {
      heroImage: "https://images.unsplash.com/photo-custom-hero-test-url",
      aboutImage: "https://images.unsplash.com/photo-custom-about-test-url",
      featuredWorkImage: "https://images.unsplash.com/photo-custom-work-test-url",
    }
  };

  // 3. Clone and populate Clone A
  const cloneA = JSON.parse(JSON.stringify(baseTemplateProject));
  const populatedCloneA = populateProject(cloneA, testProfile);

  console.log("\n--- TEST: DETERMINISTIC POPULATION ACCURACY ---");
  
  // Navigation Name
  const navLogoA = findComponent(populatedCloneA.pages[0].sections[0].components, "comp-nav-logo");
  assertEquals(navLogoA?.props.text, "Harbor & Co.", "Clone A navigation brand name updated");

  // Hero Headline
  const heroHeadingA = findComponent(populatedCloneA.pages[0].sections[1].components, "comp-hero-heading");
  assertEquals(heroHeadingA?.props.text, "Clarity for what's next.", "Clone A hero tagline updated");

  // Hero Description
  const heroDescA = findComponent(populatedCloneA.pages[0].sections[1].components, "comp-hero-text");
  assertEquals(heroDescA?.props.text, "We help growing businesses turn complex challenges into clear strategies and thoughtful digital experiences.", "Clone A hero description updated");

  // Hero Image
  const heroImgA = findComponent(populatedCloneA.pages[0].sections[1].components, "comp-hero-image");
  assertEquals(heroImgA?.props.src, "https://images.unsplash.com/photo-custom-hero-test-url", "Clone A hero image updated");

  // About Image
  const aboutImgA = findComponent(populatedCloneA.pages[0].sections[4].components, "comp-about-image");
  assertEquals(aboutImgA?.props.src, "https://images.unsplash.com/photo-custom-about-test-url", "Clone A about image updated");

  // Footer Contacts
  const footerEmailA = findComponent(populatedCloneA.pages[0].sections[9].components, "comp-footer-email");
  assertEquals(footerEmailA?.props.text, "hello@harbor.example", "Clone A footer email updated");

  const footerPhoneA = findComponent(populatedCloneA.pages[0].sections[9].components, "comp-footer-phone");
  assertEquals(footerPhoneA?.props.text, "+1 555 010 2040", "Clone A footer phone updated");

  const footerAddressA = findComponent(populatedCloneA.pages[0].sections[9].components, "comp-footer-address");
  assertEquals(footerAddressA?.props.text, "120 Market Street", "Clone A footer address updated");

  console.log("\n--- TEST: TEMPLATE OWNED CONTENT CHECKS ---");
  
  // Testimonial remains untouched
  const testimonialHeading = findComponent(populatedCloneA.pages[0].sections[7].components, "comp-testimonial-quote");
  assertEquals(testimonialHeading?.props.text, "\"Northstar helped us turn a complicated business challenge into a clear and actionable plan.\"", "Testimonial content remains unchanged");

  // Process remains untouched
  const processStep1 = findComponent(populatedCloneA.pages[0].sections[5].components, "comp-step1-title");
  assertEquals(processStep1?.props.text, "01 — Discover", "Process heading content remains unchanged");

  console.log("\n--- TEST: CLONE SOURCE ISOLATION CHECKS ---");

  // Assert base template remains unchanged (absolute safety)
  const templateNavLogo = findComponent(baseTemplateProject.pages[0].sections[0].components, "comp-nav-logo");
  assertEquals(templateNavLogo?.props.text, "NORTHSTAR STUDIO", "Source base template is read-only and remains unchanged");

  console.log("\n--- TEST: MULTIPLE MUTUALLY ISOLATED CLONES CHECKS ---");

  // Spawn Clone B with different profile
  const cloneB = JSON.parse(JSON.stringify(baseTemplateProject));
  const testProfileB: UserContent = {
    business: {
      businessName: "Zen Design Group",
      tagline: "Spaces that breathe.",
    }
  };
  const populatedCloneB = populateProject(cloneB, testProfileB);

  // Assert B changes don't affect A, and B is correct
  const navLogoB = findComponent(populatedCloneB.pages[0].sections[0].components, "comp-nav-logo");
  assertEquals(navLogoB?.props.text, "Zen Design Group", "Clone B navigation name updated independently");
  assertEquals(navLogoA?.props.text, "Harbor & Co.", "Clone A navigation remains unchanged by Clone B changes");

  console.log("\n--- TEST: SAFE FALLBACK Safeguards ---");

  // Profile with missing/empty fields
  const emptyProfile: UserContent = {
    business: {
      businessName: "", // Empty string
      tagline: undefined, // Undefined
    }
  };
  const populatedCloneFallback = populateProject(cloneA, emptyProfile);
  const fallbackLogo = findComponent(populatedCloneFallback.pages[0].sections[0].components, "comp-nav-logo");
  const fallbackTagline = findComponent(populatedCloneFallback.pages[0].sections[1].components, "comp-hero-heading");

  assertEquals(fallbackLogo?.props.text, "NORTHSTAR STUDIO", "Empty business name preserves standard template copy");
  assertEquals(fallbackTagline?.props.text, "Build a business ready for what comes next.", "Undefined tagline preserves standard template tagline");

  console.log("\n--- TEST: DELIBERATELY LONG CONTENT STRUCTURAL CHECKS ---");

  const longProfile: UserContent = {
    business: {
      businessName: "International Strategic Growth & Digital Transformation Consulting Partners Global Group",
      tagline: "Helping ambitious organizations navigate complex transformation and build businesses prepared for what comes next.",
      description: "A deliberately long description designed to test how real-world client content behaves inside the existing template."
    }
  };
  const populatedCloneLong = populateProject(cloneA, longProfile);
  const longLogo = findComponent(populatedCloneLong.pages[0].sections[0].components, "comp-nav-logo");
  const longTagline = findComponent(populatedCloneLong.pages[0].sections[1].components, "comp-hero-heading");

  assertEquals(longLogo?.props.text, "International Strategic Growth & Digital Transformation Consulting Partners Global Group", "Long business name applied correctly");
  assertEquals(longTagline?.props.text, "Helping ambitious organizations navigate complex transformation and build businesses prepared for what comes next.", "Long tagline applied correctly");

  // Ensure sections are not deleted or layout compromised
  assertEquals(populatedCloneLong.pages[0].sections.length, baseTemplateProject.pages[0].sections.length, "Total sections length remains identical after long content load");

  console.log("\n==================================================");
  console.log("🎉 ALL PHASE F VALIDATION TESTS PASSED SUCCESSFULLY!");
  console.log("==================================================");
}

runTests();
