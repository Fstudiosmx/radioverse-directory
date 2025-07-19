
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import Image from "next/image";
import { Slider } from './ui/slider';
import { tracks } from '@/lib/data';

interface StreamAudioPlayerProps {
    streamUrl: string;
}

export function StreamAudioPlayer({ streamUrl }: StreamAudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    
    const currentTrack = tracks[0]; // Use a default track for display

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.error("Error playing audio:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (value: number[]) => {
        const newVolume = value[0];
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
        if (newVolume > 0 && isMuted) {
            setIsMuted(false);
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <Card className="bg-gradient-to-br from-slate-900 to-black text-white overflow-hidden">
            <audio ref={audioRef} src={streamUrl} preload="none" />
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
                            </div>
                             <div className="flex items-center gap-2 mt-2">
                                <Button size="icon" variant="ghost" className="text-white hover:bg-white/10 h-6 w-6" onClick={toggleMute}>
                                    {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-muted-foreground" /> : <Volume2 className="w-4 h-4 text-muted-foreground" />}
                                </Button>
                                <Slider 
                                    defaultValue={[volume]} 
                                    max={1} 
                                    step={0.01}
                                    onValueChange={handleVolumeChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
