/**
 * React hook for getting localized user configuration
 */

import { useMemo } from 'react';
import { useI18n } from '../i18n/context';
import { getUserConfig } from './loader';
import type { UserConfig } from '../types';

/**
 * Hook to get user configuration based on current locale
 * @returns UserConfig object with content in the current language
 */
export function useUserConfig(): UserConfig {
  const { locale } = useI18n();

  return useMemo(() => {
    return getUserConfig(locale);
  }, [locale]);
}
