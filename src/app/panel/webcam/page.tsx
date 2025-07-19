
'use client';

import { useState, useRef, useEffect } from 'react';
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Webcam, Video, Mic, MicOff, VideoOff, Settings, Sparkles, Image as ImageIcon, Rocket } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

export default function WebcamStudioPage() {
    const { toast } = useToast();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isStreaming, setIsStreaming] = useState(false);
    
    useEffect(() => {
        const getCameraPermission = async () => {
          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
             toast({
              variant: 'destructive',
              title: 'Device Not Supported',
              description: 'Your browser does not support camera access.',
            });
            return;
          }
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setHasCameraPermission(true);

            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          } catch (error) {
            console.error('Error accessing camera:', error);
            setHasCameraPermission(false);
            toast({
              variant: 'destructive',
              title: 'Camera Access Denied',
              description: 'Please enable camera permissions in your browser settings to use this feature.',
            });
          }
        };

        getCameraPermission();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        }
    }, [toast]);
    
    const toggleMic = () => setIsMuted(!isMuted);
    const toggleVideo = () => {
        const stream = videoRef.current?.srcObject as MediaStream;
        if (stream) {
            stream.getVideoTracks().forEach(track => track.enabled = !isVideoOn);
        }
        setIsVideoOn(!isVideoOn);
    };

    const handleStreaming = () => {
        setIsStreaming(!isStreaming);
        toast({
            title: isStreaming ? "Stream Ended" : "Stream Started!",
            description: isStreaming ? "Your live broadcast has ended." : "You are now live on VerseLive!",
        });
    }

    return (
        <div className="flex-1 space-y-4 pt-6">
            <PageHeader
                title="Webcam Studio"
                description="Go live directly from your browser. No extra software needed."
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Live Preview</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
                                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted={isMuted} playsInline />
                                {!hasCameraPermission && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/50">
                                        <Webcam className="w-16 h-16 mb-4" />
                                        <p>Waiting for camera permission...</p>
                                    </div>
                                )}
                                {hasCameraPermission && (
                                     <div className="absolute top-2 right-2">
                                        {isStreaming && <Badge variant="destructive" className="animate-pulse">LIVE</Badge>}
                                     </div>
                                )}
                                 <div className="absolute bottom-4 w-full flex justify-center gap-4">
                                    <Button size="icon" variant="secondary" className="rounded-full h-12 w-12" onClick={toggleMic}>
                                        {isMuted ? <MicOff className="w-6 h-6"/> : <Mic className="w-6 h-6"/>}
                                    </Button>
                                    <Button size="icon" variant={isStreaming ? "destructive" : "default"} className="rounded-full h-14 w-14" onClick={handleStreaming}>
                                        <Rocket className="w-7 h-7"/>
                                    </Button>
                                    <Button size="icon" variant="secondary" className="rounded-full h-12 w-12" onClick={toggleVideo}>
                                        {isVideoOn ? <Video className="w-6 h-6"/> : <VideoOff className="w-6 h-6"/>}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-6">
                    <Card>
                         <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Sparkles className="text-primary"/> Decorations</CardTitle>
                            <CardDescription>Add overlays and backgrounds to your stream.</CardDescription>
                         </CardHeader>
                         <CardContent className="space-y-4">
                            <Button variant="outline" className="w-full justify-start gap-2"><ImageIcon className="w-4 h-4"/> Add Logo</Button>
                            <Button variant="outline" className="w-full justify-start gap-2"><ImageIcon className="w-4 h-4"/> Change Background</Button>
                         </CardContent>
                    </Card>
                    <Card>
                         <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Settings/> Settings</CardTitle>
                         </CardHeader>
                         <CardContent>
                             <p className="text-sm text-muted-foreground">Stream quality and output settings will appear here.</p>
                         </CardContent>
                    </Card>
                     <Alert variant="info">
                        <Webcam className="h-4 w-4" />
                        <AlertTitle>Browser-Based Streaming</AlertTitle>
                        <AlertDescription>
                          This tool uses your browser&apos;s capabilities to stream. Performance may vary based on your connection and computer.
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        </div>
    );
}
