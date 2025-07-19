'use client';

import { useEffect, useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { ShieldAlert } from 'lucide-react';

const ADBLOCK_ALERT_KEY = 'radioverse_adblock_alert_shown';

export function AdblockAlert() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // This is a simulation. A real implementation would require a script to detect adblockers.
    // For this demo, we'll show it once per session if not previously dismissed.
    const hasBeenShown = sessionStorage.getItem(ADBLOCK_ALERT_KEY);
    if (!hasBeenShown) {
        // Delay showing the pop-up to not be too intrusive on page load
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem(ADBLOCK_ALERT_KEY, 'true');
      }, 5000); // Show after 5 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
            <div className="mx-auto bg-destructive/10 rounded-full p-3 w-fit mb-4">
                <ShieldAlert className="w-8 h-8 text-destructive" />
            </div>
          <AlertDialogTitle className='text-center'>Please Support RadioVerse</AlertDialogTitle>
          <AlertDialogDescription className='text-center'>
            Our website relies on ad revenue to stay online and free for everyone. To help us continue our mission, please consider disabling your Adblocker for our site. Your support makes a huge difference!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => setIsOpen(false)}>I Understand</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
