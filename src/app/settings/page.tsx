
'use client';

import { useState } from 'react';
import { PageHeader } from "@/components/page-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Beaker, Gem, UserCircle } from "lucide-react";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { DatePicker } from '@/components/ui/date-picker';
import { useAuth } from '@/contexts/auth-context';


const betaFeatures = [
    { id: "ai-dj", name: "AI-Powered DJ (August 2024)", description: "Let an AI DJ create personalized playlists on any station." },
    { id: "station-visualizer", name: "Audio Visualizers (August 2024)", description: "Experience dynamic, real-time visuals synced to your music." },
    { id: "advanced-search", name: "Semantic Search", description: "Find stations by mood, lyrics, or vibes instead of just genre." },
    { id: "minisite-domain", name: "Minisite Custom Domain", description: "Connect your own domain name to your minisite." },
    { id: "minisite-analytics", name: "Minisite Advanced Analytics", description: "Get detailed insights into your minisite visitor traffic." },
    { id: "minisite-theming", name: "Minisite Theme Editor", description: "Unlock advanced CSS options to fully customize your minisite's appearance." },
    { id: "minisite-podcast-tv", name: "Minisites for Podcast & TV", description: "Create dedicated minisites for your podcast series and TV channels." }
]

export default function SettingsPage() {
    const { toast } = useToast();
    const { user } = useAuth();
    const [name, setName] = useState(user?.displayName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [birthday, setBirthday] = useState<Date | undefined>(new Date('1990-01-01'));

    const handleSaveChanges = () => {
        toast({
            title: "Settings Saved!",
            description: "Your profile information has been updated.",
        });
    }

    return (
        <div className="flex-1 space-y-4 pt-6">
            <PageHeader
                title="Settings"
                description="Manage your account settings and feature preferences."
            />
            <div className="max-w-4xl mx-auto pt-6 space-y-8">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><UserCircle className="text-primary"/> Profile Information</CardTitle>
                        <CardDescription>
                            Update your personal details here.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Display Name</Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" value={email} disabled placeholder="your.email@example.com" />
                            <p className="text-xs text-muted-foreground">Email address cannot be changed.</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="birthday">Birthday</Label>
                            <DatePicker date={birthday} setDate={setBirthday} />
                        </div>
                        <Button onClick={handleSaveChanges}>Save Changes</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Beaker className="text-green-500" /> Beta Features</CardTitle>
                        <CardDescription>
                            As a valued donator, you get early access to upcoming features. Toggle them on to try them out!
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {betaFeatures.map(feature => (
                            <div key={feature.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <Label htmlFor={feature.id} className="font-semibold">{feature.name}</Label>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                </div>
                                <Switch id={feature.id} />
                            </div>
                        ))}
                    </CardContent>
                </Card>

                 <Alert variant="info">
                    <Gem className="h-4 w-4" />
                    <AlertTitle>Exclusive Donator Perk</AlertTitle>
                    <AlertDescription>
                        Access to beta features is one of the many benefits of supporting RadioVerse. Your contributions help us build the future of radio.
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    )
}
