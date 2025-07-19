
'use client';

import { useState } from 'react';
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users, CheckCircle } from "lucide-react";
import Image from "next/image";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';

const contests = [
    {
        id: 'summer-song',
        name: "Summer Song Contest 2024",
        description: "Submit your original summer anthem for a chance to win exclusive prizes and be featured on top stations.",
        participants: "1,204",
        status: "Live",
        imageUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=400&fit=crop",
        dataAiHint: "music festival"
    },
    {
        id: 'circus-clown',
        name: "RadioVerse Circus: Summer Clown",
        description: "Show off your best clown look and win the exclusive Circus Clown Badge! 🤡🎪",
        participants: "345",
        status: "Live",
        imageUrl: "https://images.unsplash.com/photo-1518776829-9539824a2112?w=600&h=400&fit=crop",
        dataAiHint: "circus clown"
    }
];

export default function ContestsPage() {
    const { toast } = useToast();
    const [joined, setJoined] = useState<string[]>([]);

    const handleJoin = (contestId: string, contestName: string) => {
        setJoined([...joined, contestId]);
        toast({
            title: `¡Te has unido al concurso!`,
            description: `Mucha suerte en "${contestName}".`
        })
    };

    return (
        <div className="flex-1 space-y-4 pt-6">
            <PageHeader
                title="Contests & Events"
                description="Join our community events and win amazing prizes."
            />
            <div className="max-w-6xl mx-auto pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contests.map((contest) => (
                        <Card key={contest.name} className="flex flex-col">
                            <CardHeader className="p-0">
                                <Image src={contest.imageUrl} alt={contest.name} width={600} height={400} className="rounded-t-lg h-48 object-cover" data-ai-hint={contest.dataAiHint} />
                            </CardHeader>
                            <CardContent className="p-6 flex-grow">
                                <CardTitle className="font-headline text-2xl">{contest.name}</CardTitle>
                                <CardDescription className="mt-2">{contest.description}</CardDescription>
                            </CardContent>
                            <CardFooter className="p-6 pt-0 flex justify-between items-center">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Users className="w-4 h-4" />
                                    <span>{contest.participants} Participants</span>
                                </div>
                                 <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button disabled={joined.includes(contest.id)}>
                                            {joined.includes(contest.id) ? (
                                                <><CheckCircle className="w-4 h-4 mr-2"/> Joined</>
                                            ) : (
                                                <><Trophy className="w-4 h-4 mr-2"/> Join Now</>
                                            )}
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Join "{contest.name}"?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This will register you as a participant in the event. Make sure to read the full rules on the community forum.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleJoin(contest.id, contest.name)}>
                                                Confirm
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
