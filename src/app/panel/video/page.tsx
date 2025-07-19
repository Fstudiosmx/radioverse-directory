
'use client';

import { useState } from 'react';
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, FileEdit, Trash2, Upload, Rss, Tv, Youtube, Signal } from "lucide-react";
import Image from "next/image";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// Demo data for uploaded videos
const uploadedVideos = [
    { id: 'vid1', title: 'My First VerseLive Stream!', date: '2024-08-15', views: 1204, duration: '01:23:45', status: 'Published' },
    { id: 'vid2', title: 'Q&A Session with the community', date: '2024-08-12', views: 876, duration: '00:45:12', status: 'Published' },
    { id: 'vid3', title: 'Testing new features (unlisted)', date: '2024-08-10', views: 42, duration: '00:10:30', status: 'Unlisted' },
];


export default function VideoStudioPage() {
    const [videos, setVideos] = useState(uploadedVideos);
    const { toast } = useToast();

    const handleDeleteVideo = (id: string) => {
        const videoToDelete = videos.find(v => v.id === id);
        setVideos(videos.filter(v => v.id !== id));
        toast({ title: "Video Deleted", description: `The video "${videoToDelete?.title}" has been deleted.`, variant: 'destructive' });
    };

    return (
        <div className="flex-1 space-y-4 pt-6">
            <PageHeader
                title="Video Studio"
                description="Manage your uploaded videos and configure your VerseLive stream."
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
                <div className="lg:col-span-2">
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Content Library</CardTitle>
                                <CardDescription>Your uploaded videos and past streams.</CardDescription>
                            </div>
                            <Button>
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Video
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Views</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>
                                            <span className="sr-only">Actions</span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {videos.map((video) => (
                                        <TableRow key={video.id}>
                                            <TableCell className="font-medium">{video.title}</TableCell>
                                            <TableCell>{video.date}</TableCell>
                                            <TableCell>{video.views.toLocaleString()}</TableCell>
                                            <TableCell><Badge variant={video.status === 'Published' ? 'default' : 'secondary'}>{video.status}</Badge></TableCell>
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
                                                            <DropdownMenuItem><FileEdit className="mr-2 h-4 w-4" />Edit Details</DropdownMenuItem>
                                                            <DropdownMenuItem><Youtube className="mr-2 h-4 w-4" />View on YouTube</DropdownMenuItem>
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-500">
                                                                        <Trash2 className="mr-2 h-4 w-4" />Delete
                                                                    </DropdownMenuItem>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                        <AlertDialogDescription>This will permanently delete the video.</AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction onClick={() => handleDeleteVideo(video.id)}>Delete</AlertDialogAction>
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
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                             <CardTitle className="flex items-center gap-3"><Signal className="text-red-500"/> VerseLive</CardTitle>
                             <CardDescription>Configure your live stream settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="stream-url">RTMP Server URL</Label>
                                <Input id="stream-url" readOnly value="rtmp://live.radioverse.app/live" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="stream-key">Stream Key</Label>
                                <Input id="stream-key" readOnly type="password" value="live_****************" />
                            </div>
                            <Button variant="secondary" className="w-full">Copy Stream Key</Button>
                        </CardContent>
                    </Card>
                     <Alert>
                        <Tv className="h-4 w-4" />
                        <AlertTitle>How to Go Live</AlertTitle>
                        <AlertDescription>
                          Use a streaming software like OBS or Streamlabs. Enter the RTMP Server URL and your unique Stream Key to start broadcasting.
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        </div>
    );
}
