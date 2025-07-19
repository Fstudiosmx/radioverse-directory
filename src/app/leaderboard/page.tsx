import { PageHeader } from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { stations, podcasts, tvChannels } from "@/lib/data";
import { Medal } from "lucide-react";

export default function LeaderboardPage() {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="Leaderboard"
        description="See which stations, podcasts, and channels are trending."
      />
      <div className="max-w-6xl mx-auto pt-6">
        <Tabs defaultValue="radio" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="radio">Radio Stations</TabsTrigger>
            <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
            <TabsTrigger value="tv">TV Channels</TabsTrigger>
          </TabsList>
          <TabsContent value="radio">
            <Card>
                <CardHeader>
                    <CardTitle>Top 10 Radio Stations</CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">Rank</TableHead>
                                <TableHead>Station</TableHead>
                                <TableHead className="text-right">Listeners</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {stations.slice(0, 10).map((station, index) => (
                                <TableRow key={station.id}>
                                    <TableCell className="font-bold text-lg">
                                        {index === 0 && <Medal className="inline-block w-6 h-6 text-yellow-500" />}
                                        {index === 1 && <Medal className="inline-block w-6 h-6 text-slate-400" />}
                                        {index === 2 && <Medal className="inline-block w-6 h-6 text-orange-400" />}
                                        {index > 2 && index + 1}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={station.imageUrl} data-ai-hint="radio station" />
                                                <AvatarFallback>{station.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{station.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right font-mono">{(12345 / (index + 1)).toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="podcasts">
             <Card>
                <CardHeader>
                    <CardTitle>Top 10 Podcasts</CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">Rank</TableHead>
                                <TableHead>Podcast</TableHead>
                                <TableHead className="text-right">Listeners</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {podcasts.slice(0, 10).map((podcast, index) => (
                                <TableRow key={podcast.id}>
                                    <TableCell className="font-bold text-lg">
                                        {index === 0 && <Medal className="inline-block w-6 h-6 text-yellow-500" />}
                                        {index === 1 && <Medal className="inline-block w-6 h-6 text-slate-400" />}
                                        {index === 2 && <Medal className="inline-block w-6 h-6 text-orange-400" />}
                                        {index > 2 && index + 1}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={podcast.imageUrl} data-ai-hint="podcast cover" />
                                                <AvatarFallback>{podcast.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <span className="font-medium">{podcast.name}</span>
                                                <p className="text-sm text-muted-foreground">by {podcast.author}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right font-mono">{(9876 / (index + 1)).toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tv">
             <Card>
                <CardHeader>
                    <CardTitle>Top 10 TV Channels</CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">Rank</TableHead>
                                <TableHead>Channel</TableHead>
                                <TableHead className="text-right">Viewers</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tvChannels.slice(0, 10).map((channel, index) => (
                                <TableRow key={channel.id}>
                                    <TableCell className="font-bold text-lg">
                                        {index === 0 && <Medal className="inline-block w-6 h-6 text-yellow-500" />}
                                        {index === 1 && <Medal className="inline-block w-6 h-6 text-slate-400" />}
                                        {index === 2 && <Medal className="inline-block w-6 h-6 text-orange-400" />}
                                        {index > 2 && index + 1}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={channel.imageUrl} data-ai-hint="tv broadcast news" />
                                                <AvatarFallback>{channel.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{channel.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right font-mono">{(5432 / (index + 1)).toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
