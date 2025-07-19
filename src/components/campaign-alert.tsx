'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Megaphone, X } from 'lucide-react';

const CAMPAIGN_ALERT_KEY = 'radioverse_campaign_alert_dismissed';

export function CampaignAlert() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasBeenDismissed = sessionStorage.getItem(CAMPAIGN_ALERT_KEY);
    if (!hasBeenDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 10000); // Show after 10 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem(CAMPAIGN_ALERT_KEY, 'true');
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 z-50 p-4 md:p-8">
      <Card className="max-w-md relative">
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={handleDismiss}>
            <X className="h-4 w-4" />
        </Button>
        <CardHeader className='flex-row items-start gap-4 space-y-0 pr-10'>
            <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
                <Megaphone className="h-6 w-6 text-blue-500" />
            </div>
            <div>
                <CardTitle>Active Campaigns</CardTitle>
                <CardDescription>
                   We support the "No Más Bullying" project by estacionkusmedios.org, aiming to prevent bullying.
                </CardDescription>
            </div>
        </CardHeader>
        <CardContent>
            <Button asChild className="w-full">
                <a href="https://nomasbullying.net" target="_blank" rel="noopener noreferrer">
                    Visit Project
                </a>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
