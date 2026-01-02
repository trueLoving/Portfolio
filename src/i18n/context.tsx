import React, { createContext, useContext, useEffect, useState } from 'react';
import { defaultLocale, getLocale, getTranslations, setLocale } from './index';
import type { Locale, Translations } from './types';
import { updateHtmlLang } from './updateLang';

interface I18nContextType {
  locale: Locale;
  translations: Translations;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  isReady: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: React.ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  // 服务器端和客户端都初始化为默认语言，确保初始渲染一致
  // 客户端挂载后再更新为用户的实际语言偏好
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [translations, setTranslations] = useState<Translations>(() =>
    getTranslations(defaultLocale)
  );
  const [isClient, setIsClient] = useState(false);

  // 客户端挂载后设置用户的实际语言，避免 hydration mismatch
  useEffect(() => {
    setIsClient(true);
    const userLocale = getLocale();
    if (userLocale !== defaultLocale) {
      setLocaleState(userLocale);
      setTranslations(getTranslations(userLocale));
      updateHtmlLang(userLocale);
    }
  }, []);

  // 当语言改变时更新翻译和 HTML lang 属性
  useEffect(() => {
    if (isClient) {
      setTranslations(getTranslations(locale));
      updateHtmlLang(locale);
    }
  }, [locale, isClient]);

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
        isReady: isClient,
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
