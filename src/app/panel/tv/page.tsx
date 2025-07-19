
'use client';

import { useState } from 'react';
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, FileEdit, Trash2, Eye, PowerOff, Play } from "lucide-react";
import Image from "next/image";
import { tvChannels as initialTvChannels } from "@/lib/data";
import type { TVChannel } from "@/lib/types";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function TVManagementPage() {
    const [tvChannels, setTvChannels] = useState(initialTvChannels.map(c => ({...c, status: 'Live' as 'Live' | 'Offline'})));
    const { toast } = useToast();

    const handleDeleteChannel = (id: string) => {
        const channelToDelete = tvChannels.find(c => c.id === id);
        setTvChannels(tvChannels.filter(c => c.id !== id));
        toast({ title: "TV Channel Deleted", description: `The channel "${channelToDelete?.name}" has been deleted.`, variant: 'destructive' });
    };

    const handleToggleStatus = (id: string) => {
        setTvChannels(
            tvChannels.map(c => c.id === id ? { ...c, status: c.status === 'Live' ? 'Offline' : 'Live' } : c)
        );
        const channel = tvChannels.find(c => c.id === id);
        if (channel) {
            toast({ title: `Channel Status Updated`, description: `"${channel.name}" is now ${channel.status === 'Live' ? 'Offline' : 'Live'}.` });
        }
    }

    return (
        <div className="flex-1 space-y-4 pt-6">
            <PageHeader
                title="TV Channel Management"
                description="Manage your live TV channels, stream sources, and settings."
            />
             <Card className="mt-6">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Your TV Channels</CardTitle>
                        <CardDescription>All your configured TV channels are listed here.</CardDescription>
                    </div>
                    <Button>Add New Channel</Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Channel</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tvChannels.map((channel) => (
                                <TableRow key={channel.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <Image src={channel.imageUrl} alt={channel.name} width={40} height={40} className="rounded-md object-cover" data-ai-hint="tv broadcast news"/>
                                            <p>{channel.name}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{channel.category}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={channel.status === 'Live' ? 'bg-green-500' : 'bg-red-500'}>
                                            {channel.status}
                                        </Badge>
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
                                                        Edit Info
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleToggleStatus(channel.id)}>
                                                        {channel.status === 'Live' ? <PowerOff className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                                                        {channel.status === 'Live' ? 'Take Offline' : 'Go Live'}
                                                    </DropdownMenuItem>
                                                     <DropdownMenuItem asChild>
                                                        <Link href={`/tv/${channel.id}`}>
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
                                                                This action cannot be undone. This will permanently delete the TV channel.
                                                            </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDeleteChannel(channel.id)}>
                                                                Delete Channel
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
