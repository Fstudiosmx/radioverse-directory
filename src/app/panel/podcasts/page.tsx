
'use client';

import { useState } from 'react';
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, FileEdit, Trash2, Eye, Rss } from "lucide-react";
import Image from "next/image";
import { podcasts as initialPodcasts } from "@/lib/data";
import type { Podcast } from "@/lib/types";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function PodcastManagementPage() {
    const [podcasts, setPodcasts] = useState<Podcast[]>(initialPodcasts);
    const { toast } = useToast();

    const handleDeletePodcast = (id: string) => {
        const podcastToDelete = podcasts.find(p => p.id === id);
        setPodcasts(podcasts.filter(p => p.id !== id));
        toast({ title: "Podcast Deleted", description: `The podcast "${podcastToDelete?.name}" has been deleted.`, variant: 'destructive' });
    };

    return (
        <div className="flex-1 space-y-4 pt-6">
            <PageHeader
                title="Podcast Management"
                description="Manage your podcast series, episodes, and settings."
            />
             <Card className="mt-6">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Your Podcasts</CardTitle>
                        <CardDescription>All your published podcast series are listed here.</CardDescription>
                    </div>
                    <Button>Create New Podcast</Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Podcast</TableHead>
                                <TableHead>Episodes</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {podcasts.map((podcast) => (
                                <TableRow key={podcast.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <Image src={podcast.imageUrl} alt={podcast.name} width={40} height={40} className="rounded-md object-cover" data-ai-hint="podcast cover"/>
                                            <div>
                                                <p>{podcast.name}</p>
                                                <p className="text-sm text-muted-foreground">by {podcast.author}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                     <TableCell>
                                        <Badge variant="secondary" className="gap-1.5">
                                            <Rss className="w-4 h-4" />
                                            {podcast.episodes.length} Episodes
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge>Published</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-end gap-2">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>
                                                        <FileEdit className="mr-2 h-4 w-4" />
                                                        Edit Details
                                                    </DropdownMenuItem>
                                                     <DropdownMenuItem asChild>
                                                        <Link href={`/podcast/${podcast.id}`}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Public Page
                                                        </Link>
                                                    </DropdownMenuItem>
                                                      <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-500">
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete the podcast and all its episodes.
                                                            </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDeletePodcast(podcast.id)}>
                                                                Delete Podcast
                                                            </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
