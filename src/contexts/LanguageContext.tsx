import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Language = 'en' | 'bn';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({ lang: 'en', toggleLang: () => {} });

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  const toggleLang = () => setLang(prev => prev === 'en' ? 'bn' : 'en');

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
