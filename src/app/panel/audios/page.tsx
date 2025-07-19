
'use client';

import { useState } from 'react';
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { stationAudios, users } from "@/lib/data";
import type { StationAudio } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Play, Check, X, MoreHorizontal } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from 'date-fns';

export default function AudioManagementPage() {
    const [audios, setAudios] = useState<StationAudio[]>(stationAudios);
    const { toast } = useToast();

    const handleUpdateStatus = (id: number, status: 'approved' | 'rejected') => {
        setAudios(audios.map(a => a.id === id ? { ...a, status } : a));
        toast({
            title: `Audio ${status === 'approved' ? 'Approved' : 'Rejected'}`,
            description: `The audio submission has been successfully ${status}.`,
        });
    };
    
    const getStatusVariant = (status: StationAudio['status']) => {
        switch (status) {
            case 'approved': return 'default';
            case 'rejected': return 'destructive';
            case 'pending': return 'secondary';
            default: return 'outline';
        }
    }

    return (
        <div className="flex-1 space-y-4 pt-6">
            <PageHeader
                title="Audio Submissions"
                description="Review and manage audio messages sent by your listeners."
            />
            <Card>
                <CardHeader>
                    <CardTitle>Moderation Queue</CardTitle>
                    <CardDescription>{audios.filter(a => a.status === 'pending').length} audios pending review.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Listener</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Submitted</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {audios.map(audio => {
                                const user = users.find(u => u.id === audio.userId);
                                return (
                                    <TableRow key={audio.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage src={user?.avatarUrl} alt={user?.name} data-ai-hint="person" />
                                                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium">{user?.name || 'Unknown User'}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{audio.title}</TableCell>
                                        <TableCell>{formatDistanceToNow(new Date(audio.submittedAt), { addSuffix: true })}</TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusVariant(audio.status)} className="capitalize">{audio.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button size="icon" variant="ghost">
                                                    <Play className="w-4 h-4"/>
                                                </Button>
                                                {audio.status === 'pending' && (
                                                    <>
                                                        <Button size="icon" variant="ghost" className="text-green-500 hover:text-green-600" onClick={() => handleUpdateStatus(audio.id, 'approved')}>
                                                            <Check className="w-4 h-4"/>
                                                        </Button>
                                                        <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600" onClick={() => handleUpdateStatus(audio.id, 'rejected')}>
                                                            <X className="w-4 h-4"/>
                                                        </Button>
                                                    </>
                                                )}
                                                {audio.status !== 'pending' && (
                                                     <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                                <span className="sr-only">Toggle menu</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem onSelect={() => handleUpdateStatus(audio.id, 'pending')}>Mark as Pending</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
