/**
 * Client-side script to update HTML lang attribute based on locale
 */
export function updateHtmlLang(locale: string) {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale === 'zh-CN' ? 'zh-CN' : 'en';
  }
}


