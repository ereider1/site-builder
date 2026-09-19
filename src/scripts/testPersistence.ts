import { useBuilderStore } from "../store/builderStore";
import { UserContent } from "../lib/contentSlots";
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

function runPersistenceTests() {
  console.log("==================================================");
  console.log("STARTING PERSISTENCE, INDEX & DASHBOARD UNIT TESTS");
  console.log("==================================================");

  // Clear previous states
  mockLocalStorage.clear();

  // 1. Initial State Check
  const store = useBuilderStore.getState();
  store.initialize();
  
  const initialLoaded = useBuilderStore.getState().project;
  assertEquals(initialLoaded !== null, true, "Zustand initializes with default project when storage is empty");
  assertEquals(initialLoaded?.id, "northstar-studio-project", "Default project is northstar-studio-project");

  // 2. Clone and Populate Flow (Test Onboarding Pipeline)
  const templateId = "professional-services-modern";
  
  // Clone template (this must register Project A metadata in projects_index!)
  const newProjectId = useBuilderStore.getState().cloneTemplate(templateId);
  assertEquals(newProjectId !== null, true, "Cloned template returns valid project id");
  
  // Set metadata & profile details
  const profile: UserContent = {
    business: {
      businessName: "Harbor & Co.",
      tagline: "Clarity for what's next.",
      description: "Custom strategies for modern brands.",
    }
  };

  const clonedProject = useBuilderStore.getState().project!;
  clonedProject.name = "Harbor & Co.";
  
  // Apply population
  const { populateProject } = require("../lib/contentSlots");
  const populatedProject = populateProject(clonedProject, profile);
  
  // Set project authoritative (this must update localStorage and projects_index)
  useBuilderStore.getState().setProject(populatedProject, false);

  // Assert memory state is set
  const currentMemoryProject = useBuilderStore.getState().project!;
  assertEquals(currentMemoryProject.name, "Harbor & Co.", "Zustand memory project name is updated");
  
  // Assert localStorage has populated state
  const rawSaved = mockLocalStorage.getItem(`project_${newProjectId}`);
  assertEquals(rawSaved !== null, true, "Populated project is instantly synchronized to localStorage");
  
  const savedProject = JSON.parse(rawSaved!);
  const savedHeading = findComponent(savedProject.pages[0].sections[1].components, "comp-hero-heading");
  assertEquals(savedHeading?.props.text, "Clarity for what's next.", "localStorage contains the correct populated tagline");

  // Assert projects_index is populated with Project A metadata
  const indexRaw = mockLocalStorage.getItem("projects_index");
  assertEquals(indexRaw !== null, true, "projects_index has been initialized in localStorage");
  const parsedIndex = JSON.parse(indexRaw!);
  assertEquals(parsedIndex.length, 1, "Exactly 1 project listed in projects_index metadata list");
  assertEquals(parsedIndex[0].name, "Harbor & Co.", "Indexed name matches populated name");
  assertEquals(parsedIndex[0].id, newProjectId, "Indexed id matches cloned project id");

  // 3. Page Reload / Restoration Check (Bug 1 Fix Proof)
  // Simulate complete page refresh by resetting store memory variables
  useBuilderStore.setState({
    project: null,
    projectsList: [],
    history: [],
    historyIndex: -1,
  });

  // Call initialize (this simulates mounting of /editor on page reload)
  useBuilderStore.getState().initialize();
  
  const reloadedProject = useBuilderStore.getState().project!;
  assertEquals(reloadedProject.id, newProjectId, "Page refresh correctly restores active_project_id");
  assertEquals(reloadedProject.name, "Harbor & Co.", "Page refresh correctly restores populated project data");
  
  const reloadedHeading = findComponent(reloadedProject.pages[0].sections[1].components, "comp-hero-heading");
  assertEquals(reloadedHeading?.props.text, "Clarity for what's next.", "Page refresh correctly retains tagline content");

  // Verify projectsList list is synchronized in store state
  assertEquals(useBuilderStore.getState().projectsList.length, 1, "projectsList state loaded in Zustand store");

  // 4. Save Button Check (Idempotence & Manual Override)
  // Edit heading manually
  useBuilderStore.getState().updateComponent("sec-hero", "comp-hero-heading", {
    props: { text: "Testing Persistent Editing" }
  });
  
  // Click explicit save project
  useBuilderStore.getState().saveProject();
  
  // Reload again
  useBuilderStore.setState({ project: null });
  useBuilderStore.getState().initialize();
  
  const savedAndLoaded = useBuilderStore.getState().project!;
  const finalHeading = findComponent(savedAndLoaded.pages[0].sections[1].components, "comp-hero-heading");
  assertEquals(finalHeading?.props.text, "Testing Persistent Editing", "Explicit save preserves custom edits after reload");

  // 5. Multiple Project Isolation Check (Phase G.1 Multi-project requirement)
  // Create Project B (Summit Advisory)
  const secondProjectId = useBuilderStore.getState().cloneTemplate(templateId);
  assertEquals(secondProjectId !== newProjectId, true, "Second clone receives a unique ID");
  
  const secondProject = useBuilderStore.getState().project!;
  secondProject.name = "Summit Advisory";
  useBuilderStore.getState().setProject(secondProject, false);
  
  // Create Project C (Untitled Website)
  const thirdProjectId = useBuilderStore.getState().cloneTemplate(templateId);
  const thirdProject = useBuilderStore.getState().project!;
  // (leave name as "Untitled Website")
  useBuilderStore.getState().setProject(thirdProject, false);

  // Assert index has exactly 3 entries now
  const multiIndexRaw = mockLocalStorage.getItem("projects_index");
  const multiIndex = JSON.parse(multiIndexRaw!);
  assertEquals(multiIndex.length, 3, "projects_index holds exactly 3 entries on multi-project creation");
  
  // Assert independent files
  assertEquals(mockLocalStorage.getItem(`project_${newProjectId}`) !== null, true, "Project A (Harbor) file exists");
  assertEquals(mockLocalStorage.getItem(`project_${secondProjectId}`) !== null, true, "Project B (Summit) file exists");
  assertEquals(mockLocalStorage.getItem(`project_${thirdProjectId}`) !== null, true, "Project C (Untitled) file exists");

  // 6. Rename Action Check
  useBuilderStore.getState().renameProject(secondProjectId as string, "Summit Advisors Corp");
  
  // Assert index and files reflect rename
  const indexAfterRename = JSON.parse(mockLocalStorage.getItem("projects_index")!);
  const renamedMeta = indexAfterRename.find((p: any) => p.id === secondProjectId);
  assertEquals(renamedMeta.name, "Summit Advisors Corp", "Index reflects the new project name");

  const fileAfterRename = JSON.parse(mockLocalStorage.getItem(`project_${secondProjectId}`)!);
  assertEquals(fileAfterRename.name, "Summit Advisors Corp", "Individual project storage reflects the new project name");

  // 7. Delete Action Check
  useBuilderStore.getState().deleteProject(thirdProjectId as string);
  
  // Assert Project C is removed from projects_index
  const indexAfterDelete = JSON.parse(mockLocalStorage.getItem("projects_index")!);
  assertEquals(indexAfterDelete.length, 2, "index index has been shrunk to exactly 2 elements");
  assertEquals(indexAfterDelete.some((p: any) => p.id === thirdProjectId), false, "Project C has been removed from metadata list");
  
  // Assert Project C individual file is removed
  assertEquals(mockLocalStorage.getItem(`project_${thirdProjectId}`), null, "Project C individual storage file deleted");
  
  // Assert Project A and B remain unharmed
  assertEquals(mockLocalStorage.getItem(`project_${newProjectId}`) !== null, true, "Project A survives deletion of Project C");
  assertEquals(mockLocalStorage.getItem(`project_${secondProjectId}`) !== null, true, "Project B survives deletion of Project C");

  console.log("\n==================================================");
  console.log("🎉 ALL PERSISTENCE & INDEX TESTS PASSED PERFECTLY!");
  console.log("==================================================");
}

runPersistenceTests();
