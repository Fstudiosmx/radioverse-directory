import { PageHeader } from "@/components/page-header";
import { ProductionAlert } from "@/components/production-alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { tvChannels } from "@/lib/data";
import { Heart, Share2, Star, Tv, PlayCircle, Users } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function TVChannelDetailPage({ params }: { params: { id: string } }) {
  const channel = tvChannels.find(c => c.id === params.id);

  if (!channel) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 -m-4 sm:-m-6">
      <div className="w-full">
        {/* Player Section */}
        <div className="w-full bg-black aspect-video flex items-center justify-center text-white relative">
            <div className="text-center z-10">
              <Tv className="w-16 h-16 mx-auto text-muted-foreground" />
              <p className="mt-4 text-lg font-semibold">HLS / M3U8 Player Placeholder</p>
              <p className="text-sm text-muted-foreground">Video stream would appear here.</p>
            </div>
        </div>

        <div className="p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                   <div className="flex items-center gap-4">
                        <Image src={channel.imageUrl} alt={channel.name} width={80} height={80} className="rounded-lg border-2 border-background shadow-lg" data-ai-hint="tv broadcast news" />
                        <div>
                            <h1 className="text-4xl font-headline font-bold">{channel.name}</h1>
                            <p className="text-lg text-muted-foreground mt-1">{channel.description}</p>
                        </div>
                    </div>
                     <Card>
                        <CardHeader>
                            <CardTitle>Schedule</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Live programming schedule will be displayed here.</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-4">
                     <Button size="lg" className="w-full h-12">
                        <PlayCircle className="w-6 h-6 mr-2"/>
                        Watch Live
                    </Button>
                    <Card>
                        <CardContent className="p-4 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground flex items-center gap-2"><Users className="w-4 h-4"/> Viewers</span>
                                <span className="font-bold">5,432</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Category</span>
                                <Badge>{channel.category}</Badge>
                            </div>
                            <div className="flex gap-2 pt-2">
                                <Button variant="outline" className="flex-1">
                                    <Heart className="w-4 h-4 mr-2" />
                                    Favorite
                                </Button>
                                <Button variant="outline" className="flex-1">
                                    <Star className="w-4 h-4 mr-2" />
                                    Rate
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <ProductionAlert />
          </div>
        </div>
      </div>
    </div>
  )
}
