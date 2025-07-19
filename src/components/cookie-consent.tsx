'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Cookie } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'radioverse_cookie_consent';

export function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 md:p-8">
      <Card className="max-w-md">
        <CardHeader className='flex-row items-start gap-4 space-y-0'>
            <div className="bg-primary/10 p-3 rounded-full">
                <Cookie className="h-6 w-6 text-primary" />
            </div>
            <div>
                <CardTitle>We Use Cookies</CardTitle>
                <CardDescription>
                    Our website uses cookies to ensure you get the best experience. By continuing to use our site, you agree to our cookie policy.
                </CardDescription>
            </div>
        </CardHeader>
        <CardContent>
            <Button className="w-full" onClick={handleAccept}>Accept & Continue</Button>
        </CardContent>
      </Card>
    </div>
  );
}
