import { createContext, useContext, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'bn';

interface LanguageContextType {
  lang: Language;
}

const LanguageContext = createContext<LanguageContextType>({ lang: 'en' });

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = 'en';
  }, []);

  return (
    <LanguageContext.Provider value={{ lang: 'en' }}>
      {children}
    </LanguageContext.Provider>
  );
}
