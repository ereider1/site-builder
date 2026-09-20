"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Project } from "@/types/builder";
import { SectionRenderer } from "@/components/builder/Renderer";
import { ThemeStyleInjector } from "@/components/builder/ThemeStyleInjector";

export default function PreviewPage() {
  const params = useParams();
  const id = params?.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) {
      setError(true);
      return;
    }

    // Load from local storage directly to keep the preview lightweight
    // without requiring the user to load the Zustand store if they just paste the URL
    try {
      const stored = localStorage.getItem(`project_${id}`);
      if (stored) {
        setProject(JSON.parse(stored));
      } else {
        setError(true);
      }
    } catch (e) {
      setError(true);
    }
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 font-sans text-stone-600">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-stone-900">Preview Not Found</h1>
          <p className="text-sm">The project you requested doesn&apos;t exist in this browser&apos;s local storage.</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 font-sans text-stone-600">
        <p className="text-sm font-medium animate-pulse">Loading preview...</p>
      </div>
    );
  }

  const activePage = project.pages[0]; // Currently supporting single-page previews

  return (
    <>
      <ThemeStyleInjector theme={project.theme} />
      
      <main className="canvas-container w-full min-h-screen antialiased bg-white overflow-x-hidden flex flex-col">
        {activePage?.sections.map((section) => (
          <SectionRenderer 
            key={section.id} 
            section={section} 
            isEditing={false} // CRITICAL: Renders pure output with no editor hooks
          />
        ))}
      </main>
    </>
  );
}
