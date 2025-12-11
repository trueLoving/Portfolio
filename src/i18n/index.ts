import en from './locales/en.json';
import zhCN from './locales/zh-CN.json';
import type { Locale, Translations } from './types';

export const locales: Record<Locale, Translations> = {
  en,
  'zh-CN': zhCN,
};

export const defaultLocale: Locale = 'en';

export const getLocale = (): Locale => {
  if (typeof window === 'undefined') return defaultLocale;
  const stored = localStorage.getItem('locale') as Locale | null;
  if (stored && (stored === 'en' || stored === 'zh-CN')) {
    return stored;
  }
  return defaultLocale;
};

export const setLocale = (locale: Locale): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('locale', locale);
};

export const getTranslations = (locale: Locale): Translations => {
  return locales[locale] || locales[defaultLocale];
};


