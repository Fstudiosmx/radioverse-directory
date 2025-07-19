
'use client';

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck, Info } from "lucide-react";

type StreamingSoftware = 'azuracast' | 'sonicpanel' | 'live365' | 'other' | '';

export default function AddStationPage() {
  const [software, setSoftware] = useState<StreamingSoftware>('');

  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="Add Your Station"
        description="Submit your radio station to be featured in our directory."
      />
      <Card className="max-w-4xl mx-auto mt-6">
        <CardHeader>
          <CardTitle>Station Details</CardTitle>
          <CardDescription>
            Fill out the form below. Our team will review your submission.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="station-name">Station Name</Label>
                <Input id="station-name" placeholder="e.g., Synthwave Dreams" required />
              </div>
               <div className="space-y-2">
                <Label>Streaming Software</Label>
                 <Select required onValueChange={(value: StreamingSoftware) => setSoftware(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select software..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="azuracast">Azuracast</SelectItem>
                    <SelectItem value="sonicpanel">SonicPanel</SelectItem>
                    <SelectItem value="live365">Live365</SelectItem>
                    <SelectItem value="other">Other (Shoutcast/Icecast)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {software === 'live365' && (
              <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                 <Alert variant="info">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Live365 Integration</AlertTitle>
                    <AlertDescription>
                        For Live365, please provide the full embed URLs for your player and recently played widgets.
                    </AlertDescription>
                </Alert>
                <div className="space-y-2">
                  <Label htmlFor="player-widget-url">Player Widget URL</Label>
                  <Input id="player-widget-url" placeholder="https://live365.com/embeds/v1/player/..." required />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="history-widget-url">Last Played Widget URL</Label>
                  <Input id="history-widget-url" placeholder="https://live365.com/embeds/v1/played/..." required />
                </div>
              </div>
            )}
            
            {(software === 'azuracast' || software === 'sonicpanel' || software === 'other') && (
                <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                     <Alert variant="info">
                        <Info className="h-4 w-4" />
                        <AlertTitle>Direct Stream Integration</AlertTitle>
                        <AlertDescription>
                            Provide your direct stream URL. RadioVerse will use its own player and widgets.
                        </AlertDescription>
                    </Alert>
                    <div className="space-y-2">
                      <Label htmlFor="stream-url">Stream URL</Label>
                      <Input id="stream-url" placeholder="https://your-stream-url.com/live" required />
                    </div>
                     <div className="space-y-2">
                        <Label>Streaming Protocol</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select protocol..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="icecast">Icecast</SelectItem>
                            <SelectItem value="shoutcast">Shoutcast</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="A short description of your station." required />
            </div>
            
             <div className="space-y-2">
                <Label htmlFor="image-url">Station Image URL</Label>
                <Input id="image-url" placeholder="https://your-image-url.com/image.png" required />
              </div>

            <Alert>
                <ShieldCheck className="h-4 w-4" />
                <AlertTitle>Review Process</AlertTitle>
                <AlertDescription>
                    Your submission will be reviewed by our team. You will receive a notification in your profile once it&apos;s approved or if any modifications are needed. By submitting, you agree to our DMCA policy.
                </AlertDescription>
            </Alert>
            <div className="flex justify-end">
              <Button type="submit">Submit for Review</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
