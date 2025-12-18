import React, { createContext, useContext, useState, useEffect } from 'react';
import { getLocale, setLocale, getTranslations } from './index';
import type { Locale, Translations } from './types';
import { updateHtmlLang } from './updateLang';

interface I18nContextType {
  locale: Locale;
  translations: Translations;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: React.ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => getLocale());
  const [translations, setTranslations] = useState<Translations>(() => getTranslations(locale));

  useEffect(() => {
    setTranslations(getTranslations(locale));
    updateHtmlLang(locale);
  }, [locale]);

  const handleSetLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setLocale(newLocale);
    setTranslations(getTranslations(newLocale));
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if not found
      }
    }
    return typeof value === 'string' ? value : key;
  };

  return (
    <I18nContext.Provider
      value={{
        locale,
        translations,
        setLocale: handleSetLocale,
        t,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

