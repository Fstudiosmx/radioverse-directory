
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Beaker, CheckCheck, Gem, PartyPopper, Shield, Star, Award, Users, Trophy, Flame, Ticket, Palette, Badge as BadgeIcon, Clapperboard, Cake, GraduationCap, Brain, Radio, MicV2, RadioTower } from "lucide-react";
import { cn } from "@/lib/utils";

const communityBadges = [
    { name: 'Donator', icon: <Gem className="w-8 h-8 text-blue-500" />, description: 'Awarded to users who support RadioVerse through a donation.', unlocked: true },
    { name: 'Beta Tester', icon: <Beaker className="w-8 h-8 text-green-500" />, description: 'For users who help us test new features before they are released.', unlocked: true },
    { name: 'Launch Event 2024', icon: <PartyPopper className="w-8 h-8 text-yellow-500" />, description: 'Given to all users who joined during our 2024 launch event.', unlocked: true },
    { name: 'Enthusiast', icon: <Star className="w-8 h-8 text-yellow-400" />, description: 'Unlocked by listening to over 100 hours of content on RadioVerse.', unlocked: false },
    { name: 'RadioVerse Birthday', icon: <Cake className="w-8 h-8 text-pink-400" />, description: 'Awarded automatically on your birthday for 24 hours.', unlocked: false },
];

const creatorBadges = [
    { name: 'Staff', icon: <Shield className="w-8 h-8 text-pink-500" />, description: 'This badge is exclusively for official RadioVerse team members.', unlocked: true },
    { name: 'Top Broadcaster', icon: <Award className="w-8 h-8 text-red-500" />, description: 'Awarded to top-tier broadcasters with exceptional content quality and listenership.', unlocked: false },
    { name: 'Official Broadcaster', icon: <Clapperboard className="w-8 h-8 text-indigo-500" />, description: 'For users with the Broadcaster role, enabling video features.', unlocked: true },
    { name: 'Official Creator', icon: <CheckCheck className="w-8 h-8 text-blue-500" />, description: 'For verified content creators who own and manage stations or podcasts on our platform.', unlocked: true },
];

const eventBadges = [
    { name: 'Roulette Winner', icon: <Trophy className="w-8 h-8 text-yellow-500" />, description: 'Awarded for winning a top prize in the RuleVerse lucky roulette.', unlocked: false },
    { name: 'Summer Contest 2024', icon: <Flame className="w-8 h-8 text-orange-500" />, description: 'Participant in the great summer song contest of 2024.', unlocked: true },
    { name: 'Circus Event', icon: <Ticket className="w-8 h-8 text-indigo-500" />, description: 'Special badge for participating in the July Circus event in the VerseShop.', unlocked: false },
    { name: 'Clown Badge 🤡', icon: <span className="text-4xl">🤡</span>, description: 'Awarded to the best clowns in the Summer Circus event.', unlocked: false },
    { name: 'Pioneer', icon: <PartyPopper className="w-8 h-8 text-green-500" />, description: 'Users who joined during the first week of the launch.', unlocked: true },
    { name: 'Minisite Customizer', icon: <Palette className="w-8 h-8 text-teal-500" />, description: 'Awarded for customizing your minisite for the first time.', unlocked: false },
    { name: 'Badge Collector', icon: <BadgeIcon className="w-8 h-8 text-purple-500" />, description: 'Given to users who collect 10 or more badges.', unlocked: false },
];

const trainingBadges = [
    { name: 'Mega Búho', icon: <GraduationCap className="w-8 h-8 text-cyan-500" />, description: 'Awarded for exceptional wisdom in radio broadcasting.', unlocked: false },
    { name: 'Inteligente', icon: <Brain className="w-8 h-8 text-sky-500" />, description: 'Recognizes a quick and thorough understanding of streaming concepts.', unlocked: false },
    { name: 'Gran Radiólogo', icon: <Radio className="w-8 h-8 text-rose-500" />, description: 'For demonstrating mastery over radio panel management.', unlocked: false },
    { name: 'Súper Radio', icon: <RadioTower className="w-8 h-8 text-lime-500" />, description: 'Represents the ability to build and launch a successful station.', unlocked: false },
    { name: 'Embajador de la Radio', icon: <Award className="w-8 h-8 text-amber-500" />, description: 'For completing all training sessions and becoming a radio ambassador.', unlocked: false },
];

const BadgeCard = ({ badge }: { badge: { name: string, icon: React.ReactNode, description: string, unlocked: boolean }}) => {
    return (
        <Card className={cn(
            "text-center p-4 flex flex-col items-center transition-all duration-300",
            !badge.unlocked && "grayscale opacity-60 hover:opacity-100 hover:grayscale-0"
        )}>
            <div className={cn(
                "p-3 rounded-full mb-3",
                badge.unlocked ? "bg-muted" : "bg-muted/50"
            )}>
                {badge.icon}
            </div>
            <h3 className="font-semibold text-lg">{badge.name}</h3>
            <p className="text-sm text-muted-foreground mt-1 flex-grow">{badge.description}</p>
        </Card>
    );
};

export default function BadgesPage() {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="Our Badges"
        description="Collect badges, show off your achievements, and earn exclusive verifications."
      />
      <div className="max-w-6xl mx-auto pt-6 space-y-12">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Community Badges</CardTitle>
                <CardDescription>Participate in the community and earn these badges for your profile.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {communityBadges.map(badge => (
                    <BadgeCard key={badge.name} badge={badge} />
                ))}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Creator Badges & Verifications</CardTitle>
                <CardDescription>Special badges that grant a visible verification on your profile.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {creatorBadges.map(badge => (
                    <BadgeCard key={badge.name} badge={badge} />
                ))}
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Training Center Badges</CardTitle>
                <CardDescription>Exclusive badges for completing our broadcaster training courses.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                 {trainingBadges.map(badge => (
                    <BadgeCard key={badge.name} badge={badge} />
                ))}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Event Badges</CardTitle>
                <CardDescription>Win these exclusive badges by participating in contests or special VerseShop events.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {eventBadges.map(badge => (
                    <BadgeCard key={badge.name} badge={badge} />
                ))}
            </CardContent>
        </Card>
        
        <Alert variant="info">
            <Award className="h-4 w-4" />
            <AlertTitle>Exclusive Verifications</AlertTitle>
            <AlertDescription>
                Creator and Staff badges are exclusive and are granted manually by the RadioVerse team. They cannot be obtained through subscriptions or donations. They represent a partnership or significant contribution to the platform.
            </AlertDescription>
        </Alert>

      </div>
    </div>
  );
}
