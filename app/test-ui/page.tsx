import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LucideTerminal } from "lucide-react";

export default function TestUiPage() {
  return (
    <div className="p-8 space-y-8 bg-base min-h-screen text-text-primary">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <LucideTerminal className="text-accent-primary" />
          Design System Test
        </h1>
        <p className="text-text-muted">Verifying dark-only technical workspace tokens and components.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-surface border-border-default">
          <CardHeader>
            <CardTitle className="text-accent-ai-text">Color Tokens</CardTitle>
            <CardDescription>Direct usage of CSS variables via Tailwind classes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 bg-accent-primary rounded-xl" />
              <span>Accent Primary (Cyan)</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 bg-accent-ai rounded-xl" />
              <span>AI Accent (Indigo)</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 bg-state-error rounded-xl" />
              <span>State Error</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 bg-state-success rounded-xl" />
              <span>State Success</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elevated border-border-subtle">
          <CardHeader>
            <CardTitle>Core Components</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-text-muted">Input Field</label>
              <Input placeholder="Enter something..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-text-muted">Textarea</label>
              <Textarea placeholder="Type notes here..." />
            </div>
            <div className="flex gap-4">
              <Button variant="default">Primary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost" className="text-accent-ai-text">AI Action</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-surface border-border-default">
        <CardHeader>
          <CardTitle>Complex Layout Components</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="bg-subtle border-border-default">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="p-4 bg-elevated rounded-2xl border border-border-subtle mt-4">
              <p>This is the overview tab content using surface-elevated.</p>
            </TabsContent>
            <TabsContent value="logs" className="mt-4">
              <ScrollArea className="h-[100px] w-full rounded-xl border border-border-default p-4 bg-subtle">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="text-sm text-text-faint">
                    [2026-05-10 09:22:45] SYSTEM_LOG_EVENT_{i}: Successfully initialized component layer.
                  </div>
                ))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
