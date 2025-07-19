
'use client';

import { useState } from 'react';
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Palette, Upload, Eye, Link as LinkIcon, AtSign, Heart, History, Calendar, Users, Award, CheckCheck, Medal, ListMusic, Music4, Rat, Coins, Newspaper, Rss, AlertTriangle, PlayCircle, Instagram, Facebook, Code, FileCode, Server, Gamepad2, CalendarDays, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { NowPlayingPopup } from '@/components/now-playing-popup';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

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

const themes = [
    { name: 'Default', bg: 'bg-background', text: 'text-foreground', primary: 'bg-primary' },
    { name: 'Sunset', bg: 'bg-orange-50', text: 'text-orange-900', primary: 'bg-orange-500' },
    { name: 'Ocean', bg: 'bg-blue-50', text: 'text-blue-900', primary: 'bg-blue-500' },
    { name: 'Forest', bg: 'bg-green-50', text: 'text-green-900', primary: 'bg-green-600' },
    { name: 'Noir', bg: 'bg-gray-900', text: 'text-gray-100', primary: 'bg-gray-500' },
];

const topListeners = [
    { rank: 1, name: 'ListenerOne', xp: 12500 },
    { rank: 2, name: 'SynthFan', xp: 11200 },
    { rank: 3, name: 'NightRider', xp: 9800 },
    { rank: 4, name: 'EchoWave', xp: 8500 },
    { rank: 5, name: 'GrooveMaster', xp: 7600 },
];

const predefinedBadges = [
    { id: 'founder', name: 'Founder', icon: <Heart className="w-8 h-8 text-red-500" /> },
    { id: 'loyal', name: 'Loyal', icon: <Calendar className="w-8 h-8 text-blue-500" /> },
];

const defaultTopMusic = [
    { title: "Gunship - Tech Noir", url: "https://www.youtube.com/embed/ONAnFBwR8ps" },
    { title: "Kavinsky - Nightcall", url: "https://www.youtube.com/embed/MV_3Dpw-BRY" },
    { title: "The Midnight - Sunset", url: "https://www.youtube.com/embed/g6F1yHh2u1g" },
].map(item => `${item.title} | ${item.url}`).join('\n');

const stationBlogPosts = [
    { id: 1, title: "Our First Live Event!", date: "2024-08-10", excerpt: "Thanks to everyone who joined our first live karaoke night..." },
    { id: 2, title: "New Segment: Throwback Thursdays", date: "2024-08-05", excerpt: "We're launching a new segment dedicated to the classics..." },
];

const games = [
    { id: 't-rex', name: 'T-Rex Run', src: 'https://raw.githack.com/wayou/t-rex-runner/master/index.html' },
    { id: 'pacman', name: 'Pac-Man', src: 'https://www.google.com/logos/2010/pacman10-i.html' },
];

const defaultSchedule = [
    "Lunes, 09:00 - 11:00, Morning Synthwave",
    "Martes, 18:00 - 20:00, Retro Future Beats",
    "Miércoles, 21:00 - 23:00, Night Drive",
    "Jueves, 18:00 - 20:00, 80s Pop Hits",
    "Viernes, 22:00 - 00:00, Cyberpunk Sessions",
].join('\n');

