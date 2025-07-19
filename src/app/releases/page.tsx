import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { releaseNotes } from "@/lib/data";
import { Rocket } from "lucide-react";

export default function ReleasesPage() {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="News & Releases"
        description="Stay up to date with the latest updates and improvements to RadioVerse."
      />
      <div className="max-w-4xl mx-auto pt-6">
        <Card>
          <CardContent className="p-6">
            <div className="relative pl-6 after:absolute after:inset-y-0 after:w-px after:bg-muted-foreground/20 after:left-0">
              {releaseNotes.map((note, index) => (
                <div key={note.version} className="grid gap-2 pb-8 grid-cols-[auto_1fr]">
                    <div className="flex items-center">
                        <div className="z-10 bg-background flex items-center justify-center w-8 h-8 rounded-full border-2 border-primary mr-6">
                            <Rocket className="w-4 h-4 text-primary" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-4">
                            <h2 className="font-bold text-xl font-headline">Version {note.version}</h2>
                            <p className="text-sm text-muted-foreground">{note.date}</p>
                        </div>
                        <ul className="space-y-2 list-disc pl-5">
                            {note.changes.map((change, i) => (
                                <li key={i}>
                                    <Badge variant={change.type === 'new' ? 'default' : 'secondary'} className="mr-2 capitalize">{change.type}</Badge>
                                    {change.description}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
