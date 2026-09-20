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

  // 1. Registry Contains Both Blocks (Phase Services Block complete)
  assertEquals(starterBlocksRegistry.length, 2, "Blocks Registry contains exactly 2 blocks");
  
  const heroDef = findBlockById("hero-editorial-split");
  assertEquals(heroDef !== null, true, "Block Registry contains hero-editorial-split");
  
  const servicesDef = findBlockById("services-editorial-list");
  assertEquals(servicesDef !== null, true, "Block Registry contains services-editorial-list");
  assertEquals(servicesDef?.category, "Services", "Services block is categorized under Services");

  // 2. Factory creates valid Section (Hero)
  const sectionHero = heroDef!.createSection();
  assertEquals(sectionHero.id.startsWith("sec-hero-split-"), true, "Hero createSection() generates unique Section ID");
  assertEquals(sectionHero.blockId, "hero-editorial-split", "Hero section contains blockId property");

  // 3. Factory creates valid Section (Services List)
  const sectionServices = servicesDef!.createSection();
  assertEquals(sectionServices.id.startsWith("sec-services-list-"), true, "Services createSection() generates unique Section ID");
  assertEquals(sectionServices.blockId, "services-editorial-list", "Services section contains blockId property");
  assertEquals(sectionServices.components.length, 1, "Services section contains exactly 1 outer container");

  const servicesContainer = sectionServices.components[0];
  const servicesHeader = servicesContainer.children?.[0];
  const servicesList = servicesContainer.children?.[1];

  assertEquals(servicesHeader?.type, "Container", "Services container holds Section Header container");
  assertEquals(servicesList?.type, "Container", "Services container holds rows container block");
  assertEquals(servicesList?.children?.length, 3, "Services list contains exactly 3 service row containers");

  // Verify Default service row copy is present
  const firstRow = servicesList?.children?.[0];
  const firstRowGrid = firstRow?.children?.[0];
  const firstRowCol1 = firstRowGrid?.children?.[0];
  
  const row1Title = firstRowCol1?.children?.[1];
  const row1Desc = firstRowGrid?.children?.[1];
  const row1Arrow = firstRowGrid?.children?.[2];

  assertEquals(row1Title?.props.text, "Strategy", "Default service row title is Strategy");
  assertEquals(row1Desc?.props.text, "Turn complex challenges into clear, actionable direction.", "Default service row description is correct");
  assertEquals(row1Arrow?.props.text, "→", "Default service row action arrow is present");

  // 4. Instantiation Isolation (Calling createSection() twice generates distinct IDs)
  const servicesInstance1 = servicesDef!.createSection();
  const servicesInstance2 = servicesDef!.createSection();
  assertEquals(servicesInstance1.id !== servicesInstance2.id, true, "Services Instance 1 and Instance 2 Section IDs are mutually unique");
  
  const row1_Inst1_Title = servicesInstance1.components[0].children?.[1].children?.[0].children?.[0].children?.[0].children?.[1];
  const row1_Inst2_Title = servicesInstance2.components[0].children?.[1].children?.[0].children?.[0].children?.[0].children?.[1];
  assertEquals(row1_Inst1_Title?.id !== row1_Inst2_Title?.id, true, "Component IDs inside Services Instance 1 and Instance 2 are mutually unique");

  // 5. Insertion Preserves Existing Sections & Integrity
  const store = useBuilderStore.getState();
  store.initialize(); // Load standard project (size: 10 sections)
  
  const initialSectionsCount = useBuilderStore.getState().project!.pages[0].sections.length;
  assertEquals(initialSectionsCount, 10, "Template loads with standard 10 sections");

  // Insert Services Block
  useBuilderStore.getState().addBlockToPage("services-editorial-list");
  const updatedProject = useBuilderStore.getState().project!;
  const finalSections = updatedProject.pages[0].sections;
  
  assertEquals(finalSections.length, 11, "Services block insertion appends section to page (size increases to 11)");
  assertEquals(finalSections[10].blockId, "services-editorial-list", "Appended final section has Services blockId");

  // 6. Undo/Redo & Save checks
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
