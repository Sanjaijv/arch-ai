import { Lock } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full px-4 text-center space-y-6">
      <div className="h-20 w-20 rounded-full bg-subtle flex items-center justify-center border border-border-default shadow-lg">
        <Lock className="h-10 w-10 text-text-muted" />
      </div>
      
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-text-primary">Access Denied</h1>
        <p className="text-text-secondary max-w-md mx-auto">
          You don't have permission to access this project, or the project doesn't exist.
        </p>
      </div>

      <Link 
        href="/editor"
        className={cn(
          buttonVariants({ variant: "default", size: "lg" }),
          "bg-accent-primary hover:bg-accent-primary/90 text-black font-bold px-8 rounded-xl h-11"
        )}
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
