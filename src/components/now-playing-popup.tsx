
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Play, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";

export function NowPlayingPopup() {
    return (
        <Card className="shadow-2xl border-primary/20 bg-background/80 backdrop-blur-md">
            <CardContent className="p-3 flex items-center gap-4">
                 <Link href="/now-playing" className="block shrink-0">
                    <Image
                        src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&h=100&fit=crop"
                        alt="Album Art"
                        width={64}
                        height={64}
                        className="rounded-md aspect-square object-cover"
                        data-ai-hint="album cover"
                    />
                </Link>
                <div className="flex-grow">
                    <p className="font-bold">Tech Noir</p>
                    <p className="text-sm text-muted-foreground">Gunship</p>
                    <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="gap-1.5"><Clock className="w-3 h-3"/>10:35 PM</Badge>
                        <Badge variant="secondary" className="gap-1.5"><Tag className="w-3 h-3"/>Synthwave</Badge>
                    </div>
                </div>
                <Button size="icon" className="w-12 h-12 rounded-full">
                    <Play className="w-6 h-6 fill-primary-foreground" />
                </Button>
            </CardContent>
        </Card>
    );
}

