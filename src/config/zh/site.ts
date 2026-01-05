/**
 * SEO and theme configuration (Chinese)
 */

import type { SEOConfig, ThemeConfig } from '../../types';

export const seo: SEOConfig = {
  title: 'trueLoving - 前端 & 全栈开发工程师 | React • Vue.js • Rust • Web3 • AI',
  description:
    '经验丰富的前端和全栈开发工程师，拥有 3+ 年构建可扩展 Web 应用的经验。精通 React、Vue.js、NestJS、Electron、React Native、Tauri、Rust、Web3 和 AI。专注于跨平台开发和性能优化。',
  keywords: [
    '前端开发工程师',
    '全栈开发工程师',
    'React 开发工程师',
    'Vue.js 开发工程师',
    'Rust 开发工程师',
    'Web3 开发工程师',
    '跨平台开发工程师',
    'Electron 开发工程师',
    'Tauri 开发工程师',
    'React Native 开发工程师',
    'NestJS 开发工程师',
    'TypeScript 开发工程师',
    '性能优化',
    'WebAssembly',
    '杭州开发工程师',
    '中国开发工程师',
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
