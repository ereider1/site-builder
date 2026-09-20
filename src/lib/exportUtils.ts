import { Project } from "@/types/builder";

/**
 * Strips transient runtime state from the project and returns a clean, portable JSON object.
 */
export const prepareProjectForExport = (project: Project): Project => {
  // Deep clone to prevent mutations
  const cleanProject = JSON.parse(JSON.stringify(project)) as Project;
  
  // Here we would strip any runtime state if we had it intertwined in the project object.
  // Our Zustand store keeps runtime state (history, active selections) separate from the Project object,
  // making this serialization natively very clean.
  
  return cleanProject;
};

/**
 * Triggers a browser download for the given JSON payload.
 */
export const downloadJson = (filename: string, data: any) => {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  
  document.body.appendChild(a);
  a.click();
  
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Triggers a download of the project's .webbuilder.json backup file.
 */
export const exportProjectFile = (project: Project) => {
  const cleanProject = prepareProjectForExport(project);
  const safeName = cleanProject.name.replace(/[^a-z0-9]/gi, "-").toLowerCase();
  downloadJson(`${safeName}.webbuilder.json`, cleanProject);
};

/**
 * Represents the structure of a Static Website Export Package.
 * Since a true static HTML compilation requires a Node.js server (Next.js export),
 * we generate an intermediate "Website Package" containing the data and instructions.
 */
export const exportWebsitePackage = (project: Project) => {
  const cleanProject = prepareProjectForExport(project);
  const safeName = cleanProject.name.replace(/[^a-z0-9]/gi, "-").toLowerCase();
  
  const packagePayload = {
    _meta: {
      type: "SiteBuilder Website Export Package",
      version: "1.0",
      description: "This is a structured representation of the website. To deploy this to a host (like Vercel, Netlify, or AWS), this package must be passed into the SiteBuilder Next.js SSG generator.",
      generatedAt: new Date().toISOString()
    },
    projectData: cleanProject,
    assets: {
      instructions: "All external images referenced in the projectData will be fetched during SSG generation.",
    }
  };

  downloadJson(`${safeName}-website-package.json`, packagePayload);
};
