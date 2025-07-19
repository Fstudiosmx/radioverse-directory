
'use client';

import { tracks } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Clock } from "lucide-react";

export function TrackHistory() {
    // Show last 3 tracks as history, excluding the current one (index 0)
    const historyTracks = tracks.slice(1, 4); 

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recently Played
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {historyTracks.map((track) => (
                        <div key={track.id} className="flex items-center gap-4">
                            <Image 
                                src={track.albumArtUrl}
                                alt={track.album}
                                width={48}
                                height={48}
                                className="rounded-md w-12 h-12 object-cover"
                                data-ai-hint="album cover"
                            />
                            <div>
                                <p className="font-semibold">{track.title}</p>
                                <p className="text-sm text-muted-foreground">{track.artist}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
