import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 p-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center space-y-6">
        <h1 className="text-2xl font-semibold text-neutral-900">Website Builder</h1>
        <p className="text-neutral-600">
          Welcome to the new personal website design library and builder.
        </p>
        <div className="pt-4">
          <Link 
            href="/editor" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-neutral-800 transition-colors"
          >
            Open Editor
          </Link>
        </div>
      </div>
    </div>
  );
}
