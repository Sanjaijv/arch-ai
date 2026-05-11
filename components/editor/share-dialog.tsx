"use client";

import { useState, useEffect } from "react";
import { Copy, Check, UserPlus, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Collaborator {
  id: string;
  email: string;
  name: string | null;
  imageUrl: string | null;
  createdAt: string;
}

interface ShareDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  isOwner: boolean;
}

export function ShareDialog({
  isOpen,
  onOpenChange,
  projectId,
  isOwner,
}: ShareDialogProps) {
  const [email, setEmail] = useState("");
  const [isInviting, setIsInviting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchCollaborators();
    }
  }, [isOpen, projectId]);

  const fetchCollaborators = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/projects/${projectId}/collaborators`);
      if (res.ok) {
        const data = await res.json();
        setCollaborators(data);
      }
    } catch (error) {
      console.error("Failed to fetch collaborators", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsInviting(true);
    try {
      const res = await fetch(`/api/projects/${projectId}/collaborators`, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setEmail("");
        fetchCollaborators();
      }
    } catch (error) {
      console.error("Failed to invite", error);
    } finally {
      setIsInviting(false);
    }
  };

  const onRemove = async (targetEmail: string) => {
    try {
      const res = await fetch(
        `/api/projects/${projectId}/collaborators/${encodeURIComponent(
          targetEmail
        )}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        fetchCollaborators();
      }
    } catch (error) {
      console.error("Failed to remove collaborator", error);
    }
  };

  const onCopy = () => {
    const url = `${window.location.origin}/editor/${projectId}`;
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-elevated border-border-default">
        <DialogHeader>
          <DialogTitle className="text-text-primary text-xl font-bold">
            Share Project
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Copy Link Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">
              Project Link
            </label>
            <div className="flex gap-2">
              <Input
                readOnly
                value={`${window.location.origin}/editor/${projectId}`}
                className="bg-surface border-border-default text-text-primary h-10"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={onCopy}
                className="shrink-0 border-border-default hover:bg-subtle"
              >
                {isCopied ? (
                  <Check className="h-4 w-4 text-accent-primary" />
                ) : (
                  <Copy className="h-4 w-4 text-text-secondary" />
                )}
              </Button>
            </div>
          </div>

          {/* Invite Section (Owner Only) */}
          {isOwner && (
            <form onSubmit={onInvite} className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">
                Invite Collaborators
              </label>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-surface border-border-default text-text-primary h-10"
                />
                <Button
                  type="submit"
                  disabled={isInviting || !email}
                  className="bg-accent-primary hover:bg-accent-primary/90 text-black font-semibold"
                >
                  {isInviting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Invite"
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* Collaborator List */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-text-secondary">
              Collaborators
            </label>
            <ScrollArea className="h-[200px] rounded-md border border-border-default bg-surface p-2">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-6 w-6 animate-spin text-text-secondary" />
                </div>
              ) : collaborators.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-text-muted gap-2">
                  <UserPlus className="h-8 w-8 opacity-20" />
                  <p className="text-sm">No collaborators yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {collaborators.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-subtle transition-colors"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="h-8 w-8 rounded-full bg-border-default flex-shrink-0 overflow-hidden border border-border-default">
                          {c.imageUrl ? (
                            <img
                              src={c.imageUrl}
                              alt={c.name || c.email}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-accent-primary/10 text-accent-primary font-bold text-xs">
                              {(c.name || c.email).charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-medium text-text-primary truncate">
                            {c.name || c.email}
                          </span>
                          {c.name && (
                            <span className="text-xs text-text-muted truncate">
                              {c.email}
                            </span>
                          )}
                        </div>
                      </div>
                      {isOwner && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemove(c.email)}
                          className="h-8 w-8 text-text-muted hover:text-state-error hover:bg-state-error/10"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
