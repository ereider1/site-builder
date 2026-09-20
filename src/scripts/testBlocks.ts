import { useBuilderStore } from "../store/builderStore";
import { starterBlocksRegistry, findBlockById } from "../lib/blocksRegistry";
import { findComponent } from "../lib/treeUtils";
import { UserContent, populateProject } from "../lib/contentSlots";

// Mock localStorage for Node environment execution
const storage: Record<string, string> = {};
const mockLocalStorage = {
  getItem: (key: string) => storage[key] || null,
  setItem: (key: string, value: string) => {
    storage[key] = value;
  },
  removeItem: (key: string) => {
    delete storage[key];
  },
  clear: () => {
    for (const k in storage) delete storage[k];
  },
  length: 0,
  key: (index: number) => null,
};

global.localStorage = mockLocalStorage as any;

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

function runBlockLibraryTests() {
  console.log("==================================================");
  console.log("STARTING NATIVE BLOCK & BLOCK LIBRARY UNIT TESTS");
  console.log("==================================================");

  // Clear previous states
  mockLocalStorage.clear();

  // 1. Registry Contains All 30 Blocks (Phase Navigation Foundation complete)
  assertEquals(starterBlocksRegistry.length, 30, "Blocks Registry contains exactly 30 blocks total");
  
  const navMinimalDef = findBlockById("navigation-minimal");
  assertEquals(navMinimalDef !== null, true, "Block Registry contains navigation-minimal");
  assertEquals(navMinimalDef?.category, "HEADER", "navigation-minimal categorized under HEADER");

  const heroSplitDef = findBlockById("hero-editorial-split");
  assertEquals(heroSplitDef !== null, true, "Block Registry contains hero-editorial-split");
  
  const heroCenteredDef = findBlockById("hero-centered");
  assertEquals(heroCenteredDef !== null, true, "Block Registry contains hero-centered");
  assertEquals(heroCenteredDef?.category, "Hero", "Hero Centered categorized under Hero");

  const heroFullImageDef = findBlockById("hero-full-image");
  assertEquals(heroFullImageDef !== null, true, "Block Registry contains hero-full-image");
  assertEquals(heroFullImageDef?.category, "Hero", "Hero Full Image categorized under Hero");

  const servicesListDef = findBlockById("services-editorial-list");
  assertEquals(servicesListDef !== null, true, "Block Registry contains services-editorial-list");
  assertEquals(servicesListDef?.category, "Services", "Services Editorial List categorized under Services");

  const servicesThreeColumnDef = findBlockById("services-three-column");
  assertEquals(servicesThreeColumnDef !== null, true, "Block Registry contains services-three-column");
  assertEquals(servicesThreeColumnDef?.category, "Services", "Services Three Column categorized under Services");

  // Verify Features Blocks are Registered
  const f1Def = findBlockById("features-three-column");
  assertEquals(f1Def !== null, true, "Block Registry contains features-three-column");
  assertEquals(f1Def?.category, "Features", "features-three-column categorized under Features");

  const f2Def = findBlockById("features-three-column-cards");
  assertEquals(f2Def !== null, true, "Block Registry contains features-three-column-cards");

  const f3Def = findBlockById("features-image-list");
  assertEquals(f3Def !== null, true, "Block Registry contains features-image-list");

  const f4Def = findBlockById("features-alternating");
  assertEquals(f4Def !== null, true, "Block Registry contains features-alternating");

  const f5Def = findBlockById("features-editorial-list");
  assertEquals(f5Def !== null, true, "Block Registry contains features-editorial-list");

  const f6Def = findBlockById("features-asymmetric-grid");
  assertEquals(f6Def !== null, true, "Block Registry contains features-asymmetric-grid");

  const f7Def = findBlockById("features-statement");
  assertEquals(f7Def !== null, true, "Block Registry contains features-statement");

  // Verify Content Blocks are Registered
  const c1Def = findBlockById("content-centered-columns");
  assertEquals(c1Def !== null, true, "Block Registry contains content-centered-columns");
  assertEquals(c1Def?.category, "Content", "content-centered-columns categorized under Content");

  const c2Def = findBlockById("content-image-grid");
  assertEquals(c2Def !== null, true, "Block Registry contains content-image-grid");

  const c3Def = findBlockById("content-text-grid");
  assertEquals(c3Def !== null, true, "Block Registry contains content-text-grid");

  const c4Def = findBlockById("content-split-editorial");
  assertEquals(c4Def !== null, true, "Block Registry contains content-split-editorial");

  const c5Def = findBlockById("content-image-text");
  assertEquals(c5Def !== null, true, "Block Registry contains content-image-text");

  const c6Def = findBlockById("content-quote-image");
  assertEquals(c6Def !== null, true, "Block Registry contains content-quote-image");

  const c7Def = findBlockById("content-featured-stories");
  assertEquals(c7Def !== null, true, "Block Registry contains content-featured-stories");

  // Verify Team Blocks are Registered
  const t1Def = findBlockById("team-four-column");
  assertEquals(t1Def !== null, true, "Block Registry contains team-four-column");
  assertEquals(t1Def?.category, "Team", "team-four-column categorized under Team");

  const t2Def = findBlockById("team-image-bio-rows");
  assertEquals(t2Def !== null, true, "Block Registry contains team-image-bio-rows");

  const t3Def = findBlockById("team-eight-grid");
  assertEquals(t3Def !== null, true, "Block Registry contains team-eight-grid");

  const t4Def = findBlockById("team-featured");
  assertEquals(t4Def !== null, true, "Block Registry contains team-featured");

  const t5Def = findBlockById("team-editorial-list");
  assertEquals(t5Def !== null, true, "Block Registry contains team-editorial-list");

  // Verify Testimonial Blocks are Registered
  const test1Def = findBlockById("testimonial-two-column");
  assertEquals(test1Def !== null, true, "Block Registry contains testimonial-two-column");
  assertEquals(test1Def?.category, "Testimonial", "testimonial-two-column categorized under Testimonial");

  const test2Def = findBlockById("testimonial-large-quote");
  assertEquals(test2Def !== null, true, "Block Registry contains testimonial-large-quote");

  const test3Def = findBlockById("testimonial-three-column");
  assertEquals(test3Def !== null, true, "Block Registry contains testimonial-three-column");

  const test4Def = findBlockById("testimonial-quote-image");
  assertEquals(test4Def !== null, true, "Block Registry contains testimonial-quote-image");

  const test5Def = findBlockById("testimonial-editorial-list");
  assertEquals(test5Def !== null, true, "Block Registry contains testimonial-editorial-list");

  // 2. Factory creates valid Section (Hero Centered)
  const sectionHeroCentered = heroCenteredDef!.createSection();
  assertEquals(sectionHeroCentered.id.startsWith("sec-hero-centered-"), true, "Hero Centered createSection() generates unique Section ID");
  assertEquals(sectionHeroCentered.blockId, "hero-centered", "Hero Centered section contains blockId property");

  // 3. Factory creates valid Section (Hero Full Image)
  const sectionHeroFull = heroFullImageDef!.createSection();
  assertEquals(sectionHeroFull.id.startsWith("sec-hero-full-image-"), true, "Hero Full Image createSection() generates unique Section ID");
  assertEquals(sectionHeroFull.blockId, "hero-full-image", "Hero Full Image section contains blockId property");

  // 4. Factory creates valid Section (Services Three Column Card List)
  const sectionServicesThree = servicesThreeColumnDef!.createSection();
  assertEquals(sectionServicesThree.id.startsWith("sec-services-cards-"), true, "Services Three Column createSection() generates unique Section ID");
  assertEquals(sectionServicesThree.blockId, "services-three-column", "Services Three Column section contains blockId property");
  assertEquals(sectionServicesThree.components.length, 1, "Services Three Column section contains exactly 1 outer container");

  const servicesContainer = sectionServicesThree.components[0];
  const servicesHeader = servicesContainer.children?.[0];
  const servicesGrid = servicesContainer.children?.[1];

  assertEquals(servicesHeader?.type, "Container", "Services container holds Section Header container");
  assertEquals(servicesGrid?.type, "Container", "Services container holds grid container block");
  assertEquals(servicesGrid?.children?.length, 3, "Services grid contains exactly 3 service cards");

  // Verify Default service card copy is present
  const card1 = servicesGrid?.children?.[0];
  const card1Num = card1?.children?.[0];
  const card1Title = card1?.children?.[1];
  const card1Desc = card1?.children?.[2];
  const card1Arrow = card1?.children?.[3];

  assertEquals(card1Title?.props.text, "Strategy", "Default service card title is Strategy");
  assertEquals(card1Desc?.props.text, "Turn complex challenges into clear, actionable direction.", "Default service card description is correct");
  assertEquals(card1Arrow?.props.text, "→", "Default service card action arrow is present");

  // 5. Instantiation Isolation (Calling createSection() twice generates distinct IDs)
  const servicesInstance1 = servicesThreeColumnDef!.createSection();
  const servicesInstance2 = servicesThreeColumnDef!.createSection();
  assertEquals(servicesInstance1.id !== servicesInstance2.id, true, "Services Instance 1 and Instance 2 Section IDs are mutually unique");
  
  const card1_Inst1_Title = servicesInstance1.components[0].children?.[1].children?.[0].children?.[1];
  const card1_Inst2_Title = servicesInstance2.components[0].children?.[1].children?.[0].children?.[1];
  assertEquals(card1_Inst1_Title?.id !== card1_Inst2_Title?.id, true, "Component IDs inside Services Instance 1 and Instance 2 are mutually unique");

  // 6. Insertion Preserves Existing Sections & Integrity
  const store = useBuilderStore.getState();
  store.initialize(); // Load standard project (size: 10 sections)
  
  const initialSectionsCount = useBuilderStore.getState().project!.pages[0].sections.length;
  assertEquals(initialSectionsCount, 10, "Template loads with standard 10 sections");

  // Insert Services Block
  useBuilderStore.getState().addBlockToPage("services-three-column");
  const updatedProject = useBuilderStore.getState().project!;
  const finalSections = updatedProject.pages[0].sections;
  
  assertEquals(finalSections.length, 11, "Services block insertion appends section to page (size increases to 11)");
  assertEquals(finalSections[10].blockId, "services-three-column", "Appended final section has Services blockId");

  // 7. Undo/Redo & Save checks
  // Trigger undo of block insertion
  useBuilderStore.getState().undo();
  assertEquals(useBuilderStore.getState().project!.pages[0].sections.length, 10, "Undo successfully removes the inserted Services block section");
  
  // Trigger redo of block insertion
  useBuilderStore.getState().redo();
  assertEquals(useBuilderStore.getState().project!.pages[0].sections.length, 11, "Redo successfully restores the inserted Services block section");

  console.log("\n==================================================");
  console.log("🎉 ALL NATIVE BLOCK LIBRARY TESTS PASSED PERFECTLY!");
  console.log("==================================================");
}

runBlockLibraryTests();
