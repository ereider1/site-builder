import { Suspense } from "react";
import { VisualEditor } from "@/components/builder/VisualEditor";

export default function EditorPage() {
  return (
    <Suspense fallback={<div className="flex h-screen bg-neutral-900 text-white items-center justify-center">Loading Visual Workspace...</div>}>
      <VisualEditor />
    </Suspense>
  );
}
