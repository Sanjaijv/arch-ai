"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CANVAS_TEMPLATES, CanvasTemplate } from "./starter-templates";
import { cn } from "@/lib/utils";
import { CanvasNode, CanvasEdge } from "@/types/canvas";

interface StarterTemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (template: CanvasTemplate) => void;
}

export function StarterTemplatesModal({
  isOpen,
  onClose,
  onImport,
}: StarterTemplatesModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl max-h-[85vh] p-0 flex flex-col">
        <DialogHeader className="p-6 border-b border-white/5">
          <DialogTitle className="text-xl">Starter Templates</DialogTitle>
          <DialogDescription>
            Choose a pre-built diagram to kickstart your architecture.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CANVAS_TEMPLATES.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelect={() => {
                  onImport(template);
                  onClose();
                }}
              />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function TemplateCard({
  template,
  onSelect,
}: {
  template: CanvasTemplate;
  onSelect: () => void;
}) {
  return (
    <div className="group flex flex-col bg-surface border border-white/5 rounded-xl overflow-hidden hover:border-accent-primary/50 transition-all h-full">
      <div className="aspect-video bg-base/50 relative overflow-hidden p-4 shrink-0">
        <TemplatePreview nodes={template.nodes} edges={template.edges} />
      </div>
      <div className="p-4 flex flex-col flex-1 min-h-[140px]">
        <h3 className="font-semibold text-text-primary mb-1 min-w-0">{template.name}</h3>
        <p className="text-sm text-text-muted mb-4 flex-1 line-clamp-2 leading-relaxed">
          {template.description}
        </p>
        <div className="mt-auto pt-2">
          <Button 
            onClick={onSelect}
            className="w-full bg-accent-primary/10 text-accent-primary hover:bg-accent-primary hover:text-white transition-colors whitespace-nowrap overflow-hidden text-ellipsis px-4"
          >
            Use Template
          </Button>
        </div>
      </div>
    </div>
  );
}

function TemplatePreview({ nodes, edges }: { nodes: CanvasNode[]; edges: CanvasEdge[] }) {
  const bounds = useMemo(() => {
    if (nodes.length === 0) return { minX: 0, minY: 0, maxX: 100, maxY: 100 };
    
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    nodes.forEach((node) => {
      const { x, y } = node.position;
      const { width = 150, height = 100 } = node.data;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x + width);
      maxY = Math.max(maxY, y + height);
    });

    // Add padding
    const padding = 40;
    return {
      minX: minX - padding,
      minY: minY - padding,
      maxX: maxX + padding,
      maxY: maxY + padding,
    };
  }, [nodes]);

  const viewBox = `${bounds.minX} ${bounds.minY} ${bounds.maxX - bounds.minX} ${bounds.maxY - bounds.minY}`;

  return (
    <svg 
      viewBox={viewBox} 
      className="w-full h-full drop-shadow-sm"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Draw Edges */}
      {edges.map((edge) => {
        const sourceNode = nodes.find((n) => n.id === edge.source);
        const targetNode = nodes.find((n) => n.id === edge.target);
        if (!sourceNode || !targetNode) return null;

        const sX = sourceNode.position.x + (sourceNode.data.width || 150) / 2;
        const sY = sourceNode.position.y + (sourceNode.data.height || 100) / 2;
        const tX = targetNode.position.x + (targetNode.data.width || 150) / 2;
        const tY = targetNode.position.y + (targetNode.data.height || 100) / 2;

        return (
          <line
            key={edge.id}
            x1={sX}
            y1={sY}
            x2={tX}
            y2={tY}
            stroke="currentColor"
            className="text-white/20"
            strokeWidth="2"
          />
        );
      })}

      {/* Draw Nodes */}
      {nodes.map((node) => {
        const { x, y } = node.position;
        const { width = 150, height = 100, shape, color } = node.data;
        
        return (
          <g key={node.id} transform={`translate(${x}, ${y})`}>
            {shape === "diamond" ? (
              <path 
                d={`M ${width/2} 2 L ${width-2} ${height/2} L ${width/2} ${height-2} L 2 ${height/2} Z`} 
                fill={color || "#1F1F1F"}
                stroke="white"
                strokeOpacity="0.1"
              />
            ) : shape === "hexagon" ? (
              <path 
                d={`M ${width*0.25} 2 L ${width*0.75} 2 L ${width-2} ${height/2} L ${width*0.75} ${height-2} L ${width*0.25} ${height-2} L 2 ${height/2} Z`} 
                fill={color || "#1F1F1F"}
                stroke="white"
                strokeOpacity="0.1"
              />
            ) : shape === "cylinder" ? (
              <g>
                <path 
                  d={`M 2 ${height*0.15} L 2 ${height*0.85} A ${width*0.48} ${height*0.15} 0 0 0 ${width-2} ${height*0.85} L ${width-2} ${height*0.15}`} 
                  fill={color || "#1F1F1F"}
                  stroke="white"
                  strokeOpacity="0.1"
                />
                <ellipse 
                  cx={width/2} 
                  cy={height*0.15} 
                  rx={width*0.48} 
                  ry={height*0.13} 
                  fill={color || "#1F1F1F"}
                  stroke="white"
                  strokeOpacity="0.1"
                />
              </g>
            ) : (
              <rect
                width={width}
                height={height}
                rx={shape === "circle" || shape === "pill" ? height / 2 : 12}
                fill={color || "#1F1F1F"}
                stroke="white"
                strokeOpacity="0.1"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
