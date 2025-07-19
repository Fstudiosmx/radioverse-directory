

import { PageHeader } from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { users } from "@/lib/data";
import { Beaker, Gem, MessageSquare, Heart, Rss, PartyPopper, Shield, Award, Flame, Ticket, Palette, Clapperboard, Star, Cake, Crown } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const allBadges = [
  { name: 'Donator', icon: <Gem className="w-8 h-8 text-blue-500" />, description: 'Supported RadioVerse with a donation.' },
  { name: 'Beta Tester', icon: <Beaker className="w-8 h-8 text-green-500" />, description: 'Helped test new features.' },
  { name: 'Launch Event 2024', icon: <PartyPopper className="w-8 h-8 text-yellow-500" />, description: 'Joined during the 2024 launch event.' },
  { name: 'Staff', icon: <Shield className="w-8 h-8 text-pink-500" />, description: 'Official RadioVerse team member.' },
  { name: 'Top Broadcaster', icon: <Award className="w-8 h-8 text-red-500" />, description: 'Top-tier broadcaster.' },
  { name: 'Official Creator', icon: <Clapperboard className="w-8 h-8 text-indigo-500" />, description: 'Verified content creator.' },
  { name: 'Summer Contest 2024', icon: <Flame className="w-8 h-8 text-orange-500" />, description: 'Participant in the summer song contest.' },
  { name: 'Circus Event', icon: <Ticket className="w-8 h-8 text-indigo-500" />, description: 'Participant in the Circus roulette event.' },
  { name: 'Clown Badge 🤡', icon: <span className="text-4xl">🤡</span>, description: 'Best clown in the Summer Circus event.' },
  { name: 'Minisite Customizer', icon: <Palette className="w-8 h-8 text-teal-500" />, description: 'Customized their minisite.' },
];

const decorations = [
    { name: 'Summer', imageUrl: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&h=300&fit=crop' },
    { name: 'Winter', imageUrl: 'https://images.unsplash.com/photo-1487737332258-958b15d05051?w=1200&h=300&fit=crop' },
    { name: 'Starry Night', imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=300&fit=crop' },
    { name: 'Awards Night', imageUrl: 'https://images.unsplash.com/photo-1527622943499-e2051314e258?w=1200&h=300&fit=crop' },
]

export default function ProfilePage({ params }: { params: { username: string } }) {
  const user = users.find(u => u.id === params.username);
  const isFounder = params.username === 'MefEfEeSBLYsWQeTHIczhJlrNG6';

  const profileName = user ? user.name : "RadioVerse User";
  const profileAvatar = user ? user.avatarUrl : "https://placehold.co/128x128.png";
  const profileUsername = user ? user.id : params.username;

  const userBadges = isFounder ? allBadges : [
    { name: 'Donator', icon: <Gem className="w-8 h-8 text-blue-500" />, description: 'Supported RadioVerse with a donation.' },
    { name: 'Beta Tester', icon: <Beaker className="w-8 h-8 text-green-500" />, description: 'Helped test new features.' },
    { name: 'Launch Event 2024', icon: <PartyPopper className="w-8 h-8 text-yellow-500" />, description: 'Joined during the 2024 launch event.' },
  ];
  
  const bannerImage = isFounder ? 'https://images.unsplash.com/photo-1518776829-9539824a2112?w=1200&h=300&fit=crop' : 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=300&fit=crop'

  return (
    <div className="flex-1 space-y-4 pt-6">
      <div className="max-w-6xl mx-auto">
        <Card className="overflow-hidden">
          <div className="relative h-48 bg-muted">
            <Image src={bannerImage} alt="Profile banner" fill style={{objectFit:"cover"}} data-ai-hint={isFounder ? "circus tent" : "abstract background mountain"}/>
             {isFounder && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end justify-center pb-2">
                    <Badge variant="destructive" className="text-lg animate-pulse">Circus Event Decoration</Badge>
                </div>
            )}
          </div>
          <div className="flex items-end p-6 -mt-16 space-x-6">
            <Avatar className="w-32 h-32 border-4 border-background">
              <AvatarImage src={profileAvatar} alt={profileName} data-ai-hint="person" />
              <AvatarFallback>{profileName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
                {profileName}
                {user?.role === 'Staff' && !isFounder && (
                  <TooltipProvider>
                      <Tooltip>
                          <TooltipTrigger asChild>
                              <Link href="/docs/verifications">
                                  <Shield className="w-7 h-7 text-pink-500" />
                              </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                              <p>Staff Member</p>
                          </TooltipContent>
                      </Tooltip>
                  </TooltipProvider>
                )}
                 {isFounder && (
                  <TooltipProvider>
                      <Tooltip>
                          <TooltipTrigger asChild>
                              <span className="cursor-pointer">
                                  <Crown className="w-7 h-7 text-yellow-500" />
                              </span>
                          </TooltipTrigger>
                          <TooltipContent>
                              <p>Founder</p>
                          </TooltipContent>
                      </Tooltip>
                  </TooltipProvider>
                )}
              </h1>
              <p className="text-muted-foreground">@{profileUsername.substring(0, 12)}...</p>
               {isFounder && (
                  <div className="mt-2 text-yellow-500 font-bold flex items-center gap-2">
                    <Star className="w-5 h-5"/> Level 100 (Max)
                  </div>
              )}
            </div>
            <Button>Follow</Button>
            <Button variant="outline">Message</Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About {profileName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{user?.role === 'Staff' ? 'RadioVerse Staff & Community Manager. Passionate about music discovery and helping creators grow.' : 'A passionate listener exploring the RadioVerse.'}</p>
              </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Badges</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4">
                    {userBadges.map(badge => (
                        <div key={badge.name} className="flex flex-col items-center text-center">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="p-3 bg-muted rounded-full mb-2">
                                            {badge.icon}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{badge.description}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                             <p className="text-xs font-semibold">{badge.name}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
            {isFounder && (
                 <Card>
                    <CardHeader>
                        <CardTitle>Unlocked Decorations</CardTitle>
                        <CardDescription>Exclusive banner decorations.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-2">
                        {decorations.map(deco => (
                            <div key={deco.name} className="relative aspect-video rounded-md overflow-hidden border-2 border-primary">
                                <Image src={deco.imageUrl} alt={deco.name} fill style={{objectFit:'cover'}}/>
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <p className="text-white font-bold text-sm drop-shadow-md">{deco.name}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}
          </div>
          <div className="md:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                        <MessageSquare className="w-5 h-5 text-muted-foreground mt-1" />
                        <div>
                            <p>Commented on <Link href="/blog/1" className="font-semibold hover:underline">Welcome to the New RadioVerse!</Link></p>
                            <p className="text-sm text-muted-foreground">&quot;So excited for what&apos;s to come!&quot;</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3">
                        <Heart className="w-5 h-5 text-muted-foreground mt-1" />
                        <div>
                            <p>Favorited station <Link href="/station/1" className="font-semibold hover:underline">Synthwave Dreams</Link></p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3">
                        <Rss className="w-5 h-5 text-muted-foreground mt-1" />
                        <div>
                            <p>Submitted a new station <span className="font-semibold">Cosmic Grooves</span> for review</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
