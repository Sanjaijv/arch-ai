import { Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Panel - Hidden on small screens */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-surface border-r border-border-default">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-accent-primary rounded-lg flex items-center justify-center">
            <span className="text-bg-base font-bold text-xl">A</span>
          </div>
          <span className="text-xl font-bold tracking-tighter text-text-primary">
            Arch <span className="text-accent-primary italic">AI</span>
          </span>
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-text-primary leading-tight">
              Design systems with <br />
              <span className="text-accent-ai italic">machine intelligence.</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-md">
              Real-time collaborative canvas for architects and engineers.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className={`text-xs font-semibold uppercase tracking-widest text-text-faint ${geistMono.className}`}>
              Core Capabilities
            </h2>
            <ul className="space-y-3 text-text-secondary">
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-primary" />
                Natural language architecture generation
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-primary" />
                Real-time collaborative canvas
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-primary" />
                Technical specification auto-export
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-primary" />
                Curated system design starters
              </li>
            </ul>
          </div>
        </div>

        <div className="text-sm text-text-faint font-mono">
          © 2026 Arch AI Labs
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex items-center justify-center p-8 bg-base">
        {children}
      </div>
    </div>
  );
}
