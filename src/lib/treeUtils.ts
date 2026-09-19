import { BuilderComponent } from "@/types/builder";

// Find a component by ID recursively
export function findComponent(components: BuilderComponent[], id: string): BuilderComponent | null {
  for (const comp of components) {
    if (comp.id === id) return comp;
    if (comp.children && comp.children.length > 0) {
      const found = findComponent(comp.children, id);
      if (found) return found;
    }
  }
  return null;
}

// Update a component recursively and return a new array
export function updateComponentInArray(
  components: BuilderComponent[],
  id: string,
  updates: Partial<BuilderComponent>
): BuilderComponent[] {
  return components.map((comp) => {
    if (comp.id === id) {
      return { ...comp, ...updates };
    }
    if (comp.children && comp.children.length > 0) {
      return {
        ...comp,
        children: updateComponentInArray(comp.children, id, updates),
      };
    }
    return comp;
  });
}

// Delete a component recursively and return a new array
export function deleteComponentFromArray(
  components: BuilderComponent[],
  id: string
): BuilderComponent[] {
  return components
    .filter((comp) => comp.id !== id)
    .map((comp) => {
      if (comp.children && comp.children.length > 0) {
        return {
          ...comp,
          children: deleteComponentFromArray(comp.children, id),
        };
      }
      return comp;
    });
}

// Add a component recursively (either globally or to a specific parent)
export function addComponentToArray(
  components: BuilderComponent[],
  newComp: BuilderComponent,
  parentId?: string
): BuilderComponent[] {
  if (!parentId) {
    return [...components, newComp];
  }

  return components.map((comp) => {
    if (comp.id === parentId) {
      return {
        ...comp,
        children: [...(comp.children || []), newComp],
      };
    }
    if (comp.children && comp.children.length > 0) {
      return {
        ...comp,
        children: addComponentToArray(comp.children, newComp, parentId),
      };
    }
    return comp;
  });
}

// Reorder or move component up or down within its sibling array recursively
export function moveComponentInArray(
  components: BuilderComponent[],
  id: string,
  direction: "up" | "down"
): BuilderComponent[] {
  // Check if target is directly in this array
  const index = components.findIndex((c) => compIdOrChildContains(c, id));

  if (index === -1) return components;

  const targetComp = components[index];

  // If the component itself is here, reorder it with siblings
  if (targetComp.id === id) {
    const newArray = [...components];
    if (direction === "up" && index > 0) {
      const temp = newArray[index];
      newArray[index] = newArray[index - 1];
      newArray[index - 1] = temp;
    } else if (direction === "down" && index < newArray.length - 1) {
      const temp = newArray[index];
      newArray[index] = newArray[index + 1];
      newArray[index + 1] = temp;
    }
    return newArray;
  }

  // Otherwise, it must be nested inside the target component's children
  return components.map((comp) => {
    if (comp.children && comp.children.length > 0) {
      return {
        ...comp,
        children: moveComponentInArray(comp.children, id, direction),
      };
    }
    return comp;
  });
}

// Helper: Does a component match an ID, or do any of its descendants?
function compIdOrChildContains(comp: BuilderComponent, id: string): boolean {
  if (comp.id === id) return true;
  if (comp.children && comp.children.length > 0) {
    return comp.children.some((c) => compIdOrChildContains(c, id));
  }
  return false;
}
