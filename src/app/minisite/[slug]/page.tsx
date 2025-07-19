

'use client';

import { notFound } from "next/navigation";
import { stations, users as allUsers, stationAudios, blogPosts as allBlogPosts } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AtSign, Link as LinkIcon, Heart, CheckCheck, ListMusic, Newspaper, Users, Medal, Award, PlayCircle, Coins, Rat, Mic, Volume2, Facebook, Instagram, Code, Gamepad2, ThumbsUp, MessageCircle, Clock, CalendarDays } from "lucide-react";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { NowPlayingPopup } from "@/components/now-playing-popup";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

const XIcon = () => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="currentColor"
    >
      <title>X</title>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.479l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );

const topListeners = [
    { rank: 1, name: 'ListenerOne', xp: 12500 },
    { rank: 2, name: 'SynthFan', xp: 11200 },
    { rank: 3, name: 'NightRider', xp: 9800 },
    { rank: 4, name: 'EchoWave', xp: 8500 },
    { rank: 5, name: 'GrooveMaster', xp: 7600 },
];

const stationBadges = [
    { id: 'founder', name: 'Founder', icon: <Heart className="w-8 h-8 text-red-500" /> },
    { id: 'loyal', name: 'Loyal', icon: <Users className="w-8 h-8 text-blue-500" /> },
];

const topMusic = [
    { title: "Gunship - Tech Noir", url: "https://www.youtube.com/embed/ONAnFBwR8ps" },
    { title: "Kavinsky - Nightcall", url: "https://www.youtube.com/embed/MV_3Dpw-BRY" },
    { title: "The Midnight - Sunset", url: "https://www.youtube.com/embed/g6F1yHh2u1g" },
];

const stationBlogPosts = allBlogPosts.slice(0,2);
const games = [
    { id: 't-rex', name: 'T-Rex Run', src: 'https://raw.githack.com/wayou/t-rex-runner/master/index.html' },
    { id: 'pacman', name: 'Pac-Man', src: 'https://www.google.com/logos/2010/pacman10-i.html' },
];

const schedule = [
    { day: "Lunes", time: "09:00 - 11:00", program: "Morning Synthwave" },
    { day: "Martes", time: "18:00 - 20:00", program: "Retro Future Beats" },
    { day: "Miércoles", time: "21:00 - 23:00", program: "Night Drive" },
    { day: "Jueves", time: "18:00 - 20:00", program: "80s Pop Hits" },
    { day: "Viernes", time: "22:00 - 00:00", program: "Cyberpunk Sessions" },
];

