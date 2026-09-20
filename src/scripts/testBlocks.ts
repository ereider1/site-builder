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

  // 1. Registry Contains Block
  const blockId = "hero-editorial-split";
  const blockDef = findBlockById(blockId);
  assertEquals(blockDef !== null, true, "Block Registry contains hero-editorial-split");
  assertEquals(blockDef?.name, "Hero — Editorial Split", "Block name is correctly registered");
  assertEquals(blockDef?.category, "Hero", "Block category is correctly Hero");

  // 2. Factory creates valid Section
  const section1 = blockDef!.createSection();
  assertEquals(section1.id.startsWith("sec-hero-split-"), true, "createSection() generates unique Section ID");
  assertEquals(section1.blockId, blockId, "Generated section contains blockId property");
  assertEquals(section1.components.length, 1, "Section contains exactly 1 first-level container component");

  // 3. Recursive ID Uniqueness Assertions
  const container = section1.components[0];
  const colLeft = container.children?.[0];
  const colRight = container.children?.[1];
  
  assertEquals(container.id.startsWith("comp-container-"), true, "Container component has a unique ID prefix");
  assertEquals(colLeft?.id.startsWith("comp-container-"), true, "Left Column container component has a unique ID prefix");
  assertEquals(colRight?.id.startsWith("comp-container-"), true, "Right Column container component has a unique ID prefix");

  const heading = colLeft?.children?.[1];
  const text = colLeft?.children?.[2];
  const image = colRight?.children?.[0];

  assertEquals(heading?.id.startsWith("comp-hero-heading-"), true, "Oversized Heading component receives a unique ID");
  assertEquals(text?.id.startsWith("comp-hero-text-"), true, "Supporting paragraph Text component receives a unique ID");
  assertEquals(image?.id.startsWith("comp-hero-image-"), true, "Hero Image component receives a unique ID");

  // 4. Instantiation Isolation (Calling createSection() twice generates distinct IDs)
  const section2 = blockDef!.createSection();
  assertEquals(section1.id !== section2.id, true, "Instance 1 and Instance 2 Section IDs are mutually unique");
  
  const h1_Instance1 = section1.components[0].children?.[0].children?.[1];
  const h1_Instance2 = section2.components[0].children?.[0].children?.[1];
  assertEquals(h1_Instance1?.id !== h1_Instance2?.id, true, "Heading component IDs in Instance 1 vs Instance 2 are mutually unique");

  // 5. Expected Nested Components Structure Checks
  assertEquals(heading?.type, "Heading", "Instance contains Hero Heading component");
  assertEquals(text?.type, "Text", "Instance contains supporting Text component");
  assertEquals(image?.type, "Image", "Instance contains Hero Image component");

  // 6. Explicit Content-Slot Mappings Preservation
  assertEquals(section1.contentSlots !== undefined, true, "Block Section carries local contentSlots metadata mappings list");
  assertEquals(section1.contentSlots?.length, 3, "Exactly 3 local content slot mappings registered inside the section");
  
  const headingSlot = section1.contentSlots?.find((s) => s.componentId === heading?.id);
  assertEquals(headingSlot?.source, "business.tagline", "Local heading maps dynamically to business.tagline");

  const imageSlot = section1.contentSlots?.find((s) => s.componentId === image?.id);
  assertEquals(imageSlot?.source, "brand.heroImage", "Local image maps dynamically to brand.heroImage");

  // 7. Population Execution via Dynamic Content Slots
  const store = useBuilderStore.getState();
  store.initialize(); // Load standard project (size: 10 sections)
  
  const initialSectionsCount = useBuilderStore.getState().project!.pages[0].sections.length;
  assertEquals(initialSectionsCount, 10, "Template loads with standard 10 sections");

  // 8. Insertion Preserves Existing Sections & Integrity
  useBuilderStore.getState().addBlockToPage(blockId);
  const updatedProject = useBuilderStore.getState().project!;
  const finalSections = updatedProject.pages[0].sections;
  
  assertEquals(finalSections.length, 11, "Block insertion appends section to current page (size increases to 11)");
  assertEquals(finalSections[10].blockId, blockId, "Appended final section matches the Block Library ID");

  // Fetch the active component IDs from the newly inserted block section
  const insertedSection = finalSections[10];
  const insertedContainer = insertedSection.components[0];
  const insertedColLeft = insertedContainer.children?.[0];
  const insertedColRight = insertedContainer.children?.[1];
  
  const insertedHeading = insertedColLeft?.children?.[1];
  const insertedText = insertedColLeft?.children?.[2];
  const insertedImage = insertedColRight?.children?.[0];

  // Test content slot population of newly inserted block
  const testProfile: UserContent = {
    business: {
      tagline: "Clarity for what's next.",
      description: "Custom strategies for modern brands.",
    },
    brand: {
      heroImage: "https://images.unsplash.com/custom-test-image-url",
    }
  };

  const populatedProject = populateProject(updatedProject, testProfile);
  const populatedSection = populatedProject.pages[0].sections[10];
  
  // Find heading and image inside inserted block on populated project
  const populatedHeading = findComponent(populatedSection.components, insertedHeading?.id as string);
  assertEquals(populatedHeading?.props.text, "Clarity for what's next.", "Dynamic local block content slots populate Tagline text correctly");

  const populatedImg = findComponent(populatedSection.components, insertedImage?.id as string);
  assertEquals(populatedImg?.props.src, "https://images.unsplash.com/custom-test-image-url", "Dynamic local block content slots populate Hero Image src correctly");

  // Fallback checks: if profile missing, preserve template defaults
  const emptyProfile: UserContent = {};
  const fallbackProject = populateProject(updatedProject, emptyProfile);
  const fallbackSection = fallbackProject.pages[0].sections[10];
  
  const fallbackHeading = findComponent(fallbackSection.components, insertedHeading?.id as string);
  assertEquals(fallbackHeading?.props.text, "Build a business ready for what comes next.", "Safe fallback preserves default block headline when copy empty");

  // 9. Undo/Redo & Save checks
  // Trigger undo of block insertion
  useBuilderStore.getState().undo();
  assertEquals(useBuilderStore.getState().project!.pages[0].sections.length, 10, "Undo successfully removes the inserted block section");
  
  // Trigger redo of block insertion
  useBuilderStore.getState().redo();
  assertEquals(useBuilderStore.getState().project!.pages[0].sections.length, 11, "Redo successfully restores the inserted block section");

  console.log("\n==================================================");
  console.log("🎉 ALL NATIVE BLOCK LIBRARY TESTS PASSED PERFECTLY!");
  console.log("==================================================");
}

runBlockLibraryTests();
