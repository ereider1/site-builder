import Link from "next/link";
import { LayoutGrid, Edit3 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 p-8 font-sans antialiased text-neutral-300">
      <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl p-8 text-center space-y-6">
        <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-lg text-white shadow-md mx-auto">
          W
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-white">Website Builder</h1>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
            Welcome to the personal website design library and visual builder. Select a frozen starter design to spin up independent editable clones.
          </p>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <Link 
            href="/templates" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition-colors"
          >
            <LayoutGrid className="w-4 h-4" />
            Choose a Design Template
          </Link>
          
          <Link 
            href="/editor" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-neutral-850 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-semibold text-xs transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            Open Existing Active Project
          </Link>
        </div>
      </div>
    </div>
  );
}
