"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBuilderStore } from "@/store/builderStore";
import Link from "next/link";
import {
  LayoutGrid,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Calendar,
  Globe,
  Sparkles,
} from "lucide-react";

export default function HomeDashboard() {
  const router = useRouter();
  const { projectsList, loadProjectsList, renameProject, deleteProject } =
    useBuilderStore();

  const [renameTargetId, setRenameTargetId] = useState<string | null>(null);
  const [renameVal, setRenameVal] = useState("");

  // Populate project index on dashboard mount
  useEffect(() => {
    loadProjectsList();
  }, [loadProjectsList]);

  const handleOpenProject = (id: string) => {
    router.push(`/editor?id=${id}`);
  };

  const handleRenameTrigger = (id: string, currentName: string) => {
    setRenameTargetId(id);
    setRenameVal(currentName);
  };

  const handleSaveRename = (id: string) => {
    if (!renameVal.trim()) return;
    renameProject(id, renameVal);
    setRenameTargetId(null);
  };

  const handleDeleteTrigger = (id: string, name: string) => {
    const isConfirmed = confirm(
      `Are you sure you want to delete "${name}"? This action cannot be undone.`
    );
    if (isConfirmed) {
      deleteProject(id);
    }
  };

  // Humanize timestamp output (e.g. "Just now" or date string)
  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    if (diff < 60000) return "just now";
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    
    // Otherwise return simple date format
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans antialiased flex flex-col justify-between select-none">
      {/* 1. Global Top Bar */}
      <header className="h-14 border-b border-neutral-800 flex items-center justify-between px-8 bg-neutral-950">
        <div className="flex items-center gap-3">
          <span className="h-6 w-6 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-md">
            W
          </span>
          <span className="font-bold text-sm text-white tracking-tight">
            Design Library Builder
          </span>
        </div>
        <span className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">
          Saved Projects Dashboard
        </span>
      </header>

      {/* 2. Main Dashboard Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 border-b border-neutral-900 pb-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-white">Your Websites</h1>
            <p className="text-xs text-neutral-400">
              Manage, discover, and edit your custom business platforms.
            </p>
          </div>
          <Link
            href="/wizard"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg shadow-lg transition-all self-start sm:self-center"
          >
            <Plus className="w-4 h-4" />
            New Website
          </Link>
        </div>

        {/* 3. Project Discovery List/Grid */}
        {projectsList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsList.map((projectItem) => (
              <div
                key={projectItem.id}
                className="bg-neutral-900 border border-neutral-850 rounded-xl overflow-hidden hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      {renameTargetId === projectItem.id ? (
                        <div className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={renameVal}
                            onChange={(e) => setRenameVal(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSaveRename(projectItem.id);
                              if (e.key === "Escape") setRenameTargetId(null);
                            }}
                            className="bg-neutral-950 border border-neutral-850 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-indigo-500 w-full font-bold"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveRename(projectItem.id)}
                            className="text-xs px-2.5 py-1 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-500 shrink-0"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 group/title">
                          <h3
                            onClick={() => handleOpenProject(projectItem.id)}
                            className="text-lg font-bold text-white tracking-tight cursor-pointer hover:text-indigo-400 transition-colors truncate max-w-[280px]"
                          >
                            {projectItem.name}
                          </h3>
                          <button
                            onClick={() =>
                              handleRenameTrigger(projectItem.id, projectItem.name)
                            }
                            className="p-1 rounded text-neutral-500 hover:text-neutral-300 hover:bg-neutral-850 opacity-0 group-hover/title:opacity-100 transition-opacity"
                            title="Rename Project"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-indigo-400">
                        <Globe className="w-3 h-3" />
                        {projectItem.templateId === "professional-services-modern"
                          ? "Professional Services — Modern"
                          : "Starter Layout"}
                      </span>
                    </div>

                    {/* Metadata Indicators */}
                    <div className="text-[10px] text-neutral-500 text-right shrink-0 space-y-1 font-mono">
                      <div className="flex items-center gap-1 justify-end">
                        <Calendar className="w-3 h-3" />
                        <span>Updated {formatTime(projectItem.updatedAt)}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    A beautiful consulting template snapshot cloned as an independent editable
                    project key in your local sandbox.
                  </p>
                </div>

                {/* Card CTA Actions */}
                <div className="px-6 py-4 bg-neutral-950 border-t border-neutral-850 flex items-center justify-between">
                  <button
                    onClick={() => handleDeleteTrigger(projectItem.id, projectItem.name)}
                    className="p-2 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-950/20 transition-all flex items-center gap-1 text-xs font-semibold"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>

                  <button
                    onClick={() => handleOpenProject(projectItem.id)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white rounded-lg text-xs font-semibold transition-all group/btn"
                  >
                    <span>Open Editor</span>
                    <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State Dashboard */
          <div className="p-12 bg-neutral-900 border border-dashed border-neutral-800 rounded-xl text-center flex flex-col items-center justify-center py-20 select-none">
            <div className="h-12 w-12 bg-neutral-950 rounded-full flex items-center justify-center border border-neutral-800 mb-4 text-neutral-500 shadow-inner">
              <LayoutGrid className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight mb-1">No websites yet.</h3>
            <p className="text-xs text-neutral-500 max-w-sm mb-6 leading-relaxed">
              Start with our professionally designed frozen templates. Fill out the business wizard and launch inside the canvas in seconds!
            </p>
            <Link
              href="/wizard"
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              Create Your First Website
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
