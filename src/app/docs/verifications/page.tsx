import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCheck, Shield, Users, Award, Mic, Building, Star, Megaphone, Palette, Code, Video, LandPlot, Handshake, Heart, Gamepad2, BrainCircuit } from "lucide-react";

const verifications = [
    { name: 'Staff', color: 'text-pink-500', icon: <Shield className="w-10 h-10 shrink-0 text-pink-500" />, description: 'This badge is exclusively for official RadioVerse team members. It signifies administrative and moderation privileges.' },
    { name: 'Top Broadcaster', color: 'text-red-500', icon: <Award className="w-10 h-10 shrink-0 text-red-500" />, description: 'Awarded to top-tier broadcasters recognized for exceptional content quality, high listenership, and community engagement.' },
    { name: 'Community Leader', color: 'text-yellow-500', icon: <Users className="w-10 h-10 shrink-0 text-yellow-500" />, description: 'Recognizes users who have made significant positive contributions to the RadioVerse community through moderation, events, or support.' },
    { name: 'Official Creator', color: 'text-blue-500', icon: <CheckCheck className="w-10 h-10 shrink-0 text-blue-500" />, description: 'For verified content creators who own and manage official stations or podcasts on our platform, ensuring authenticity.' },
    { name: 'Musical Artist', color: 'text-purple-500', icon: <Mic className="w-10 h-10 shrink-0 text-purple-500" />, description: 'Verified musical artists, bands, or producers featured on the platform.' },
    { name: 'Verified Brand', color: 'text-gray-500', icon: <Building className="w-10 h-10 shrink-0 text-gray-500" />, description: 'Official account for a registered brand or company.' },
    { name: 'Sponsor', color: 'text-green-500', icon: <Star className="w-10 h-10 shrink-0 text-green-500" />, description: 'Official sponsors who support the RadioVerse community and events.' },
    { name: 'Press', color: 'text-cyan-500', icon: <Megaphone className="w-10 h-10 shrink-0 text-cyan-500" />, description: 'Verified members of the press and media outlets.' },
    { name: 'Theme Developer', color: 'text-teal-500', icon: <Palette className="w-10 h-10 shrink-0 text-teal-500" />, description: 'Creators who design and publish themes for Minisites.' },
    { name: 'Widget Developer', color: 'text-indigo-500', icon: <Code className="w-10 h-10 shrink-0 text-indigo-500" />, description: 'Developers who create custom widgets for the RadioVerse ecosystem.' },
    { name: 'Video Producer', color: 'text-red-400', icon: <Video className="w-10 h-10 shrink-0 text-red-400" />, description: 'Verified creators specializing in video content for VerseTV.' },
    { name: 'Venue', color: 'text-orange-500', icon: <LandPlot className="w-10 h-10 shrink-0 text-orange-500" />, description: 'Official accounts for venues like clubs, theaters, or concert halls.' },
    { name: 'Strategic Partner', color: 'text-lime-500', icon: <Handshake className="w-10 h-10 shrink-0 text-lime-500" />, description: 'Organizations that have a formal partnership with RadioVerse.' },
    { name: 'Charity Partner', color: 'text-rose-500', icon: <Heart className="w-10 h-10 shrink-0 text-rose-500" />, description: 'Verified non-profit or charitable organizations.' },
    { name: 'Game Developer', color: 'text-amber-500', icon: <Gamepad2 className="w-10 h-10 shrink-0 text-amber-500" />, description: 'Verified video game developers or publishing studios.' },
    { name: 'AI Innovator', color: 'text-sky-500', icon: <BrainCircuit className="w-10 h-10 shrink-0 text-sky-500" />, description: 'Pioneers using and developing AI tools within the RadioVerse platform.' },
];

export default function VerificationsPage() {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="Verification Guide"
        description="Understand the meaning of verification badges in RadioVerse."
      />
      <div className="max-w-4xl mx-auto pt-6 space-y-6">
         <Card>
            <CardHeader>
                <CardTitle>What Are Verifications?</CardTitle>
                <CardDescription>
                    Verification badges are a way to confirm authenticity and recognize significant contributions within the RadioVerse community. They are granted manually by our team and cannot be obtained through subscriptions or donations. The 'Founder' badge is exclusive and not listed here.
                </CardDescription>
            </CardHeader>
        </Card>
        
        {verifications.map(verification => (
             <Card key={verification.name}>
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    {verification.icon}
                    <div>
                        <CardTitle className="font-headline text-2xl">{verification.name}</CardTitle>
                        <CardDescription>{verification.description}</CardDescription>
                    </div>
                </CardHeader>
            </Card>
        ))}
      </div>
    </div>
  );
}
