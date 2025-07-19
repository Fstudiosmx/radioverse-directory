import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { podcasts } from "@/lib/data";
import { Clock, PlayCircle, Rss, Video } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function PodcastDetailPage({ params }: { params: { id: string } }) {
  const podcast = podcasts.find(p => p.id === params.id);

  if (!podcast) {
    notFound();
  }
  
  const hasVideo = podcast.episodes.some(e => e.videoUrl);

  return (
    <div className="flex-1 space-y-4 -m-4 sm:-m-6">
      <div className="w-full">
        {/* Header Section */}
        <div className="relative h-48 md:h-64 w-full">
            <Image
                src={podcast.imageUrl}
                alt={`${podcast.name} banner`}
                fill
                className="w-full h-full object-cover blur-md"
                data-ai-hint="abstract background"
            />
            <div className="absolute inset-0 bg-black/50" />
        </div>

       <div className="max-w-6xl mx-auto p-4 md:p-6">
         <div className="flex flex-col md:flex-row gap-8 -mt-24 md:-mt-32">
            <Image
                src={podcast.imageUrl}
                alt={podcast.name}
                width={300}
                height={300}
                className="rounded-lg shadow-lg object-cover w-48 h-48 md:w-[250px] md:h-[250px] aspect-square shrink-0 border-4 border-background"
                data-ai-hint="podcast cover art"
            />
            <div className="flex flex-col justify-end pt-4">
                <Badge variant="secondary" className="w-fit mb-2">Podcast</Badge>
                <h1 className="text-4xl md:text-6xl font-headline font-bold text-white text-shadow-lg">{podcast.name}</h1>
                <p className="text-xl text-white/90 mt-2">By {podcast.author}</p>
            </div>
         </div>
        
         <Card className="mt-8">
            <CardContent className="p-6">
                 <p className="max-w-prose">{podcast.description}</p>
            </CardContent>
         </Card>

         <div className="mt-12">
            <PageHeader title="Episodes" description={`All ${podcast.episodes.length} episodes of ${podcast.name}`} />
             <div className="mt-6 space-y-4">
                {podcast.episodes.map(episode => (
                     <Card key={episode.id} className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4">
                        <Button variant="ghost" size="icon" className="mr-4 w-12 h-12 shrink-0">
                           <PlayCircle className="w-10 h-10 text-primary" />
                        </Button>
                        <div className="flex-grow">
                            <h3 className="font-semibold">{episode.title}</h3>
                            <p className="text-sm text-muted-foreground">Released on {episode.releaseDate}</p>
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm gap-4 sm:gap-2 w-full sm:w-auto">
                           {episode.videoUrl && <Badge variant="outline" className="gap-1.5"><Video className="w-4 h-4 text-primary" /> Video</Badge>}
                           <Badge variant="secondary" className="gap-1.5">
                                <Clock className="w-4 h-4" />
                                <span>{episode.duration}</span>
                           </Badge>
                        </div>
                    </Card>
                ))}
            </div>
         </div>

       </div>
    </div>
    </div>
  )
}
