import { create } from 'zustand';
import { Project, BuilderComponent, Section, Page, Theme } from '@/types/builder';
import { createDefaultProject } from '@/lib/defaultProject';
import { starterTemplatesRegistry } from '@/lib/templatesRegistry';
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

  // History Actions
  undo: () => void;
  redo: () => void;
  
  // Persistence
  saveProject: () => void;
}

// Deep clone utility to prevent mutation side-effects in history
const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export const useBuilderStore = create<BuilderState>((set, get) => {
  // Helper to push state onto the history stack
  const pushToHistory = (newProject: Project) => {
    const { history, historyIndex } = get();
    const cleanHistory = history.slice(0, historyIndex + 1);
    
    // Auto-save to localStorage
    localStorage.setItem(`project_${newProject.id}`, JSON.stringify(newProject));
    localStorage.setItem('active_project_id', newProject.id);

    set({
      project: newProject,
      history: [...cleanHistory, deepClone(newProject)],
      historyIndex: cleanHistory.length,
    });
  };

  return {
    project: null,
    history: [],
    historyIndex: -1,
    activePageId: null,
    selectedSectionId: null,
    selectedComponentId: null,
    viewport: 'desktop',

    initialize: () => {
      // First try to load active_project_id, else load or create demo-project
      const activeId = localStorage.getItem('active_project_id') || 'demo-project';
      const saved = localStorage.getItem(`project_${activeId}`);
      
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
    },

    setProject: (project, recordHistory = true) => {
      if (recordHistory) {
        pushToHistory(project);
      } else {
        set({ project });
      }
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

      // Persist independently in localStorage
      localStorage.setItem(`project_${newProjectId}`, JSON.stringify(clonedProject));
      localStorage.setItem('active_project_id', newProjectId);

      set({
        project: clonedProject,
        history: [deepClone(clonedProject)],
        historyIndex: 0,
        activePageId: clonedProject.pages[0]?.id || null,
        selectedSectionId: null,
        selectedComponentId: null,
      });

      return newProjectId;
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
        localStorage.setItem(`project_${previousProject.id}`, JSON.stringify(previousProject));
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
        localStorage.setItem(`project_${nextProject.id}`, JSON.stringify(nextProject));
      }
    },

    saveProject: () => {
      const { project } = get();
      if (project) {
        localStorage.setItem(`project_${project.id}`, JSON.stringify(project));
        console.log('Explicit save executed');
      }
    }
  };
});
