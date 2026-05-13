import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'bn';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({ lang: 'bn', toggleLang: () => {} });

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  const toggleLang = () => setLang(prev => prev === 'en' ? 'bn' : 'en');

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
