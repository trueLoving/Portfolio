/**
 * Main configuration file
 * This file provides configuration loading utilities
 * 
 * For client-side React components, use the useUserConfig() hook
 * For server-side Astro pages, use getUserConfig(locale) from './en/loader'
 * 
 * Configuration files are organized by language:
 * - src/config/en/: English configurations
 * - src/config/zh/: Chinese configurations
 */

import type { UserConfig } from '../types';
import { getUserConfig, defaultUserConfig } from './loader';

/**
 * Default user configuration (English)
 * Used for server-side rendering and initial load
 * 
 * @deprecated For React components, use useUserConfig() hook instead
 * For Astro pages, use getUserConfig(locale) from './loader'
 */
export const userConfig: UserConfig = defaultUserConfig;

// Re-export loader and hooks for convenience
export { getUserConfig, defaultUserConfig } from './loader';
export { useUserConfig } from './hooks';

// Export non-localized configs directly (from English directory as default)
export { social } from './en/social';
export { contact } from './en/contact';
export { projects } from './en/projects';
export { spotify, resume } from './en/apps';
