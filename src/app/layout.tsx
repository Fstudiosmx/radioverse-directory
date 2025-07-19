import type { Metadata } from 'next';
import './globals.css';
import { Toaster as SonnerToaster } from 'sonner';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from '@/components/theme-provider';
import { Footer } from '@/components/footer';
import { CookieConsent } from '@/components/cookie-consent';
import { AdblockAlert } from '@/components/adblock-alert';
import { CampaignAlert } from '@/components/campaign-alert';
import { ptSans, poppins } from './fonts';
import { cn } from '@/lib/utils';
import { TranslationProvider } from '@/contexts/translation-context';
import { AuthProvider } from '@/contexts/auth-context';
import { AppLayout } from '@/components/app-layout';

export const metadata: Metadata = {
  title: 'RadioVerse',
  description: 'Your universe of radio stations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "font-body antialiased",
        ptSans.variable,
        poppins.variable
      )}>
       <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <TranslationProvider>
              <AppLayout>{children}</AppLayout>
              <Toaster />
              <SonnerToaster />
              <CookieConsent />
              <AdblockAlert />
              <CampaignAlert />
            </TranslationProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
