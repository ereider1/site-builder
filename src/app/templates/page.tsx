"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useBuilderStore } from "@/store/builderStore";
import { starterTemplatesRegistry } from "@/lib/templatesRegistry";
import Link from "next/link";
import { LayoutGrid, ArrowRight, ArrowLeft } from "lucide-react";

export default function TemplatesPage() {
  const router = useRouter();
  const { cloneTemplate } = useBuilderStore();

  const handleUseTemplate = (templateId: string) => {
    const newProjectId = cloneTemplate(templateId);
    if (newProjectId) {
      router.push("/editor");
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-700 font-sans antialiased">
      {/* 1. Simple Minimal Top Bar */}
      <header className="h-14 border-b border-stone-200 flex items-center justify-between px-8 bg-white shadow-sm">
        <Link href="/" className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider">
          Starter Registry
        </span>
      </header>

      {/* 2. Page Hero Grid Banner */}
      <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        <div className="space-y-3 mb-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-stone-200 rounded-full text-xs text-indigo-600 font-medium select-none shadow-sm">
            <LayoutGrid className="w-3.5 h-3.5" />
            Template Registry (v2)
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900">
            Choose a premium starter design.
          </h1>
          <p className="text-sm text-stone-500 leading-relaxed">
            Select a design below to spawn a completely independent cloned website project. You can fully fine-tune, edit content, and restructure the site inside the builder.
          </p>
        </div>

        {/* 3. Single Template Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {starterTemplatesRegistry.map((template) => (
            <div
              key={template.id}
              className="bg-white border border-stone-200 rounded-xl overflow-hidden hover:border-stone-400 hover:shadow-md transition-all duration-300 group flex flex-col h-full"
            >
              {/* Aspect Ratio Image Mock */}
              <div className="relative w-full aspect-[4/3] bg-stone-100 overflow-hidden border-b border-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={template.previewImage}
                  alt={template.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/10 via-transparent to-transparent opacity-40" />
              </div>

              {/* Template Metadatas */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-2 mb-6">
                  <h3 className="text-lg font-bold text-stone-900 tracking-tight">
                    {template.name}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {template.description}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-1.5 select-none">
                    {["Premium", "Responsive", "Zero dependencies", "Frozen"].map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-stone-50 border border-stone-200 rounded text-[10px] text-stone-400 font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleUseTemplate(template.id)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 font-semibold text-xs text-white rounded-lg transition-all group/btn shadow-md"
                >
                  Use Template
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                </button>
              </div>
            </div>
          ))}

          {/* Minimal Empty state block for future scaling placeholder representation */}
          <div className="border border-dashed border-stone-300 rounded-xl p-8 flex flex-col items-center justify-center text-center aspect-[4/3.1] select-none bg-white/50">
            <LayoutGrid className="w-8 h-8 text-stone-300 mb-3" />
            <h3 className="text-sm font-bold text-stone-800">Scaling Placeholder</h3>
            <p className="text-xs text-stone-400 mt-1 max-w-xs leading-relaxed">
              Future, beautifully designed consultant, studio, and structural template releases will spawn right inside this discovery area.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
