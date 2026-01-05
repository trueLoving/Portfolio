/**
 * SEO and theme configuration
 */

import type { SEOConfig, ThemeConfig } from '../../types';

export const seo: SEOConfig = {
  title: 'trueLoving - FrontEnd & Full-Stack Developer | React • Vue.js • Rust • Web3 • AI',
  description:
    'Experienced FrontEnd & Full-Stack Developer with 3+ years building scalable web applications. Expert in React, Vue.js, NestJS, Electron, React Native, Tauri, Rust, Web3, and AI. Specialized in cross-platform development and performance optimization.',
  keywords: [
    'FrontEnd Developer',
    'Full-Stack Developer',
    'React Developer',
    'Vue.js Developer',
    'Rust Developer',
    'Web3 Developer',
    'Cross-Platform Developer',
    'Electron Developer',
    'Tauri Developer',
    'React Native Developer',
    'NestJS Developer',
    'TypeScript Developer',
    'Performance Optimization',
    'WebAssembly',
    'Hangzhou Developer',
    'China Developer',
  ],
  openGraph: {
    type: 'website',
    image: '/og-image.png',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const theme: ThemeConfig = {
  primaryColor: '#1ED760', // Spotify green
  secondaryColor: '#1d1d1f',
  accentColor: '#007AFF',
};
