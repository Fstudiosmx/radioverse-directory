
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { translateText } from '@/ai/flows/translate-flow';
import { toast } from 'sonner';

type Language = 'en' | 'es' | 'pt';

interface TranslationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (englishText: string, spanishText?: string) => string;
  loading: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

const translationCache = new Map<string, string>();

export const TranslationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (lang === 'en') {
      // No need to translate if it's already English
      setTranslations({});
    }
  }, []);

  const t = useCallback(
    (englishText: string, spanishText?: string) => {
      if (language === 'en') {
        return englishText;
      }
      if (language === 'es' && spanishText) {
        return spanishText;
      }
      return translations[englishText] || englishText; // Fallback to English
    },
    [language, translations]
  );
  
  const collectAndTranslateTexts = useCallback(async () => {
    if (language === 'en') return;

    // A bit of a hack: find all elements with a translatable attribute
    // In a real app, you might have a more structured way of managing strings
    const elements = document.querySelectorAll('[data-translate]');
    const textsToTranslate: string[] = [];

    elements.forEach(el => {
        const text = el.textContent;
        if (text && !translationCache.has(`${language}:${text}`) && !translations[text]) {
            textsToTranslate.push(text);
        }
    });

    if (textsToTranslate.length === 0) return;

    setLoading(true);
    toast.info(`Translating to ${language}...`);

    try {
        const promises = textsToTranslate.map(text => 
            translateText({ text, targetLanguage: language })
        );
        const results = await Promise.all(promises);
        
        const newTranslations: Record<string, string> = {};
        results.forEach((result, index) => {
            const originalText = textsToTranslate[index];
            const translatedText = result.translation;
            newTranslations[originalText] = translatedText;
            translationCache.set(`${language}:${originalText}`, translatedText);
        });

        setTranslations(prev => ({...prev, ...newTranslations}));
        toast.success("Translation complete!");
    } catch (error) {
        console.error("Translation error:", error);
        toast.error("Failed to translate content.");
    } finally {
        setLoading(false);
    }
  }, [language, translations]);
  
  // This is a simplified effect to trigger translations.
  // In a more complex app, this would be tied into the router or specific component mounts.
  useEffect(() => {
    // We add a data-translate attribute to the body to find texts
    document.body.setAttribute('data-translate', 'true');
    collectAndTranslateTexts();
  }, [language, collectAndTranslateTexts]);


  const value = useMemo(
    () => ({ language, setLanguage, t, loading }),
    [language, setLanguage, t, loading]
  );

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