export default function MinisitePage({ params }: { params: { slug: string } }) {
  const station = stations.find(s => s.slug === params.slug);
  const [useCustomSite] = useState(params.slug === 'synthwave-dreams-custom');


  if (!station) {
    notFound();
  }

  if (useCustomSite) {
      return (
          <div className="w-full h-screen">
              <iframe src={`/custom-sites/${station.slug}/index.html`} className="w-full h-full border-0" title={`${station.name} Custom Site`}></iframe>
          </div>
      );
  }

  const banner = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=300&fit=crop';
  const logo = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop';
  const welcomeMessage = "Welcome to our station! Tune in for the best hits from the synthwave universe.";
  const enableNowPlayingPopup = true;

  const approvedAudios = stationAudios.filter(a => a.status === 'approved' && a.stationId === station.id);

  return (
    <div className="relative">
        <div className={cn("w-full p-4 md:p-6 space-y-6 bg-blue-50 text-blue-900")}>
            <Alert variant="info" className='bg-yellow-100 dark:bg-yellow-900/50 border-yellow-500/50 text-yellow-800 dark:text-yellow-200'>
                <Rat className='w-5 h-5 text-current' />
                <AlertTitle>Contenido Beta</AlertTitle>
                <AlertDescription>Este Minisite está utilizando funciones Beta. Algunas características pueden cambiar o no funcionar como se espera.</AlertDescription>
            </Alert>
            <div className="h-40 md:h-52 bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${banner})` }} data-ai-hint="abstract background"></div>
            <div className="p-6 flex flex-col md:flex-row items-center gap-6 -mt-20 md:-mt-24">
                <Image src={logo} alt="Station Logo" className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white object-cover bg-white shrink-0 shadow-lg" data-ai-hint="logo design" width={128} height={128} />
                <div className="mt-4 md:mt-16 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold font-headline flex items-center gap-3">
                        {station.name}
                        <Badge className="gap-1.5 bg-yellow-400 text-yellow-900 hover:bg-yellow-400">
                            <Coins className='w-4 h-4'/> Golden
                        </Badge>
                    </h1>
                    <div className="flex gap-4 justify-center md:justify-start mt-2 text-current hover:text-blue-700">
                        <a href="mailto:contact@synthwavedreams.com" title="Email"><AtSign className="w-5 h-5" /></a>
                        <a href="#" title="Twitter / X"><XIcon /></a>
                        <a href="#" title="Instagram"><Instagram className="w-5 h-5" /></a>
                        <a href="#" title="Facebook"><Facebook className="w-5 h-5" /></a>
                        <a href="#" title="Donate"><Heart className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>
            <div className="px-6 pb-6 -mt-6">
                <Card className={cn("border-green-500/50 bg-green-500/10")}>
                    <CardContent className="p-4 flex items-center gap-3">
                        <CheckCheck className="w-6 h-6 text-green-500" />
                        <div>
                            <p className="font-bold text-green-700">Estación Verificada</p>
                            <p className="text-sm">Activa desde: 01 de Enero, 2024</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="px-6 pb-6 space-y-6">
                <p className="max-w-prose text-center text-lg mx-auto">{welcomeMessage}</p>
                 <Card>
                    <CardContent className="p-4 flex items-center gap-4 justify-center text-center">
                        <Clock className="w-6 h-6" />
                        <div>
                            <p className="font-semibold">Horario de Emisión</p>
                            <p className="text-sm">Lunes a Viernes, 09:00 - 18:00 (GMT-6)</p>
                        </div>
                    </CardContent>
                </Card>
                
                 <Button size="lg" className={cn("w-full h-14 text-lg bg-red-500 hover:bg-red-600 text-white shadow-lg")}>
                    <Mic className="w-6 h-6 mr-3" />
                    Envía tu Audio al Aire
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><ListMusic className="w-5 h-5" /> Top 10 Música</CardTitle>
                        </CardHeader>
                        <CardContent>
                                <div className="space-y-4">
                                {topMusic.map((song, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row gap-3">
                                        <div className='w-full sm:w-24 h-24 sm:h-16 rounded-md overflow-hidden relative shrink-0'>
                                                <iframe
                                                className="w-full h-full"
                                                src={song.url}
                                                title={song.title}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                        <p className="text-sm font-medium flex-1">{song.title}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Volume2 className="w-5 h-5" /> Muro de Audios</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            {approvedAudios.length > 0 ? approvedAudios.map(audio => {
                                const user = allUsers.find(u => u.id === audio.userId);
                                return (
                                    <div key={audio.id} className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
                                        <Avatar className="w-8 h-8">
                                            <AvatarImage src={user?.avatarUrl} />
                                            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <p className='font-bold'>{audio.title}</p>
                                            <p className='text-xs opacity-80'>by {user?.name}</p>
                                        </div>
                                        <Button size="icon" variant="ghost">
                                            <PlayCircle className="w-6 h-6" />
                                        </Button>
                                    </div>
                                )
                            }) : (
                                <p className="text-muted-foreground text-center py-4">¡Sé el primero en enviar un audio!</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><CalendarDays className="w-5 h-5" /> Parrilla de Programación</CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Día</TableHead>
                                    <TableHead>Hora</TableHead>
                                    <TableHead>Programa</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {schedule.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{item.day}</TableCell>
                                        <TableCell>{item.time}</TableCell>
                                        <TableCell>{item.program}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Newspaper className="w-5 h-5" /> Blog de la Estación</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {stationBlogPosts.map(post => (
                            <Link href={`/blog/${post.id}`} key={post.id} className="flex gap-4 group">
                                <Image src={post.imageUrl} alt={post.title} width={150} height={100} className="rounded-md object-cover w-1/3 aspect-video group-hover:scale-105 transition-transform" />
                                <div className="w-2/3">
                                    <h3 className="font-semibold group-hover:text-primary">{post.title}</h3>
                                    <p className="text-xs text-muted-foreground">{post.date}</p>
                                    <p className="text-sm text-muted-foreground mt-1 hidden sm:block">{post.excerpt}</p>
                                </div>
                            </Link>
                        ))}
                    </CardContent>
                </Card>
                
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Gamepad2 className="w-5 h-5" /> Zona de Juegos <Badge variant="destructive">Beta</Badge></CardTitle>
                        <CardDescription>Juega a algunos clásicos sin salir de la página. (Solo para Beta Testers)</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           {games.map(game => (
                               <div key={game.id} className="aspect-video border rounded-lg overflow-hidden">
                                   <iframe src={game.src} className="w-full h-full" title={game.name}></iframe>
                               </div>
                           ))}
                       </div>
                    </CardContent>
                </Card>
                
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><MessageCircle className="w-5 h-5"/> Encuestas de la Comunidad <Badge variant="destructive">Beta</Badge></CardTitle>
                    </CardHeader>
                    <CardContent>
                       <div className="p-4 border rounded-lg space-y-3">
                           <p className="font-semibold">¿Qué género te gustaría escuchar más?</p>
                           <div className="space-y-2">
                               <Button variant="outline" className="w-full justify-between">Synth Pop <span className="text-muted-foreground">35%</span></Button>
                               <Button variant="outline" className="w-full justify-between">Dark Synth <span className="text-muted-foreground">45%</span></Button>
                               <Button variant="outline" className="w-full justify-between">Chillwave <span className="text-muted-foreground">20%</span></Button>
                           </div>
                           <div className="flex justify-between items-center text-sm mt-2 text-muted-foreground">
                               <span>128 Votos</span>
                               <Button variant="link" size="sm" className="p-0 h-auto">Votar</Button>
                           </div>
                       </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5" /> Top 10 Oyentes <Badge variant="destructive">Beta</Badge></CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Rank</TableHead>
                                    <TableHead>Usuario</TableHead>
                                    <TableHead className="text-right">XP</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                            {topListeners.map((listener) => (
                                <TableRow key={listener.rank}>
                                    <TableCell className="font-bold">
                                        {listener.rank === 1 && <Medal className="inline-block w-5 h-5 text-yellow-500" />}
                                        {listener.rank === 2 && <Medal className="inline-block w-5 h-5 text-slate-400" />}
                                        {listener.rank === 3 && <Medal className="inline-block w-5 h-5 text-orange-400" />}
                                        {listener.rank > 3 && listener.rank}
                                    </TableCell>
                                    <TableCell>{listener.name}</TableCell>
                                    <TableCell className="text-right font-mono">{listener.xp.toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Award className="w-5 h-5" /> Insignias de la Estación</CardTitle>
                    </CardHeader>
                    <CardContent className="flex gap-4">
                        {stationBadges.map(badge => (
                            <div key={badge.id} className="text-center flex flex-col items-center">
                                <div className="p-3 rounded-full bg-muted mb-2">{badge.icon}</div>
                                <p className="text-xs font-semibold">{badge.name}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Button size="lg" className={cn("w-full h-14 text-lg bg-blue-500 hover:bg-blue-600 text-white")}>
                    <PlayCircle className="w-6 h-6 mr-2" />
                    Listen Live
                </Button>
            </div>
        </div>
        {enableNowPlayingPopup && (
            <div className="sticky bottom-4 left-4 right-4 z-10 w-[calc(100%-2rem)] mx-auto">
                <NowPlayingPopup />
            </div>
        )}
    </div>
  );
}
