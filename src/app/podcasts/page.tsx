import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { podcasts } from "@/lib/data";
import { PlayCircle, Rss } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function PodcastsPage() {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="Podcasts"
        description="Listen to your favorite shows and discover new ones."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {podcasts.map((podcast) => (
          <Link href={`/podcast/${podcast.id}`} key={podcast.id} className="block hover:no-underline">
            <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300 h-full">
              <CardHeader className="p-0">
                <Image
                    src={podcast.imageUrl}
                    alt={podcast.name}
                    width={400}
                    height={400}
                    className="object-cover w-full h-48"
                    data-ai-hint="podcast cover art"
                  />
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                  <CardTitle className="font-headline text-xl mb-1">{podcast.name}</CardTitle>
                  <p className="text-sm text-muted-foreground font-medium mb-2">By {podcast.author}</p>
                  <CardDescription className="text-sm">{podcast.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <Badge variant="secondary" className="gap-1.5">
                      <Rss className="w-4 h-4" />
                      {podcast.episodes.length} Episodes
                  </Badge>
                  <Button>
                      <PlayCircle className="w-5 h-5 mr-2"/>
                      Listen
                  </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
