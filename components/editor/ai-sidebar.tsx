"use client";

import { X, Sparkles, Send, Bot, FileText, Download, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

interface AiSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AiSidebar({ isOpen, onClose }: AiSidebarProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(Math.max(textarea.scrollHeight, 72), 160);
      textarea.style.height = `${newHeight}px`;
    }
  }, [message]);

  if (!isOpen) return null;

  return (
    <aside className="absolute right-0 top-0 bottom-0 w-85 border-l border-border-default bg-base/95 backdrop-blur-xl flex flex-col z-40 animate-in slide-in-from-right duration-300 shadow-2xl overflow-hidden">
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
              {/* Empty State */}
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

              {/* Message Examples (Visual Only for now) */}
              {/* 
              <div className="flex flex-col gap-4">
                <div className="max-w-[85%] self-end bg-accent-primary-dim border-2 border-accent-primary/50 rounded-2xl rounded-tr-none px-4 py-3">
                  <p className="text-xs text-text-primary">Can you help me design a scalable notification system?</p>
                </div>
                <div className="max-w-[85%] self-start bg-elevated border border-border-default rounded-2xl rounded-tl-none px-4 py-3">
                  <p className="text-xs text-accent-ai-text leading-relaxed">
                    Of course! For a scalable notification system, I'd recommend a pub/sub architecture using Redis or RabbitMQ...
                  </p>
                </div>
              </div>
              */}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-5 border-t border-border-default bg-base/50">
            <div className="relative group">
              <Textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask Ghost AI..."
                className="min-h-[72px] max-h-[160px] w-full bg-subtle border-border-default text-xs resize-none rounded-2xl py-4 pl-4 pr-12 focus-visible:ring-1 focus-visible:ring-accent-primary transition-all shadow-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    // Submit logic here
                    setMessage("");
                  }
                }}
              />
              <Button 
                size="icon" 
                className={cn(
                  "absolute right-2 bottom-2 h-8 w-8 rounded-xl transition-all duration-200",
                  message ? "bg-accent-primary text-base hover:bg-accent-primary/90" : "bg-border-default text-text-muted cursor-not-allowed"
                )}
                disabled={!message}
              >
                <Send className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Specs Tab */}
        <TabsContent value="specs" className="flex-1 flex flex-col m-0 p-5 gap-6">
          <Button className="w-full bg-accent-primary hover:bg-accent-primary/90 text-base font-semibold py-6 rounded-xl shadow-lg shadow-accent-primary/20">
            <Wand2 className="h-4 w-4 mr-2" />
            Generate Spec
          </Button>

          <div className="space-y-3">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider px-1">Recent Specs</span>
            <div className="group p-4 bg-elevated border border-border-default rounded-2xl hover:border-accent-ai/50 transition-all cursor-default">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-accent-ai/10 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 text-accent-ai" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-text-primary truncate">System Architecture v1</h4>
                  <p className="text-[10px] text-text-muted mt-1 line-clamp-2 leading-relaxed">
                    Detailed technical specification for the proposed microservices architecture, including data models and API endpoints...
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between pt-4 border-t border-border-default/50">
                <span className="text-[10px] text-text-faint">May 14, 2026</span>
                <Button variant="ghost" size="sm" disabled className="h-7 px-2 text-[10px] opacity-50">
                  <Download className="h-3 w-3 mr-1.5" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </aside>
  );
}
