"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useBuilderStore } from "@/store/builderStore";
import { Sidebar } from "./Sidebar";
import { Canvas } from "./Canvas";
import { PropertiesPanel } from "./PropertiesPanel";
import {
  Monitor,
  Tablet,
  Smartphone,
  Undo,
  Redo,
  Save,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

export const VisualEditor: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const targetId = searchParams ? searchParams.get("id") : null;

  const {
    project,
    historyIndex,
    history,
    viewport,
    initialize,
    loadProjectById,
    setViewport,
    undo,
    redo,
    saveProject,
  } = useBuilderStore();

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  // Run initialization on load to load standard active or explicitly targeted query ID
  useEffect(() => {
    if (targetId) {
      loadProjectById(targetId);
    } else {
      initialize();
    }
  }, [initialize, loadProjectById, targetId]);

  // Handle explicit save button trigger
  const handleSave = () => {
    setSaveStatus("saving");
    saveProject();
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 600);
  };

  if (!project) {
    return (
      <div className="flex h-screen bg-neutral-900 text-white items-center justify-center font-medium">
        Loading Design Workspace...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-neutral-900 font-sans">
      {/* 1. Header Navigation Bar */}
      <header className="h-14 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between px-6 select-none z-10">
        <div className="flex items-center gap-3">
          {/* Back to Saved Projects Dashboard Link */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors text-xs font-semibold mr-2 px-2.5 py-1.5 bg-neutral-900 border border-neutral-850 rounded-lg"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Dashboard
          </button>

          <span className="h-4 w-[1px] bg-neutral-800 mx-1" />

          <span className="font-semibold text-sm text-white tracking-tight">
            Design Library Builder
          </span>
          <span className="h-4 w-[1px] bg-neutral-800 mx-2" />
          <span className="text-xs text-indigo-400 font-semibold bg-indigo-950/30 border border-indigo-900/40 px-2 py-0.5 rounded truncate max-w-[200px]" title="Currently Loaded Project">
            {project.name}
          </span>
        </div>

        {/* Viewport Switcher */}
        <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-0.5">
          <button
            onClick={() => setViewport("desktop")}
            className={`p-1.5 rounded-md transition-all ${
              viewport === "desktop"
                ? "bg-neutral-800 text-white"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
            title="Desktop Layout"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewport("tablet")}
            className={`p-1.5 rounded-md transition-all ${
              viewport === "tablet"
                ? "bg-neutral-800 text-white"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
            title="Tablet Layout"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewport("mobile")}
            className={`p-1.5 rounded-md transition-all ${
              viewport === "mobile"
                ? "bg-neutral-800 text-white"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
            title="Mobile Layout"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Undo/Redo & Save controls */}
        <div className="flex items-center gap-3">
          {/* Undo Button */}
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 disabled:opacity-30 disabled:hover:bg-transparent"
            title="Undo Change (Cmd+Z)"
          >
            <Undo className="w-4 h-4" />
          </button>

          {/* Redo Button */}
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 disabled:opacity-30 disabled:hover:bg-transparent"
            title="Redo Change (Cmd+Shift+Z)"
          >
            <Redo className="w-4 h-4" />
          </button>

          <span className="h-4 w-[1px] bg-neutral-800 mx-1" />

          {/* Explicit Save Button */}
          <button
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white rounded-lg shadow-sm transition-all disabled:opacity-50"
          >
            {saveStatus === "saved" ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                Saved
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                {saveStatus === "saving" ? "Saving..." : "Save Project"}
              </>
            )}
          </button>
        </div>
      </header>

      {/* 2. Main Work Workspace Canvas Layout */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Canvas />
        <PropertiesPanel />
      </div>
    </div>
  );
};
