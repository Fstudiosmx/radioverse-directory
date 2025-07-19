
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, Volume2, VolumeX, Maximize2 } from "lucide-react";
import Image from "next/image";
import { Slider } from './ui/slider';
import { tracks } from '@/lib/data';
import type { Track } from '@/lib/types';

interface StreamPlayerProps {
    streamUrl: string;
}

export function StreamPlayer({ streamUrl }: StreamPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [volume, setVolume] = useState(0.8);
    
    const currentTrack = tracks[currentTrackIndex];

    // Simulate track changing every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
        }, 30000); // 30 seconds
        return () => clearInterval(interval);
    }, []);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        // Here you would control the actual audio element
    };
    
    const handleVolumeChange = (value: number[]) => {
        setVolume(value[0]);
         // Here you would set the volume on the actual audio element
    }

    return (
        <Card className="bg-gradient-to-br from-slate-900 to-black text-white overflow-hidden">
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <Image 
                        src={currentTrack.albumArtUrl} 
                        alt={currentTrack.album} 
                        width={200} 
                        height={200}
                        className="rounded-lg aspect-square object-cover w-full md:w-48 md:h-48 shadow-lg"
                        data-ai-hint="album cover"
                    />
                    <div className="flex flex-col justify-between flex-grow">
                        <div>
                            <p className="text-sm text-muted-foreground">Now Playing on Synthwave Dreams</p>
                            <h2 className="text-3xl font-bold font-headline mt-1">{currentTrack.title}</h2>
                            <p className="text-xl text-muted-foreground">{currentTrack.artist}</p>
                        </div>
                        
                        <div className="mt-4 md:mt-0">
                            {/* Hidden actual audio element */}
                            <audio src={streamUrl} autoPlay={isPlaying} volume={volume} hidden />
                            
                            <div className="flex items-center gap-4">
                               <Button size="icon" variant="ghost" className="text-white hover:bg-white/10" onClick={handlePlayPause}>
                                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                                </Button>

                                <div className="flex-grow space-y-1">
                                    <p className="text-xs text-center">Livestream</p>
                                    <div className="w-full h-1.5 bg-white/20 rounded-full">
                                        <div className="h-full bg-primary rounded-full" style={{width: `100%`}}></div>
                                    </div>
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>Live</span>
                                        <span>--:--</span>
                                    </div>
                                </div>
                                <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
                                    <SkipForward className="w-6 h-6" />
                                </Button>
                            </div>
                             <div className="flex items-center gap-2 mt-2">
                                <VolumeX className="w-4 h-4 text-muted-foreground" />
                                <Slider 
                                    defaultValue={[volume]} 
                                    max={1} 
                                    step={0.01}
                                    onValueChange={handleVolumeChange}
                                />
                                <Volume2 className="w-4 h-4 text-muted-foreground" />
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
