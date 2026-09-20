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

  // 1. Registry Contains All 5 Blocks (Phase Expand Block Library complete)
  assertEquals(starterBlocksRegistry.length, 5, "Blocks Registry contains exactly 5 blocks total");
  
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
