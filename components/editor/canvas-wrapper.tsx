"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveMap, LiveObject, LiveList } from "@liveblocks/client";
import { ErrorBoundary } from "react-error-boundary";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactFlowProvider } from "@xyflow/react";

interface CanvasWrapperProps {
  roomId: string;
  children: ReactNode;
}

function ErrorFallback({ resetErrorBoundary }: { resetErrorBoundary: () => void }) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-bg-base text-center p-6">
      <div className="h-16 w-16 rounded-2xl bg-state-error/10 flex items-center justify-center mb-4">
        <AlertCircle className="h-8 w-8 text-state-error" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">Connection Error</h3>
      <p className="text-sm text-text-muted max-w-md mb-6">
        We couldn't connect to the collaborative session. This might be due to a network issue or an expired session.
      </p>
      <Button onClick={resetErrorBoundary} variant="outline" className="rounded-xl">
        Try Again
      </Button>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-bg-base">
      <Loader2 className="h-8 w-8 text-accent-primary animate-spin mb-4" />
      <p className="text-sm text-text-muted font-medium animate-pulse">
        Joining session...
      </p>
    </div>
  );
}

export function CanvasWrapper({ roomId, children }: CanvasWrapperProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
      <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
        <RoomProvider 
          id={roomId} 
          initialPresence={{ cursor: null, thinking: false }}
          initialStorage={{
            flow: new LiveObject({
              nodes: new LiveMap(),
              edges: new LiveMap(),
            }),
            "ai-status-feed": new LiveList([]),
            "ai-chat": new LiveList([]),
          }}
        >
          <ClientSideSuspense fallback={<LoadingFallback />}>
            <ReactFlowProvider>
              {children}
            </ReactFlowProvider>
          </ClientSideSuspense>
        </RoomProvider>
      </LiveblocksProvider>
    </ErrorBoundary>
  );
}
