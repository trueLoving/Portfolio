import type { Locale } from './types';

function isLocale(v: string | null | undefined): v is Locale {
  return v === 'en' || v === 'zh-CN';
}

function parseCookieLocale(cookieHeader: string | null): Locale | undefined {
  if (!cookieHeader) return undefined;
  // naive cookie parse: "a=b; locale=zh-CN; c=d"
  const m = cookieHeader.match(/(?:^|;\s*)locale=([^;]+)/);
  const raw = m?.[1]?.trim();
  if (!raw) return undefined;
  const decoded = decodeURIComponent(raw);
  return isLocale(decoded) ? decoded : undefined;
}

function parseQueryLocale(url: URL): Locale | undefined {
  const raw = url.searchParams.get('lang') || url.searchParams.get('locale');
  return isLocale(raw) ? raw : undefined;
}

function parseAcceptLanguage(header: string | null): Locale | undefined {
  if (!header) return undefined;
  // Example: "zh-CN,zh;q=0.9,en;q=0.8"
  const lower = header.toLowerCase();
  if (lower.includes('zh')) return 'zh-CN';
  if (lower.includes('en')) return 'en';
  return undefined;
}

/**
 * Infer locale on the server.
 * Priority: query (?lang=) → cookie (locale=) → Accept-Language header → fallback ('en')
 */
export function inferServerLocale(params: {
  request: Request;
  url: URL;
  fallback?: Locale;
}): Locale {
  const fallback = params.fallback ?? 'en';
  return (
    parseQueryLocale(params.url) ||
    parseCookieLocale(params.request.headers.get('cookie')) ||
    parseAcceptLanguage(params.request.headers.get('accept-language')) ||
    fallback
  );
}
