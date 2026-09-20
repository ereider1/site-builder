import { create } from 'zustand';
import { Project, BuilderComponent, Section, Page, Theme, ProjectMetadata } from '@/types/builder';
import { createDefaultProject } from '@/lib/defaultProject';
import { starterTemplatesRegistry } from '@/lib/templatesRegistry';
import { findBlockById } from '@/lib/blocksRegistry';
import { findThemeById, mapDefinitionToTheme } from '@/lib/themesRegistry';
import {
  updateComponentInArray,
  deleteComponentFromArray,
  addComponentToArray,
  moveComponentInArray,
} from '@/lib/treeUtils';

type Viewport = 'desktop' | 'tablet' | 'mobile';

interface BuilderState {
  // Data
  project: Project | null;
  projectsList: ProjectMetadata[];
  
  // Undo/Redo Stacks
  history: Project[];
  historyIndex: number;
  
  // Editor UI State
  activePageId: string | null;
  selectedSectionId: string | null;
  selectedComponentId: string | null;
  viewport: Viewport;
  
  // Actions
  initialize: () => void;
  loadProjectsList: () => void;
  setProject: (project: Project, recordHistory?: boolean) => void;
  setActivePage: (pageId: string) => void;
  selectSection: (sectionId: string | null) => void;
  selectComponent: (componentId: string | null) => void;
  setViewport: (viewport: Viewport) => void;
  
  // State mutations with automatic history tracking
  updateComponent: (sectionId: string, componentId: string, updates: Partial<BuilderComponent>) => void;
  addComponent: (sectionId: string, component: BuilderComponent, parentId?: string) => void;
  deleteComponent: (sectionId: string, componentId: string) => void;
  moveComponent: (sectionId: string, componentId: string, direction: 'up' | 'down') => void;
  
  updateSection: (sectionId: string, updates: Partial<Section>) => void;
  addSection: (section: Section) => void;
  deleteSection: (sectionId: string) => void;
  moveSection: (sectionId: string, direction: 'up' | 'down') => void;

  updateTheme: (updates: Partial<Theme>) => void;
  
  // Template Cloning Action
  cloneTemplate: (templateId: string) => string | null;

  // Global Project Management Actions (Phase G.1)
  renameProject: (id: string, newName: string) => void;
  deleteProject: (id: string) => void;
  loadProjectById: (id: string) => void;

  // Block Library Action (Phase Native Block)
  addBlockToPage: (blockId: string) => void;

  // Theme Library Action (Phase Theme System)
  switchProjectTheme: (themeId: string) => void;

  // History Actions
  undo: () => void;
  redo: () => void;
  
  // Persistence
  saveProject: () => void;
}

// Deep clone utility to prevent mutation side-effects in history
const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

// Environmental check to safely run in both Browser (window) and Node test runners (global.localStorage)
const isStorageSafe = (): boolean => {
  return typeof window !== 'undefined' || (typeof global !== 'undefined' && typeof (global as any).localStorage !== 'undefined');
};

// Helper: Synchronize project changes back to the lightweight metadata list
const syncToProjectIndex = (project: Project) => {
  if (!isStorageSafe()) return;
  const indexRaw = localStorage.getItem('projects_index');
  let index: ProjectMetadata[] = indexRaw ? JSON.parse(indexRaw) : [];
  
  const existingIdx = index.findIndex(p => p.id === project.id);
  const metadata: ProjectMetadata = {
    id: project.id,
    name: project.name,
    templateId: "professional-services-modern", // Standard frozen starter design
    createdAt: existingIdx >= 0 ? index[existingIdx].createdAt : Date.now(),
    updatedAt: Date.now(),
  };

  if (existingIdx >= 0) {
    index[existingIdx] = metadata;
  } else {
    index.push(metadata);
  }

  localStorage.setItem('projects_index', JSON.stringify(index));
};

// Helper: Remove project metadata entry from the index
const removeFromProjectIndex = (id: string) => {
  if (!isStorageSafe()) return;
  const indexRaw = localStorage.getItem('projects_index');
  if (!indexRaw) return;
  let index: ProjectMetadata[] = JSON.parse(indexRaw);
  index = index.filter(p => p.id !== id);
  localStorage.setItem('projects_index', JSON.stringify(index));
};

