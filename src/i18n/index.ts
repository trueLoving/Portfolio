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
  
  // 优先使用服务端传入的语言，确保服务端和客户端初始语言一致
  const serverLocale = (window as any).__SERVER_LOCALE__;
  if (serverLocale && (serverLocale === 'en' || serverLocale === 'zh-CN')) {
    // 如果服务端语言与 localStorage 不一致，同步到 localStorage
    const stored = localStorage.getItem('locale') as Locale | null;
    if (stored !== serverLocale) {
      localStorage.setItem('locale', serverLocale);
    }
    return serverLocale;
  }
  
  // 如果没有服务端语言，从 localStorage 读取
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


