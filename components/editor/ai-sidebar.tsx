"use client";

import { X, Sparkles, Send, Bot, FileText, Download, Wand2, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useStorage, useMutation, useSelf, useOthers } from "@liveblocks/react/suspense";
import { LiveObject } from "@liveblocks/client";
import { AIStatusMessageSchema, type AIStatusMessage, AIChatMessageSchema, type AIChatMessage } from "@/types/tasks";
import { useRealtimeRun } from "@trigger.dev/react-hooks";
import type { designAgent } from "@/trigger/design-agent";

interface AiSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AiSidebar({ isOpen, onClose }: AiSidebarProps) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [activeRunId, setActiveRunId] = useState<string | null>(null);
  const [publicToken, setPublicToken] = useState<string | null>(null);

  const [specs, setSpecs] = useState<any[]>([]);
  const [isLoadingSpecs, setIsLoadingSpecs] = useState(false);
  const [selectedSpec, setSelectedSpec] = useState<any | null>(null);
  const [specContent, setSpecContent] = useState<string | null>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [isGeneratingSpec, setIsGeneratingSpec] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { roomId } = useParams() as { roomId: string };
  
  const others = useOthers();
  const self = useSelf();
  
  const fetchSpecs = useCallback(async () => {
    if (!roomId) return;
    setIsLoadingSpecs(true);
    try {
      const res = await fetch(`/api/projects/${roomId}/specs`);
      if (res.ok) {
        const data = await res.json();
        setSpecs(data);
      }
    } catch (error) {
      console.error("Failed to fetch specs", error);
    } finally {
      setIsLoadingSpecs(false);
    }
  }, [roomId]);

  useEffect(() => {
    fetchSpecs();
  }, [fetchSpecs]);

  // Collaborative "thinking" state from presence
  const isAiThinking = self?.presence.thinking || others.some(other => other.presence.thinking);

  // 1. Subscribe to the real-time run (for the trigger-er only)
  const { run } = useRealtimeRun<typeof designAgent>(activeRunId || "", {
    accessToken: publicToken || "",
    enabled: !!activeRunId && !!publicToken,
    onComplete: () => {
      setActiveRunId(null);
      setPublicToken(null);
      // Refresh the specs list in case this was a spec generation task
      fetchSpecs();
    },
  });

  const isLocalRunActive = run?.status === "EXECUTING" || run?.status === "QUEUED";
  
  // Input is disabled if we are submitting, if AI is already thinking (collaborative), or if we have an active local run
  const isInputDisabled = !roomId || isSubmitting || isAiThinking || isLocalRunActive;

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(Math.max(textarea.scrollHeight, 72), 160);
      textarea.style.height = `${newHeight}px`;
    }
  }, [message]);

  const handlePreviewSpec = async (spec: any) => {
    setSelectedSpec(spec);
    setIsLoadingContent(true);
    setSpecContent(null);
    try {
      const res = await fetch(`/api/projects/${roomId}/specs/${spec.id}/download`);
      if (res.ok) {
        const text = await res.text();
        setSpecContent(text);
      } else {
        setSpecContent("Failed to load spec content.");
      }
    } catch (error) {
      console.error("Failed to fetch spec content", error);
      setSpecContent("Failed to load spec content.");
    } finally {
      setIsLoadingContent(false);
    }
  };

  const handleDownloadSpec = (e: React.MouseEvent, spec: any) => {
    e.stopPropagation();
    window.open(`/api/projects/${roomId}/specs/${spec.id}/download`, '_blank');
  };

  const handleGenerateSpec = useMutation(async ({ storage }) => {
    if (!roomId) return;
    setIsGeneratingSpec(true);
    
    // Convert LiveLists/LiveMaps to plain JS objects using Liveblocks best practice (toJSON)
    const rawChat = storage.get("ai-chat");
    const chatHistory = rawChat ? (typeof (rawChat as any).toJSON === 'function' ? (rawChat as any).toJSON() : (Array.isArray(rawChat) ? rawChat : [])) : [];
    
    const flow = storage.get("flow");
    const nodesMap = flow?.get("nodes");
    const edgesMap = flow?.get("edges");
    
    const nodes = nodesMap ? Object.values((nodesMap as any).toJSON()) : [];
    const edges = edgesMap ? Object.values((edgesMap as any).toJSON()) : [];

    try {
      const res = await fetch("/api/ai/spec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId,
          chatHistory,
          nodes,
          edges
        })
      });
      
      if (!res.ok) throw new Error("Failed to start spec generation");
      const data = await res.json();
      
      const tokenRes = await fetch("/api/ai/spec/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ runId: data.runId })
      });
      
      if (tokenRes.ok) {
        const tokenData = await tokenRes.json();
        setPublicToken(tokenData.token);
      }
      setActiveRunId(data.runId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGeneratingSpec(false);
    }
  }, [roomId]);

  const pushToChat = useMutation(({ storage }, messageContent: string, role: "user" | "assistant" = "user") => {
    const chat = storage.get("ai-chat");
    if (!chat) return;

    chat.push({
      id: crypto.randomUUID(),
      content: messageContent,
      sender: role === "user" ? {
        id: self?.id || "anonymous",
        name: self?.info.name || "Anonymous",
        avatar: self?.info.avatar || "",
      } : {
        id: "ghost-ai",
        name: "Ghost AI",
        avatar: "https://arch-ai.com/ghost-ai.png",
      },
      role,
      timestamp: Date.now(),
    });
  }, [self]);

  const handleSubmit = async () => {
    if (!message || !roomId || isInputDisabled) return;

    const prompt = message;
    setIsSubmitting(true);
    setHasError(false);
    
    try {
      // 1. Push user message to chat
      pushToChat(prompt, "user");
      
      // 2. Clear input early for better UX
      setMessage("");
      
      // 3. Call design agent API
      const response = await fetch("/api/ai/design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, roomId }),
      });

      if (!response.ok) {
        throw new Error("Failed to trigger AI design");
      }

      const data = await response.json();
      
      // 4. Store run details for tracking
      setActiveRunId(data.runId);
      setPublicToken(data.publicToken);
      
    } catch (error) {
      console.error("Failed to send message:", error);
      setHasError(true);
      pushToChat("Sorry, I failed to start the design process. Please check your connection and try again.", "assistant");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <aside className="absolute right-0 top-0 bottom-0 w-ai-sidebar border-l border-border-default bg-base/95 backdrop-blur-xl flex flex-col z-40 animate-in slide-in-from-right duration-300 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-border-default shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-accent-ai/10 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-accent-ai" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-text-primary leading-none">AI Workspace</h3>
            <span className="text-[11px] text-text-muted mt-1">Collaborate with Ghost AI</span>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="h-8 w-8 text-text-muted hover:text-text-primary hover:bg-subtle"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="architect" className="flex-1 flex flex-col overflow-hidden">
        <div className="px-5 py-3">
          <TabsList className="w-full bg-subtle p-1 h-9">
            <TabsTrigger 
              value="architect" 
              className="flex-1 text-xs data-[state=active]:bg-accent-primary data-[state=active]:text-base"
            >
              AI Architect
            </TabsTrigger>
            <TabsTrigger 
              value="specs" 
              className="flex-1 text-xs data-[state=active]:bg-accent-primary data-[state=active]:text-base"
            >
              Specs
            </TabsTrigger>
          </TabsList>
        </div>

        {/* AI Architect Tab */}
        <TabsContent value="architect" className="flex-1 flex flex-col m-0 overflow-hidden">
          <ScrollArea className="flex-1 px-5">
            <div className="py-6 flex flex-col gap-6">
              {roomId ? (
                <div className="flex flex-col gap-6">
                  <ChatFeed emptyState={<EmptyState />} />
                </div>
              ) : (
                <div className="flex flex-col items-center text-center py-10 space-y-6">
                  <div className="h-16 w-16 rounded-3xl bg-accent-ai/10 flex items-center justify-center">
                    <Bot className="h-8 w-8 text-accent-ai" />
                  </div>
                  <div className="space-y-2 px-4">
                    <p className="text-sm font-medium text-text-primary">Ghost AI is ready to help</p>
                    <p className="text-xs text-text-muted leading-relaxed">
                      Select or create a project to start collaborating with AI.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-5 border-t border-border-default bg-base/50">
            {/* Show status strip if AI is thinking or we have a run active */}
            {(isLocalRunActive || isAiThinking) && <StatusStrip />}
            
            {hasError && (
              <div className="flex items-center gap-2 mb-3 px-2 text-state-error animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="h-3 w-3" />
                <span className="text-[10px] font-medium">Failed to send message. Try again.</span>
              </div>
            )}
            <div className="relative group mt-2">
              <Textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={roomId ? (isAiThinking || isLocalRunActive ? "Ghost AI is working..." : "Ask Ghost AI to design...") : "Join a project to chat..."}
                disabled={isInputDisabled}
                className="min-h-[72px] max-h-[160px] w-full bg-subtle border-border-default text-xs resize-none rounded-2xl py-4 pl-4 pr-12 focus-visible:ring-1 focus-visible:ring-accent-primary transition-all shadow-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              <Button 
                size="icon" 
                onClick={handleSubmit}
                className={cn(
                  "absolute right-2 bottom-2 h-8 w-8 rounded-xl transition-all duration-200",
                  (message && !isInputDisabled) ? "bg-accent-user text-white shadow-md shadow-accent-user/20" : "bg-border-default text-text-muted cursor-not-allowed"
                )}
                disabled={!message || isInputDisabled}
              >
                {isSubmitting || isLocalRunActive ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Send className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Specs Tab */}
        <TabsContent value="specs" className="flex-1 flex flex-col m-0 p-5 gap-6">
          <Button 
            disabled={!roomId || isGeneratingSpec || isLocalRunActive}
            onClick={handleGenerateSpec}
            className="w-full bg-accent-primary hover:bg-accent-primary/90 text-base font-semibold py-6 rounded-xl shadow-lg shadow-accent-primary/20"
          >
            {isGeneratingSpec || isLocalRunActive ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Wand2 className="h-4 w-4 mr-2" />
            )}
            Generate Spec
          </Button>

          <div className="space-y-3">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider px-1">Recent Specs</span>
            {isLoadingSpecs ? (
              <div className="flex justify-center p-4">
                <Loader2 className="h-5 w-5 animate-spin text-text-muted" />
              </div>
            ) : specs.length === 0 ? (
              <div className="group p-4 bg-elevated border border-border-default rounded-2xl hover:border-accent-ai/50 transition-all cursor-default opacity-50">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-accent-ai/10 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-accent-ai" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-text-primary truncate">No specs yet</h4>
                    <p className="text-[10px] text-text-muted mt-1 line-clamp-2 leading-relaxed">
                      Generate your first specification to see it here.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {specs.map(spec => (
                  <div 
                    key={spec.id}
                    onClick={() => handlePreviewSpec(spec)}
                    className="group p-4 bg-elevated border border-border-default rounded-2xl hover:border-accent-primary/50 hover:bg-subtle transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="h-8 w-8 rounded-lg bg-accent-primary/10 flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4 text-accent-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-text-primary truncate">
                          {spec.filePath ? spec.filePath.split('/').pop() : `Spec ${spec.id.slice(0, 8)}`}
                        </h4>
                        <p className="text-[10px] text-text-muted mt-0.5">
                          {new Date(spec.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleDownloadSpec(e, spec)}
                      className="h-8 w-8 text-text-muted hover:text-text-primary shrink-0 ml-2"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Spec Preview Modal */}
      <Dialog open={!!selectedSpec} onOpenChange={(open) => !open && setSelectedSpec(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader className="shrink-0 flex flex-row items-center justify-between pr-8">
            <DialogTitle>Spec Preview</DialogTitle>
            {selectedSpec && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={(e) => handleDownloadSpec(e, selectedSpec)}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            )}
          </DialogHeader>
          <ScrollArea className="flex-1 mt-4 rounded-md border p-4 bg-muted/20">
            {isLoadingContent ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <pre className="whitespace-pre-wrap text-sm font-mono text-foreground">
                {specContent}
              </pre>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </aside>
  );
}

function StatusStrip() {
  const statusFeed = useStorage((root) => root["ai-status-feed"]);
  
  if (!statusFeed || statusFeed.length === 0) return null;
  
  const latestStatus = statusFeed[statusFeed.length - 1];
  const validation = AIStatusMessageSchema.safeParse(latestStatus);
  
  if (!validation.success) return null;
  const status = validation.data;

  return (
    <div className="flex items-center gap-2 mb-2 px-3 py-1.5 rounded-lg bg-accent-ai/10 border border-accent-ai/20 animate-in fade-in slide-in-from-bottom-1">
      <div className="h-1.5 w-1.5 rounded-full bg-accent-ai animate-pulse shrink-0" />
      <span className="text-[10px] font-medium text-text-secondary truncate">
        {status.text || status.message}
      </span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center text-center py-10 space-y-6">
      <div className="h-16 w-16 rounded-3xl bg-accent-ai/10 flex items-center justify-center">
        <Bot className="h-8 w-8 text-accent-ai" />
      </div>
      <div className="space-y-2 px-4">
        <p className="text-sm font-medium text-text-primary">Ghost AI is ready to help</p>
        <p className="text-xs text-text-muted leading-relaxed">
          Ask me to design systems, generate documentation, or optimize your architecture.
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full">
        {[
          "Design an e-commerce backend",
          "Create a chat app architecture",
          "Build a CI/CD pipeline"
        ].map((chip) => (
          <button
            key={chip}
            className="text-[11px] font-medium px-4 py-2.5 rounded-xl bg-subtle text-accent-ai-text hover:bg-border-default transition-colors text-left"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}

function ChatFeed({ emptyState }: { emptyState: React.ReactNode }) {
  const chatMessages = useStorage((root) => root["ai-chat"]);
  const others = useOthers();
  const self = useSelf();
  const isAiThinking = self?.presence.thinking || others.some(other => other.presence.thinking);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive or when AI starts thinking
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages?.length, isAiThinking]);

  if (!chatMessages || chatMessages.length === 0) {
    return <>{emptyState}</>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 px-1">
        <div className="h-px flex-1 bg-border-default" />
        <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Chat</span>
        <div className="h-px flex-1 bg-border-default" />
      </div>

      {chatMessages.map((msg) => {
        // Validate message
        const validation = AIChatMessageSchema.safeParse(msg);
        if (!validation.success) {
          console.error("Invalid chat message:", validation.error);
          return null;
        }

        const message = validation.data;
        const isAssistant = message.role === "assistant";

        return (
          <div 
            key={message.id}
            className={cn(
              "flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300",
              isAssistant ? "items-start" : "items-end"
            )}
          >
            <div className={cn(
              "flex items-center gap-2",
              isAssistant ? "flex-row" : "flex-row-reverse"
            )}>
              <img 
                src={message.sender.avatar} 
                alt={message.sender.name}
                className="h-5 w-5 rounded-full border border-border-default"
              />
              <span className="text-[10px] font-medium text-text-secondary">
                {message.sender.name}
              </span>
              <span className="text-[9px] text-text-faint">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className={cn(
              "max-w-[90%] px-3 py-2 rounded-2xl text-xs leading-relaxed shadow-sm",
              isAssistant 
                ? "bg-elevated text-text-primary border border-border-default rounded-tl-none" 
                : "bg-accent-user text-white border border-accent-user/20 rounded-tr-none"
            )}
            >
              {message.content}
            </div>
          </div>
        );
      })}
      
      {isAiThinking && (
        <div className="flex items-start gap-3 p-1 animate-in fade-in slide-in-from-bottom-1">
          <div className="h-5 w-5 rounded-full bg-accent-ai/10 flex items-center justify-center shrink-0">
             <Loader2 className="h-3 w-3 text-accent-ai animate-spin" />
          </div>
          <div className="bg-elevated border border-border-default px-3 py-2 rounded-2xl rounded-tl-none flex items-center gap-2">
            <span className="text-xs text-text-muted italic">Ghost AI is working...</span>
          </div>
        </div>
      )}
      
      <div ref={scrollRef} />
    </div>
  );
}