export const useBuilderStore = create<BuilderState>((set, get) => {
  // Helper to push state onto the history stack
  const pushToHistory = (newProject: Project) => {
    const { history, historyIndex } = get();
    const cleanHistory = history.slice(0, historyIndex + 1);
    
    // Auto-save to localStorage
    if (isStorageSafe()) {
      localStorage.setItem(`project_${newProject.id}`, JSON.stringify(newProject));
      localStorage.setItem('active_project_id', newProject.id);
    }

    // Update dynamic index values
    syncToProjectIndex(newProject);

    set({
      project: newProject,
      history: [...cleanHistory, deepClone(newProject)],
      historyIndex: cleanHistory.length,
    });
    
    // Refresh local list state
    get().loadProjectsList();
  };

  return {
    project: null,
    projectsList: [],
    history: [],
    historyIndex: -1,
    activePageId: null,
    selectedSectionId: null,
    selectedComponentId: null,
    viewport: 'desktop',

    initialize: () => {
      if (!isStorageSafe()) return;
      
      // First try to load active_project_id
      const activeId = localStorage.getItem('active_project_id');
      
      // If we already have a loaded project in Zustand matching the activeId,
      // skip reloading to preserve editor history and selections.
      const currentLoaded = get().project;
      if (currentLoaded && activeId === currentLoaded.id) {
        return;
      }

      const loadId = activeId || 'demo-project';
      const saved = localStorage.getItem(`project_${loadId}`);
      
      let initialProject: Project;
      if (saved) {
        try {
          initialProject = JSON.parse(saved);
        } catch (e) {
          initialProject = createDefaultProject();
        }
      } else {
        initialProject = createDefaultProject();
      }

      set({
        project: initialProject,
        history: [deepClone(initialProject)],
        historyIndex: 0,
        activePageId: initialProject.pages[0]?.id || null,
        selectedSectionId: null,
        selectedComponentId: null,
      });

      get().loadProjectsList();
    },

    loadProjectsList: () => {
      if (!isStorageSafe()) return;
      const indexRaw = localStorage.getItem('projects_index');
      const list: ProjectMetadata[] = indexRaw ? JSON.parse(indexRaw) : [];
      set({ projectsList: list });
    },

    setProject: (project, recordHistory = true) => {
      if (isStorageSafe()) {
        // Auto-save to localStorage under its unique project ID key
        localStorage.setItem(`project_${project.id}`, JSON.stringify(project));
        localStorage.setItem('active_project_id', project.id);
      }

      // Sync metadata registry
      syncToProjectIndex(project);

      if (recordHistory) {
        const { history, historyIndex } = get();
        const cleanHistory = history.slice(0, historyIndex + 1);
        set({
          project,
          history: [...cleanHistory, deepClone(project)],
          historyIndex: cleanHistory.length,
        });
      } else {
        // Initialize fresh history for a newly imported/spawned project
        set({
          project,
          history: [deepClone(project)],
          historyIndex: 0,
          activePageId: project.pages[0]?.id || null,
          selectedSectionId: null,
          selectedComponentId: null,
        });
      }

      get().loadProjectsList();
    },
    
    setActivePage: (pageId) => set({ activePageId: pageId, selectedSectionId: null, selectedComponentId: null }),
    
    selectSection: (sectionId) => set({ selectedSectionId: sectionId, selectedComponentId: null }),
    
    selectComponent: (componentId) => set({ selectedComponentId: componentId }),
    
    setViewport: (viewport) => set({ viewport }),

    // COMPONENT MUTATIONS
    updateComponent: (sectionId, componentId, updates) => {
      const { project, activePageId } = get();
      if (!project || !activePageId) return;

      const updatedProject = deepClone(project);
      const page = updatedProject.pages.find((p) => p.id === activePageId);
      if (!page) return;

      const section = page.sections.find((s) => s.id === sectionId);
      if (!section) return;

      section.components = updateComponentInArray(section.components, componentId, updates);
      pushToHistory(updatedProject);
    },

    addComponent: (sectionId, component, parentId) => {
      const { project, activePageId } = get();
      if (!project || !activePageId) return;

      const updatedProject = deepClone(project);
      const page = updatedProject.pages.find((p) => p.id === activePageId);
      if (!page) return;

      const section = page.sections.find((s) => s.id === sectionId);
      if (!section) return;

      section.components = addComponentToArray(section.components, component, parentId);
      pushToHistory(updatedProject);
    },

    deleteComponent: (sectionId, componentId) => {
      const { project, activePageId } = get();
      if (!project || !activePageId) return;

      const updatedProject = deepClone(project);
      const page = updatedProject.pages.find((p) => p.id === activePageId);
      if (!page) return;

      const section = page.sections.find((s) => s.id === sectionId);
      if (!section) return;

      section.components = deleteComponentFromArray(section.components, componentId);
      
      // If deleted component was selected, clear selection
      if (get().selectedComponentId === componentId) {
        set({ selectedComponentId: null });
      }

      pushToHistory(updatedProject);
    },

    moveComponent: (sectionId, componentId, direction) => {
      const { project, activePageId } = get();
      if (!project || !activePageId) return;

      const updatedProject = deepClone(project);
      const page = updatedProject.pages.find((p) => p.id === activePageId);
      if (!page) return;

      const section = page.sections.find((s) => s.id === sectionId);
      if (!section) return;

      section.components = moveComponentInArray(section.components, componentId, direction);
      pushToHistory(updatedProject);
    },

    // SECTION MUTATIONS
    updateSection: (sectionId, updates) => {
      const { project, activePageId } = get();
      if (!project || !activePageId) return;

      const updatedProject = deepClone(project);
      const page = updatedProject.pages.find((p) => p.id === activePageId);
      if (!page) return;

      const section = page.sections.find((s) => s.id === sectionId);
      if (!section) return;

      Object.assign(section, updates);
      pushToHistory(updatedProject);
    },

    addSection: (newSection) => {
      const { project, activePageId } = get();
      if (!project || !activePageId) return;

      const updatedProject = deepClone(project);
      const page = updatedProject.pages.find((p) => p.id === activePageId);
      if (!page) return;

      page.sections.push(newSection);
      pushToHistory(updatedProject);
      set({ selectedSectionId: newSection.id, selectedComponentId: null });
    },

    deleteSection: (sectionId) => {
      const { project, activePageId } = get();
      if (!project || !activePageId) return;

      const updatedProject = deepClone(project);
      const page = updatedProject.pages.find((p) => p.id === activePageId);
      if (!page) return;

      page.sections = page.sections.filter((s) => s.id !== sectionId);
      
      // Clear selection if selected section deleted
      if (get().selectedSectionId === sectionId) {
        set({ selectedSectionId: null, selectedComponentId: null });
      }

      pushToHistory(updatedProject);
    },

    moveSection: (sectionId, direction) => {
      const { project, activePageId } = get();
      if (!project || !activePageId) return;

      const updatedProject = deepClone(project);
      const page = updatedProject.pages.find((p) => p.id === activePageId);
      if (!page) return;

      const index = page.sections.findIndex((s) => s.id === sectionId);
      if (index === -1) return;

      const newSections = [...page.sections];
      if (direction === 'up' && index > 0) {
        const temp = newSections[index];
        newSections[index] = newSections[index - 1];
        newSections[index - 1] = temp;
      } else if (direction === 'down' && index < newSections.length - 1) {
        const temp = newSections[index];
        newSections[index] = newSections[index + 1];
        newSections[index + 1] = temp;
      }

      page.sections = newSections;
      pushToHistory(updatedProject);
    },

    updateTheme: (updates) => {
      const { project } = get();
      if (!project) return;

      const updatedProject = deepClone(project);
      updatedProject.theme = {
        ...updatedProject.theme,
        ...updates,
        colors: { ...updatedProject.theme.colors, ...updates.colors },
        typography: { ...updatedProject.theme.typography, ...updates.typography },
      };

      pushToHistory(updatedProject);
    },

    // TEMPLATE CLONING MUTATION
    // Deep clones a read-only template source to create a unique independent mutable Project
    cloneTemplate: (templateId) => {
      const template = starterTemplatesRegistry.find((t) => t.id === templateId);
      if (!template) return null;

      // Deep clone template snapshot data to ensure strict source isolation (no shared refs)
      const clonedProject = deepClone(template.project);

      // Create totally independent metadata
      const newProjectId = `project_${Math.random().toString(36).substr(2, 9)}`;
      clonedProject.id = newProjectId;
      clonedProject.name = "Untitled Website"; // Project name defaults to Untitled Website
      clonedProject.createdAt = Date.now();
      clonedProject.updatedAt = Date.now();

      if (isStorageSafe()) {
        localStorage.setItem(`project_${newProjectId}`, JSON.stringify(clonedProject));
        localStorage.setItem('active_project_id', newProjectId);
      }

      // Save metadata index record
      syncToProjectIndex(clonedProject);

      set({
        project: clonedProject,
        history: [deepClone(clonedProject)],
        historyIndex: 0,
        activePageId: clonedProject.pages[0]?.id || null,
        selectedSectionId: null,
        selectedComponentId: null,
      });

      get().loadProjectsList();

      return newProjectId;
    },

    // GLOBAL PROJECT MANAGEMENT ACTIONS (Phase G.1)
    renameProject: (id, newName) => {
      if (!isStorageSafe()) return;
      const cleanName = newName.trim() || "Untitled Website";
      
      // Update metadata index
      const indexRaw = localStorage.getItem('projects_index');
      if (indexRaw) {
        let index: ProjectMetadata[] = JSON.parse(indexRaw);
        index = index.map((p) => (p.id === id ? { ...p, name: cleanName, updatedAt: Date.now() } : p));
        localStorage.setItem('projects_index', JSON.stringify(index));
      }

      // Update separate project files
      const savedRaw = localStorage.getItem(`project_${id}`);
      if (savedRaw) {
        const savedProject: Project = JSON.parse(savedRaw);
        savedProject.name = cleanName;
        savedProject.updatedAt = Date.now();
        localStorage.setItem(`project_${id}`, JSON.stringify(savedProject));
        
        // If it is currently loaded in memory, sync Zustand memory state as well
        const { project } = get();
        if (project && project.id === id) {
          set({
            project: { ...project, name: cleanName, updatedAt: Date.now() },
          });
        }
      }

      get().loadProjectsList();
    },

    deleteProject: (id) => {
      if (!isStorageSafe()) return;
      
      // Remove individual key
      localStorage.removeItem(`project_${id}`);
      
      // Remove from index
      removeFromProjectIndex(id);

      // If active cleared, unset
      const activeId = localStorage.getItem('active_project_id');
      if (activeId === id) {
        localStorage.removeItem('active_project_id');
        set({
          project: null,
          history: [],
          historyIndex: -1,
          selectedSectionId: null,
          selectedComponentId: null,
        });
      }

      get().loadProjectsList();
    },

    loadProjectById: (id) => {
      if (!isStorageSafe()) return;
      const savedRaw = localStorage.getItem(`project_${id}`);
      if (!savedRaw) return;

      const loadedProject: Project = JSON.parse(savedRaw);

      localStorage.setItem('active_project_id', id);

      set({
        project: loadedProject,
        history: [deepClone(loadedProject)],
        historyIndex: 0,
        activePageId: loadedProject.pages[0]?.id || null,
        selectedSectionId: null,
        selectedComponentId: null,
      });

      get().loadProjectsList();
    },

    // BLOCK LIBRARY ACTION (Phase Native Block)
    // Deep clones block layout structure, creates unique component IDs, and inserts into page
    addBlockToPage: (blockId) => {
      const blockDef = findBlockById(blockId);
      if (!blockDef) return;

      const { project, activePageId } = get();
      if (!project || !activePageId) return;

      // Call the block's factory function which generates independent, fresh component IDs
      const newBlockSection = blockDef.createSection();

      const updatedProject = deepClone(project);
      const page = updatedProject.pages.find((p) => p.id === activePageId);
      if (!page) return;

      // Append section into current page sections list
      page.sections.push(newBlockSection);
      
      // Push history and auto-save
      pushToHistory(updatedProject);
      set({ selectedSectionId: newBlockSection.id, selectedComponentId: null });
    },

    // THEME LIBRARY ACTION (Phase Theme System)
    // Synchronously, non-destructively switches design system tokens inside project settings
    switchProjectTheme: (themeId) => {
      const themeDef = findThemeById(themeId);
      if (!themeDef) return;

      const { project } = get();
      if (!project) return;

      const updatedProject = deepClone(project);
      const mappedTheme = mapDefinitionToTheme(themeDef);

      // Mutate the visual tokens object and metadata tag cleanly without harming any page content nodes
      updatedProject.theme = mappedTheme;
      updatedProject.themeId = themeId;

      pushToHistory(updatedProject);
    },

    // UNDO / REDO
    undo: () => {
      const { history, historyIndex } = get();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        const previousProject = deepClone(history[newIndex]);
        set({
          project: previousProject,
          historyIndex: newIndex,
          selectedSectionId: null,
          selectedComponentId: null,
        });
        if (isStorageSafe()) {
          localStorage.setItem(`project_${previousProject.id}`, JSON.stringify(previousProject));
        }
      }
    },

    redo: () => {
      const { history, historyIndex } = get();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        const nextProject = deepClone(history[newIndex]);
        set({
          project: nextProject,
          historyIndex: newIndex,
          selectedSectionId: null,
          selectedComponentId: null,
        });
        if (isStorageSafe()) {
          localStorage.setItem(`project_${nextProject.id}`, JSON.stringify(nextProject));
        }
      }
    },

    saveProject: () => {
      const { project } = get();
      if (project) {
        project.updatedAt = Date.now();
        if (isStorageSafe()) {
          localStorage.setItem(`project_${project.id}`, JSON.stringify(project));
          localStorage.setItem('active_project_id', project.id);
        }
        syncToProjectIndex(project);
        get().loadProjectsList();
        console.log('Explicit save executed');
      }
    }
  };
});
