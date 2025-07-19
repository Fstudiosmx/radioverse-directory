import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { stations, users } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Rss, Star, Heart, MessageCircle, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { StreamPlayer } from "@/components/stream-player";
import { TrackHistory } from "@/components/track-history";
import { StreamAudioPlayer } from "@/components/stream-audio-player";
import Link from "next/link";

export default function StationDetailPage({ params }: { params: { id: string } }) {
  const station = stations.find(s => s.id === params.id);

  if (!station) {
    notFound();
  }

  const chatUsers = users.slice(0, 2);

  return (
    <div className="flex-1 space-y-4 -m-4 sm:-m-6">
      <div className="max-w-full">
        <div className="relative h-48 md:h-64 w-full">
            <Image
                src={station.imageUrl}
                alt={station.name}
                fill
                className="w-full h-full object-cover"
                data-ai-hint="radio station background"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 md:p-6">
                <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">{station.name}</h1>
                <p className="text-md md:text-xl text-muted-foreground drop-shadow-md">{station.description}</p>
            </div>
        </div>

        <div className="p-4 md:p-6 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {station.playerWidgetUrl ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Live Player</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <iframe 
                                width="100%" 
                                height="316" 
                                frameBorder="0" 
                                src={station.playerWidgetUrl}
                                className="rounded-lg"
                            ></iframe>
                        </CardContent>
                    </Card>
                ) : station.streamUrl ? (
                    <StreamAudioPlayer streamUrl={station.streamUrl} />
                ) : null}
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageCircle /> Live Chat <Badge variant="destructive">Beta</Badge>
                    </CardTitle>
                    <CardDescription>Chat with other listeners in real-time.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 h-64 overflow-y-auto p-4 border rounded-lg bg-muted/50">
                        {chatUsers.map(user => (
                            <div key={user.id} className="flex gap-3 items-start">
                                <Link href={`/profile/${user.id}`}>
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src={user.avatarUrl} data-ai-hint="person"/>
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <Link href={`/profile/${user.id}`} className="font-semibold text-sm hover:underline">{user.name}</Link>
                                    <p className="text-sm bg-background p-2 rounded-lg">This is a sample chat message!</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex gap-2">
                        <Input placeholder="Say something..." />
                        <Button><Send className="w-4 h-4" /></Button>
                    </div>
                  </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Station Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Listeners</span>
                            <span className="font-bold">1,234</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Genre</span>
                            <Badge>Synthwave</Badge>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Software</span>
                            <Badge variant="secondary">{station.software}</Badge>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Protocol</span>
                             <Badge variant="secondary">{station.protocol}</Badge>
                         </div>
                         <div className="flex gap-2 pt-4">
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
                {station.historyWidgetUrl ? (
                     <Card>
                        <CardHeader>
                            <CardTitle>Recently Played</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <iframe 
                                width="100%" 
                                height="511" 
                                frameBorder="0" 
                                src={station.historyWidgetUrl}
                                className="rounded-lg"
                            ></iframe>
                        </CardContent>
                    </Card>
                ) : (
                    <TrackHistory />
                )}
            </div>
        </div>
      </div>
    </div>
  )
}