export default function MinisiteEditorPage() {
    const [theme, setTheme] = useState('Ocean');
    const [logo, setLogo] = useState('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop');
    const [banner, setBanner] = useState('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=200&fit=crop');
    const [welcomeMessage, setWelcomeMessage] = useState("Welcome to our station! Tune in for the best hits from the synthwave universe.");
    const [topMusic, setTopMusic] = useState(defaultTopMusic);
    const [selectedBadges, setSelectedBadges] = useState<string[]>(['founder', 'loyal']);
    const [customBadgeUrl, setCustomBadgeUrl] = useState('');
    const [enableNowPlayingPopup, setEnableNowPlayingPopup] = useState(true);
    const [stationSlug, setStationSlug] = useState('synthwave-dreams');
    const [enableCustomSite, setEnableCustomSite] = useState(false);
    const [enableGames, setEnableGames] = useState(true);
    const [broadcastTime, setBroadcastTime] = useState('Lunes a Viernes, 09:00 - 18:00 (GMT-6)');
    const [programSchedule, setProgramSchedule] = useState(defaultSchedule);
    const [contactEmail, setContactEmail] = useState('contact@synthwavedreams.com');


    const handleBadgeChange = (badgeId: string) => {
        setSelectedBadges(prev => 
            prev.includes(badgeId) ? prev.filter(id => id !== badgeId) : [...prev, badgeId]
        );
    }
    
    const displayedBadges = predefinedBadges.filter(b => selectedBadges.includes(b.id));
    if (customBadgeUrl) {
        displayedBadges.push({ id: 'custom', name: 'Custom', icon: <img src={customBadgeUrl} alt="Custom Badge" className="w-8 h-8"/> });
    }

    const selectedTheme = themes.find(t => t.name === theme) || themes[0];
    const topMusicList = topMusic.split('\n').filter(line => line.trim() !== '').map(line => {
        const [title, url] = line.split('|').map(s => s.trim());
        return { title, url };
    });

    const scheduleList = programSchedule.split('\n').filter(line => line.trim() !== '').map(line => {
        const [day, time, program] = line.split(',').map(s => s.trim());
        return { day, time, program };
    });

    return (
        <div className="flex-1 space-y-4 pt-6">
            <PageHeader
                title="Minisite Editor"
                description="Customize your station's public landing page. Available for Premium users."
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Palette className="w-5 h-5" /> Theme</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <RadioGroup value={theme} onValueChange={setTheme} disabled={enableCustomSite}>
                                <div className="grid grid-cols-3 gap-4">
                                    {themes.map(t => (
                                        <Label key={t.name} htmlFor={`theme-${t.name}`} className={cn("cursor-pointer", enableCustomSite && "opacity-50 cursor-not-allowed")}>
                                            <div className="p-2 border-2 data-[state=checked]:border-primary rounded-lg" data-state={theme === t.name ? 'checked' : 'unchecked'}>
                                                <div className={cn("w-full h-12 rounded-md flex items-end p-1", t.bg)}>
                                                    <div className={cn("w-1/2 h-3 rounded-sm", t.primary)}></div>
                                                </div>
                                                <p className="text-center text-sm mt-1">{t.name}</p>
                                            </div>
                                            <RadioGroupItem value={t.name} id={`theme-${t.name}`} className="sr-only" />
                                        </Label>
                                    ))}
                                </div>
                            </RadioGroup>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Upload className="w-5 h-5" /> Branding</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="logo-url">Logo URL</Label>
                                <Input id="logo-url" value={logo} onChange={e => setLogo(e.target.value)} placeholder="https://your-logo.png" disabled={enableCustomSite} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="banner-url">Banner URL</Label>
                                <Input id="banner-url" value={banner} onChange={e => setBanner(e.target.value)} placeholder="https://your-banner.png" disabled={enableCustomSite} />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><LinkIcon className="w-5 h-5" /> Minisite URL</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Label htmlFor="station-slug">URL Slug</Label>
                                <div className="flex items-center">
                                    <span className="text-sm text-muted-foreground p-2 bg-muted rounded-l-md border border-r-0">radioverse.app/minisite/</span>
                                    <Input id="station-slug" className="rounded-l-none" value={stationSlug} onChange={e => setStationSlug(e.target.value)} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Code className="w-5 h-5"/> Custom HTML Site <Badge variant="destructive">Golden</Badge></CardTitle>
                             <CardDescription>Host your own static HTML, CSS, and JS files for complete control.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                                <div>
                                    <Label htmlFor="custom-site-mode" className="font-semibold">Enable Custom Site Mode</Label>
                                    <p className="text-sm text-muted-foreground">This will replace the RadioVerse minisite with your own files.</p>
                                </div>
                                <Switch id="custom-site-mode" checked={enableCustomSite} onCheckedChange={setEnableCustomSite} />
                            </div>
                            {enableCustomSite && (
                                <div className="space-y-4">
                                    <Alert>
                                        <Server className="h-4 w-4" />
                                        <AlertTitle>File Management</AlertTitle>
                                        <AlertDescription>
                                            Upload your `index.html`, CSS, JS and image files here. (This is a visual demo, file upload is not functional).
                                        </AlertDescription>
                                    </Alert>
                                    <div className="space-y-2 p-4 border rounded-lg">
                                        <div className="flex items-center justify-between text-sm">
                                            <p className="flex items-center gap-2 font-mono"><FileCode className="w-4 h-4"/> index.html</p>
                                            <Button variant="ghost" size="sm">Delete</Button>
                                        </div>
                                         <div className="flex items-center justify-between text-sm">
                                            <p className="flex items-center gap-2 font-mono"><FileCode className="w-4 h-4"/> style.css</p>
                                            <Button variant="ghost" size="sm">Delete</Button>
                                        </div>
                                         <div className="flex items-center justify-between text-sm">
                                            <p className="flex items-center gap-2 font-mono"><FileCode className="w-4 h-4"/> script.js</p>
                                            <Button variant="ghost" size="sm">Delete</Button>
                                        </div>
                                    </div>
                                    <Button className="w-full">Upload Files</Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Content</CardTitle>
                        </CardHeader>
                        <CardContent className={cn("space-y-4", enableCustomSite && "opacity-50")}>
                            <div className="space-y-2">
                                <Label htmlFor="welcome-message">Welcome Message</Label>
                                <Textarea id="welcome-message" value={welcomeMessage} onChange={e => setWelcomeMessage(e.target.value)} placeholder="Tell your listeners about your station..." disabled={enableCustomSite} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="top-music">Top 10 Music (Title | YouTube/Vimeo URL)</Label>
                                 <Textarea id="top-music" value={topMusic} onChange={e => setTopMusic(e.target.value)} placeholder="One song per line..." rows={10} disabled={enableCustomSite} />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><CalendarDays className="w-5 h-5"/> Horario y Programación</CardTitle>
                        </CardHeader>
                        <CardContent className={cn("space-y-4", enableCustomSite && "opacity-50")}>
                            <div className="space-y-2">
                                <Label htmlFor="broadcast-time">Horario de Emisión</Label>
                                <Input id="broadcast-time" value={broadcastTime} onChange={e => setBroadcastTime(e.target.value)} placeholder="Ej: Lunes a Viernes, 09:00 - 18:00" disabled={enableCustomSite} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="program-schedule">Parrilla de Programación (Día, Hora, Programa)</Label>
                                <Textarea id="program-schedule" value={programSchedule} onChange={e => setProgramSchedule(e.target.value)} placeholder="Un programa por línea..." rows={5} disabled={enableCustomSite} />
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2'><Newspaper className="w-5 h-5"/> Blog Management <Badge variant="destructive">Beta</Badge></CardTitle>
                        </CardHeader>
                        <CardContent className={cn("space-y-4", enableCustomSite && "opacity-50")}>
                            <Button className='w-full' disabled={enableCustomSite}>Create New Post</Button>
                             <div className='space-y-2'>
                                {stationBlogPosts.map(post => (
                                    <div key={post.id} className='flex justify-between items-center p-2 border rounded-md'>
                                        <div>
                                            <p className='font-semibold text-sm'>{post.title}</p>
                                            <p className='text-xs text-muted-foreground'>{post.date}</p>
                                        </div>
                                        <Button variant="ghost" size="sm" disabled={enableCustomSite}>Edit</Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Award className="w-5 h-5" /> Station Badges</CardTitle>
                        </CardHeader>
                        <CardContent className={cn("space-y-4", enableCustomSite && "opacity-50")}>
                            <Label>Pre-defined Badges</Label>
                            <div className="flex gap-4">
                                {predefinedBadges.map(badge => (
                                    <div key={badge.id} className="flex items-center space-x-2">
                                        <Checkbox id={`badge-${badge.id}`} checked={selectedBadges.includes(badge.id)} onCheckedChange={() => handleBadgeChange(badge.id)} disabled={enableCustomSite} />
                                        <Label htmlFor={`badge-${badge.id}`} className="flex items-center gap-2 cursor-pointer">{badge.icon}{badge.name}</Label>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="custom-badge-url" className="flex items-center gap-2">Custom Badge URL <Badge variant="destructive">Golden</Badge></Label>
                                <Input id="custom-badge-url" value={customBadgeUrl} onChange={e => setCustomBadgeUrl(e.target.value)} placeholder="https://your-badge.png" disabled={enableCustomSite} />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Music4 className="w-5 h-5"/> Player Features</CardTitle>
                        </CardHeader>
                         <CardContent className={cn("space-y-4", enableCustomSite && "opacity-50")}>
                             <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <Label htmlFor="now-playing-popup" className="font-semibold flex items-center gap-2">"Now Playing" Popup & Song Details <Badge variant="destructive">Golden</Badge></Label>
                                    <p className="text-sm text-muted-foreground">Show a sticky player with song details and lyrics link.</p>
                                </div>
                                <Switch id="now-playing-popup" checked={enableNowPlayingPopup} onCheckedChange={setEnableNowPlayingPopup} disabled={enableCustomSite} />
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Gamepad2 className="w-5 h-5"/> Game Zone <Badge variant="destructive">Beta</Badge></CardTitle>
                        </CardHeader>
                         <CardContent className={cn("space-y-4", enableCustomSite && "opacity-50")}>
                             <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <Label htmlFor="game-zone" className="font-semibold">Enable Game Zone</Label>
                                    <p className="text-sm text-muted-foreground">Allow beta testers to play games on your minisite.</p>
                                </div>
                                <Switch id="game-zone" checked={enableGames} onCheckedChange={setEnableGames} disabled={enableCustomSite} />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><LinkIcon className="w-5 h-5" /> Contact & Socials</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="email">Contact Email</Label>
                                <Input id="email" type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} placeholder="contact@mystation.com" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="twitter">X (Twitter) URL</Label>
                                <Input id="twitter" placeholder="https://x.com/yourhandle" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="instagram">Instagram URL</Label>
                                <Input id="instagram" placeholder="https://instagram.com/yourhandle" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="facebook">Facebook URL</Label>
                                <Input id="facebook" placeholder="https://facebook.com/yourhandle" />
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Heart className="w-5 h-5" /> Monetization</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="donation-url">Donation Link (e.g., PayPal, Ko-fi)</Label>
                                <Input id="donation-url" placeholder="https://ko-fi.com/yourname" />
                            </div>
                        </CardContent>
                    </Card>
                    <div className="space-y-2">
                        <Button size="lg" className="w-full">
                            Save & Publish
                        </Button>
                         <Button size="lg" variant="outline" className="w-full" asChild>
                            <Link href={`/minisite/${stationSlug}`} target="_blank">
                                <Eye className="w-5 h-5 mr-2" />
                                Visit Minisite
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Live Preview</CardTitle>
                            <CardDescription>This is how your minisite will look to visitors.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="border rounded-lg overflow-hidden relative">
                                {enableCustomSite ? (
                                    <iframe src={`/custom-sites/${stationSlug}/index.html`} className="w-full h-[1200px]" title="Custom Site Preview"></iframe>
                                ) : (
                                <div className={cn("w-full h-full p-4 md:p-6 space-y-6", selectedTheme.bg, selectedTheme.text)}>
                                    <Alert variant="info" className='bg-yellow-100 dark:bg-yellow-900/50 border-yellow-500/50 text-yellow-800 dark:text-yellow-200'>
                                        <Rat className='w-5 h-5 text-current' />
                                        <AlertTitle>Contenido Beta</AlertTitle>
                                        <AlertDescription>Este Minisite está utilizando funciones Beta. Algunas características pueden cambiar o no funcionar como se espera.</AlertDescription>
                                    </Alert>
                                    <div className="h-52 bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${banner})` }} data-ai-hint="abstract background"></div>
                                    <div className="p-6 flex flex-col md:flex-row items-center gap-6 -mt-24">
                                        <img src={logo} alt="Station Logo" className="w-32 h-32 rounded-full border-4 border-white object-cover bg-white shrink-0 shadow-lg" data-ai-hint="logo design" />
                                        <div className="mt-16 text-center md:text-left">
                                            <h1 className="text-4xl font-bold font-headline flex items-center gap-3">
                                                Synthwave Dreams
                                                <Badge className="gap-1.5 bg-yellow-400 text-yellow-900 hover:bg-yellow-400">
                                                    <Coins className='w-4 h-4'/> Golden
                                                </Badge>
                                            </h1>
                                            <div className={cn("flex gap-4 justify-center md:justify-start mt-2", selectedTheme.text)}>
                                                <a href={`mailto:${contactEmail}`} title="Email"><AtSign className="w-5 h-5" /></a>
                                                <a href="#" title="Twitter / X"><XIcon /></a>
                                                <a href="#" title="Instagram"><Instagram className="w-5 h-5" /></a>
                                                <a href="#" title="Facebook"><Facebook className="w-5 h-5" /></a>
                                                <a href="#" title="Donate"><Heart className="w-5 h-5" /></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-6 pb-6 -mt-6">
                                        <Card className={cn(selectedTheme.bg, selectedTheme.text, "border-green-500/50 bg-green-500/10")}>
                                            <CardContent className="p-4 flex items-center gap-3">
                                                <CheckCheck className="w-6 h-6 text-green-500" />
                                                <div>
                                                    <p className="font-bold text-green-600">Estación Verificada</p>
                                                    <p className="text-sm">Activa desde: 01 de Enero, 2024</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <div className="px-6 pb-6 space-y-6">
                                        <p className="max-w-prose text-center text-lg">{welcomeMessage}</p>
                                         <Card className={cn(selectedTheme.bg, selectedTheme.text, "border-white/20")}>
                                            <CardContent className="p-4 flex items-center gap-4 justify-center text-center">
                                                <Clock className="w-6 h-6" />
                                                <div>
                                                    <p className="font-semibold">Horario de Emisión</p>
                                                    <p className="text-sm">{broadcastTime}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Card className={cn(selectedTheme.bg, selectedTheme.text, "border-white/20")}>
                                                <CardHeader>
                                                    <CardTitle className="flex items-center gap-2"><ListMusic className="w-5 h-5" /> Top 10 Música</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                     <div className="space-y-4">
                                                        {topMusicList.slice(0, 3).map((song, index) => (
                                                            <div key={index} className="flex gap-3">
                                                                <div className='w-24 h-16 rounded-md overflow-hidden relative'>
                                                                     <iframe
                                                                        className="w-full h-full"
                                                                        src={song.url?.includes('embed') ? song.url : song.url?.replace("watch?v=", "embed/")}
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
                                             <Card className={cn(selectedTheme.bg, selectedTheme.text, "border-white/20")}>
                                                <CardHeader>
                                                    <CardTitle className="flex items-center gap-2"><Newspaper className="w-5 h-5" /> Blog de la Estación</CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-3 text-sm">
                                                    {stationBlogPosts.map(post =>(
                                                        <div key={post.id}>
                                                            <p className='font-bold'>{post.title}</p>
                                                            <p className='text-xs opacity-80'>{post.excerpt}</p>
                                                        </div>
                                                    ))}
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
                                                        {scheduleList.map((item, index) => (
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
                                        {enableGames && (
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
                                        )}

                                        <Card className={cn(selectedTheme.bg, selectedTheme.text, "border-white/20")}>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5" /> Top 10 Oyentes <Badge variant="destructive">Beta</Badge></CardTitle>
                                            </CardHeader>
                                            <CardContent>
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
                                        
                                        <Card className={cn(selectedTheme.bg, selectedTheme.text, "border-white/20")}>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2"><Award className="w-5 h-5" /> Insignias de la Estación</CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex gap-4">
                                                {displayedBadges.map(badge => (
                                                    <div key={badge.id} className="text-center flex flex-col items-center">
                                                        <div className="p-3 rounded-full bg-muted mb-2">{badge.icon}</div>
                                                        <p className="text-xs font-semibold">{badge.name}</p>
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>

                                        <Button size="lg" className={cn("w-full h-14 text-lg", selectedTheme.primary, "text-white")}>Listen Live</Button>
                                    </div>
                                </div>
                                )}
                                {enableNowPlayingPopup && !enableCustomSite && (
                                    <div className="absolute bottom-4 left-4 right-4 z-10">
                                       <NowPlayingPopup />
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
