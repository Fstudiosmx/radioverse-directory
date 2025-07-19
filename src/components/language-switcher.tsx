
'use client';

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/contexts/translation-context";
import { Languages } from "lucide-react";

const languages = [
    { code: 'en', name: 'English', flag: 'US' },
    { code: 'es', name: 'Español', flag: 'ES' },
    { code: 'pt', name: 'Português', flag: 'BR' },
] as const;

type FlagCountry = typeof languages[number]['flag'];

const FlagComponent = ({ country }: { country: FlagCountry }) => {
    switch (country) {
        case 'US':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 3 2">
                    <path fill="#B22234" d="M0 0h3v2H0z"/>
                    <path fill="#fff" d="M0 .2h3v.2H0zm0 .4h3v.2H0zm0 .4h3v.2H0zm0 .4h3v.2H0zm0 .4h3v.2H0z"/>
                    <path fill="#3C3B6E" d="M0 0h1.2v1H0z"/>
                    <path fill="#fff" d="M.05.05L.1.25l.15-.2h.1L.2.25l.15.2h-.1L.2.35l-.05.1-.05-.1-.15.1h-.1l.15-.2-.15-.2z m.4 0L.5.25l.15-.2h.1L.6.25l.15.2h-.1L.6.35l-.05.1-.05-.1-.15.1h-.1l.15-.2-.15-.2z m.4 0L.9.25l.15-.2h.1L1 .25l.15.2h-.1l-.1-.1-.05.1-.05-.1-.15.1h-.1l.15-.2-.15-.2z M.15.45l.1-.2.15.2h-.1L.2.35l-.05.1L.1.35l.05-.1h-.1L.2.45l-.15-.2h.1z m.4 0l.1-.2.15.2h-.1L.6.35l-.05.1L.5.35l.05-.1h-.1L.6.45l-.15-.2h.1z m.4 0l.1-.2.15.2h-.1l-.1-.1-.05.1-.05-.1L.8.35l.05-.1h-.1l.1.2-.15.2h.1z M.05.85l.1-.2.15.2h-.1L.2.75l-.05.1-.05-.1-.15.1h-.1l.15-.2-.15-.2h.1z m.4 0l.1-.2.15.2h-.1L.6.75l-.05.1-.05-.1-.15.1h-.1l.15-.2-.15-.2h.1z m.4 0l.1-.2.15.2h-.1L1 .75l-.05.1-.05-.1-.15.1h-.1l.15-.2-.15-.2h.1z"/>
                </svg>
            );
        case 'ES':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 3 2">
                    <path fill="#C60B1E" d="M0 0h3v2H0z"/>
                    <path fill="#FFC400" d="M0 .5h3v1H0z"/>
                </svg>
            );
        case 'BR':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 14">
                    <path fill="#009B3A" d="M0 0h20v14H0z"/>
                    <path fill="#FFCC29" d="M10 1.5L1.5 7l8.5 5.5 8.5-5.5z"/>
                    <circle cx="10" cy="7" r="3.5" fill="#002776"/>
                </svg>
            );
    }
};

export function LanguageSwitcher() {
  const { setLanguage, t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="group-data-[collapsible=icon]:hidden">
          <Languages className="h-5 w-5" />
          <span className="sr-only">{t('Change language', 'Cambiar idioma')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map(lang => (
            <DropdownMenuItem key={lang.code} onSelect={() => setLanguage(lang.code)}>
                <FlagComponent country={lang.flag} />
                <span className="ml-2">{lang.name}</span>
            </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
