'use client';

import type { Widget } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ClipboardCopy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type WidgetPreviewProps = {
  widget: Widget;
}

export function WidgetPreview({ widget }: WidgetPreviewProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(widget.embedCode);
    toast({
      title: "Copied to clipboard!",
      description: "You can now paste the widget code into your website.",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">{widget.name}</CardTitle>
        <CardDescription>{widget.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/50 rounded-lg p-8 flex items-center justify-center min-h-[150px] mb-4">
          <p className="text-muted-foreground italic">Widget Preview Area</p>
        </div>
        <div className="relative bg-zinc-900 rounded-md">
          <pre className="text-sm text-white p-4 overflow-x-auto">
            <code>
              {widget.embedCode}
            </code>
          </pre>
          <Button size="icon" variant="ghost" className="absolute top-2 right-2 text-white hover:bg-zinc-700" onClick={handleCopy}>
            <ClipboardCopy className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
