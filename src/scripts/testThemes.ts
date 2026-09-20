import { useBuilderStore } from "../store/builderStore";
import { starterThemesRegistry, findThemeById } from "../lib/themesRegistry";
import { findComponent } from "../lib/treeUtils";

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

function runThemeSystemTests() {
  console.log("==================================================");
  console.log("STARTING TOKEN-BASED THEME SYSTEM UNIT TESTS");
  console.log("==================================================");

  // Clear previous states
  mockLocalStorage.clear();

  // 1. Theme Registry Contains All 3 Themes
  assertEquals(starterThemesRegistry.length, 3, "Themes Registry contains exactly 3 themes");
  assertEquals(findThemeById("editorial") !== null, true, "Theme 'Editorial' is registered");
  assertEquals(findThemeById("modern") !== null, true, "Theme 'Modern' is registered");
  assertEquals(findThemeById("minimal") !== null, true, "Theme 'Minimal' is registered");

  // Initialize Project State
  const store = useBuilderStore.getState();
  store.initialize();
  
  const originalProject = useBuilderStore.getState().project!;
  assertEquals(originalProject.themeId, "editorial", "Initial project starts with editorial theme ID");

  // Store original IDs for non-destructive check
  const originalSectionId = originalProject.pages[0].sections[1].id;
  const originalHeadingComp = originalProject.pages[0].sections[1].components[0].children?.[0].children?.[1]!;
  const originalHeadingId = originalHeadingComp.id;
  const originalHeadingText = originalHeadingComp.props.text;

  // 2. Switch Theme to 'Modern' (This is a non-destructive token-swap action)
  useBuilderStore.getState().switchProjectTheme("modern");
  
  const projectModern = useBuilderStore.getState().project!;
  assertEquals(projectModern.themeId, "modern", "Project successfully stores updated themeId 'modern'");
  assertEquals(projectModern.theme.colors.background, "#ffffff", "Project theme colors background updated toModern token (#ffffff)");
  assertEquals(projectModern.theme.radius, "8px", "Project theme border radius updated to Modern token (8px)");

  // 3. SWITCHING THEMES MUST BE STRICTLY NON-DESTRUCTIVE (Structural Isolation Checks)
  assertEquals(projectModern.pages[0].sections[1].id, originalSectionId, "Switching themes does not change section IDs");
  
  const modernHeadingComp = projectModern.pages[0].sections[1].components[0].children?.[0].children?.[1]!;
  assertEquals(modernHeadingComp.id, originalHeadingId, "Switching themes does not change component IDs");
  assertEquals(modernHeadingComp.props.text, originalHeadingText, "Switching themes does not change component text content");
  
  // 4. Switch Theme to 'Minimal'
  useBuilderStore.getState().switchProjectTheme("minimal");
  
  const projectMinimal = useBuilderStore.getState().project!;
  assertEquals(projectMinimal.themeId, "minimal", "Project successfully stores updated themeId 'minimal'");
  assertEquals(projectMinimal.theme.colors.background, "#fafafa", "Project theme colors background updated to Minimal token (#fafafa)");
  assertEquals(projectMinimal.theme.radius, "2px", "Project theme border radius updated to Minimal token (2px)");
  assertEquals(projectMinimal.pages[0].sections[1].id, originalSectionId, "Switching to Minimal theme preserves original section IDs");
  assertEquals(projectMinimal.pages[0].sections[1].components[0].children?.[0].children?.[1]!.id, originalHeadingId, "Switching to Minimal theme preserves original component IDs");

  // 5. Theme State Persistence (Save & Refresh)
  useBuilderStore.getState().saveProject();
  
  // Reset store memory state to simulate browser page refresh
  useBuilderStore.setState({
    project: null,
    history: [],
    historyIndex: -1,
  });

  // Load project from LocalStorage
  useBuilderStore.getState().initialize();
  const reloadedProject = useBuilderStore.getState().project!;
  
  assertEquals(reloadedProject.themeId, "minimal", "Theme ID correctly persists in localStorage after page refresh");
  assertEquals(reloadedProject.theme.colors.background, "#fafafa", "Theme colors background correctly recovers after page refresh");
  assertEquals(reloadedProject.theme.radius, "2px", "Theme border radius correctly recovers after page refresh");

  console.log("\n==================================================");
  console.log("🎉 ALL NATIVE THEME SYSTEM TESTS PASSED PERFECTLY!");
  console.log("==================================================");
}

runThemeSystemTests();
