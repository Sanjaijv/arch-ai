import { EditorLayout } from "@/components/editor/editor-layout";

export default function Home() {
  return (
    <EditorLayout>
      <div className="h-full w-full flex items-center justify-center bg-[radial-gradient(circle_at_center,var(--border-default)_1px,transparent_1px)] bg-[length:24px_24px]">
        <div className="flex flex-col items-center gap-6 text-center px-4">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-text-primary">
              Arch <span className="text-accent-primary italic">AI</span>
            </h1>
            <p className="text-text-secondary text-lg md:text-xl max-w-md mx-auto">
              Real-time collaborative system design workspace powered by AI.
            </p>
          </div>
          
          <div className="flex gap-4 items-center text-text-muted text-sm font-mono bg-surface border border-border-default px-4 py-2 rounded-xl">
            <span className="h-2 w-2 rounded-full bg-accent-primary animate-pulse" />
            Ready to design
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
