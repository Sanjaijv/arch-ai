"use client";

import { useOthers } from "@liveblocks/react/suspense";
import { UserButton, useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const MAX_COLLABORATORS = 5;

export function Collaborators() {
  const { user } = useUser();
  const others = useOthers();
  
  // Filter out any connection that belongs to the current user (same userId)
  const filteredOthers = others.filter(other => other.id !== user?.id);
  
  const hasCollaborators = filteredOthers.length > 0;
  const collaborators = filteredOthers.slice(0, MAX_COLLABORATORS);
  const overflow = filteredOthers.length - MAX_COLLABORATORS;

  return (
    <div className="flex items-center gap-2 p-1.5 bg-surface/80 backdrop-blur-xl border border-border-default rounded-full shadow-2xl pointer-events-auto ring-1 ring-white/5">
      {hasCollaborators && (
        <div className="flex -space-x-3 pl-1">
          {collaborators.map(({ connectionId, info }) => (
            <Avatar 
              key={connectionId} 
              className="h-8 w-8 border-2 border-surface shrink-0 ring-1 ring-black/20"
              style={{ borderColor: info.color }}
            >
              <AvatarImage src={info.avatar} alt={info.name} />
              <AvatarFallback className="text-[10px] font-medium bg-subtle text-text-secondary">
                {info.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          ))}
          
          {overflow > 0 && (
            <div className="h-8 w-8 rounded-full bg-subtle border-2 border-surface flex items-center justify-center text-[10px] font-bold text-text-secondary shrink-0 z-10">
              +{overflow}
            </div>
          )}
        </div>
      )}

      {hasCollaborators && (
        <div className="w-[1px] h-4 bg-border-default mx-0.5" />
      )}

      <div className="flex items-center justify-center">
        <UserButton 
          appearance={{
            elements: {
              userButtonAvatarBox: "h-8 w-8"
            }
          }}
        />
      </div>
    </div>
  );
}
