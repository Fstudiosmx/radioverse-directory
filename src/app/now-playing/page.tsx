
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ListMusic, Mic, Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Apple } from "lucide-react";

export default function NowPlayingPage() {
  const song = {
    title: "Tech Noir",
    artist: "Gunship",
    album: "Gunship",
    year: "2015",
    coverUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=800&fit=crop",
    lyrics: `
[Verse 1]
I remember the first time I saw you
You were standing in a smokey room
At a party in the Hollywood Hills
You were talking to some actor I knew

[Chorus]
And I thought to myself
She's a tech noir
She's a tech noir
She's a tech noir
And I want her
...and so on.
`
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
          <Link href="/panel/minisite">&larr; Back to Minisite</Link>
        </Button>
      </div>
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="aspect-square relative w-full max-w-md mx-auto">
          <Image
            src={song.coverUrl}
            alt={`${song.album} cover art`}
            fill
            className="rounded-lg shadow-2xl shadow-primary/20 object-cover"
            data-ai-hint="album cover"
          />
        </div>
        <div className="space-y-6">
          <div>
            <Badge>Now Playing</Badge>
            <h1 className="text-5xl md:text-6xl font-headline font-bold mt-2">{song.title}</h1>
            <p className="text-2xl text-white/70">{song.artist}</p>
            <p className="text-md text-white/50">{song.album} ({song.year})</p>
          </div>
          
          <div className="p-4 bg-white/5 rounded-lg space-y-3">
              <h3 className="font-semibold flex items-center gap-2"><ListMusic className="w-5 h-5 text-primary"/> Lyrics</h3>
              <div className="h-48 overflow-y-auto pr-2">
                <p className="text-white/70 whitespace-pre-wrap font-mono text-sm">
                    {song.lyrics}
                </p>
              </div>
          </div>
          
          <div className="p-4 bg-white/5 rounded-lg">
               <h3 className="font-semibold flex items-center gap-2 mb-3"><Mic className="w-5 h-5 text-primary"/> Listen On</h3>
               <div className="flex flex-col sm:flex-row gap-4">
                   <Button variant="outline" className="flex-1 bg-transparent text-white border-white/20 hover:bg-white/10">
                       <Music className="mr-2 h-5 w-5"/> Spotify
                   </Button>
                   <Button variant="outline" className="flex-1 bg-transparent text-white border-white/20 hover:bg-white/10">
                       <Apple className="mr-2 h-5 w-5"/> Apple Music
                   </Button>
               </div>
          </div>

        </div>
      </div>
    </div>
  );
}
