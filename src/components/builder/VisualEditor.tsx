"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useBuilderStore } from "@/store/builderStore";
import { Sidebar } from "./Sidebar";
import { Canvas } from "./Canvas";
import { PropertiesPanel } from "./PropertiesPanel";
import { exportProjectFile, exportWebsitePackage } from "@/lib/exportUtils";
import {
  Monitor,
  Tablet,
  Smartphone,
  Undo,
  Redo,
  Save,
  CheckCircle,
  ArrowLeft,
  Eye,
  Download,
  Share,
  X,
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
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

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

  const handleOpenPreview = () => {
    if (project) {
      saveProject(); // Auto-save before jumping to preview
      window.open(`/preview/${project.id}`, '_blank');
    }
  };

  if (!project) {
    return (
      <div className="flex h-screen bg-stone-100 text-stone-600 items-center justify-center font-medium font-sans select-none">
        Loading Design Workspace...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-stone-100 font-sans text-stone-700 select-none">
      {/* 1. Header Navigation Bar */}
      <header className="h-14 bg-white border-b border-stone-200 flex items-center justify-between px-6 select-none z-10 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Back to Saved Projects Dashboard Link */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1.5 text-stone-500 hover:text-stone-950 transition-colors text-xs font-semibold mr-2 px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Dashboard
          </button>

          <span className="h-4 w-[1px] bg-stone-200 mx-1" />

          <span className="font-bold text-sm text-stone-900 tracking-tight">
            Design Library Builder
          </span>
          <span className="h-4 w-[1px] bg-stone-200 mx-2" />
          <span className="text-xs text-indigo-600 font-bold bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded truncate max-w-[200px]" title="Currently Loaded Project">
            {project.name}
          </span>
        </div>

        {/* Viewport Switcher */}
        <div className="flex items-center bg-stone-50 border border-stone-200 rounded-lg p-0.5 shadow-inner">
          <button
            onClick={() => setViewport("desktop")}
            className={`p-1.5 rounded-md transition-all ${
              viewport === "desktop"
                ? "bg-white text-stone-950 border border-stone-200 shadow-sm"
                : "text-stone-400 hover:text-stone-600"
            }`}
            title="Desktop Layout"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewport("tablet")}
            className={`p-1.5 rounded-md transition-all ${
              viewport === "tablet"
                ? "bg-white text-stone-950 border border-stone-200 shadow-sm"
                : "text-stone-400 hover:text-stone-600"
            }`}
            title="Tablet Layout"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewport("mobile")}
            className={`p-1.5 rounded-md transition-all ${
              viewport === "mobile"
                ? "bg-white text-stone-950 border border-stone-200 shadow-sm"
                : "text-stone-400 hover:text-stone-600"
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
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="Undo Change (Cmd+Z)"
          >
            <Undo className="w-4 h-4" />
          </button>

          {/* Redo Button */}
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="Redo Change (Cmd+Shift+Z)"
          >
            <Redo className="w-4 h-4" />
          </button>

          <span className="h-4 w-[1px] bg-stone-200 mx-1" />

          {/* Explicit Save Button */}
          <button
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-white rounded-lg shadow-sm transition-all disabled:opacity-50"
          >
            {saveStatus === "saved" ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Saved
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                Save
              </>
            )}
          </button>

          <span className="h-4 w-[1px] bg-stone-200 mx-1" />

          {/* Local Preview Action */}
          <button
            onClick={handleOpenPreview}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-200 hover:bg-stone-50 text-xs font-semibold text-stone-700 rounded-lg shadow-sm transition-all"
            title="Open Clean Preview in New Tab"
          >
            <Eye className="w-3.5 h-3.5" />
            Preview
          </button>

          {/* Share & Export Trigger */}
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white rounded-lg shadow-md transition-all"
          >
            <Share className="w-3.5 h-3.5" />
            Share / Export
          </button>
        </div>
      </header>

      {/* 2. Main Work Workspace Canvas Layout */}
      <div className="flex flex-1 overflow-hidden bg-stone-100">
        <Sidebar />
        <Canvas />
        <PropertiesPanel />
      </div>

      {/* 3. Share & Export Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-center justify-center animate-fadeIn p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-stone-900 tracking-tight flex items-center gap-2">
                <Share className="w-4 h-4 text-indigo-600" />
                Share & Export Project
              </h2>
              <button 
                onClick={() => setIsShareModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Context Explanation */}
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
                <p className="text-sm text-stone-600 leading-relaxed">
                  Your project data is currently saved entirely within your browser&apos;s local storage. Because there is no central database (by design), <strong>true cross-browser sharing via a simple link is not possible yet.</strong>
                </p>
                <p className="text-sm text-stone-600 leading-relaxed mt-3">
                  To share this project with a client or another device, please export the project backup file or generate a static website package.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start gap-4 p-4 border border-stone-200 rounded-lg hover:border-indigo-300 transition-colors group">
                  <div className="mt-0.5 p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Download className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-stone-900 text-sm mb-1">Export Project File</h3>
                    <p className="text-xs text-stone-500 mb-3 leading-relaxed">
                      Download a clean <code>.webbuilder.json</code> backup containing all pages, content, and themes. You can archive this or load it in another browser.
                    </p>
                    <button 
                      onClick={() => exportProjectFile(project)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      Download Project JSON &rarr;
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border border-stone-200 rounded-lg hover:border-emerald-300 transition-colors group">
                  <div className="mt-0.5 p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Download className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-stone-900 text-sm mb-1">Export Static Website</h3>
                    <p className="text-xs text-stone-500 mb-3 leading-relaxed">
                      Download an intermediate Website Package. To deploy this to production, it must be compiled through the SiteBuilder Next.js static generation pipeline.
                    </p>
                    <button 
                      onClick={() => exportWebsitePackage(project)}
                      className="text-xs font-semibold text-emerald-600 hover:text-emerald-800"
                    >
                      Download Website Package &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-stone-100 bg-stone-50 text-right">
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="px-4 py-2 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-sm font-semibold rounded-lg shadow-sm transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
