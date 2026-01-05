/**
 * Professional experience configuration
 * Add your work experience here
 */

import type { Experience } from '../../types';

export const experience: readonly Experience[] = [
  {
    title: 'FrontEnd & Full-Stack Developer',
    company: 'Self-Employed',
    location: 'Remote',
    period: 'September 2024 - Present',
    description:
      'Leading cross-platform product development with focus on performance optimization and modern architecture. Successfully delivered multiple production applications serving thousands of users.',
    achievements: [
      'Built Stationuli - a P2P file transfer solution using Rust/Tauri, achieving <50ms latency and supporting 1GB+ file transfers',
      'Developed Pixuli - an AI-powered image analysis platform with WebAssembly optimization, reducing processing time by 60%',
      'Architected scalable full-stack solutions using NestJS, handling 10K+ concurrent users',
      'Implemented Web3 integrations for decentralized applications',
    ],
    technologies: [
      'React',
      'Next.js',
      'NestJS',
      'TypeScript',
      'Rust',
      'Tauri',
      'React Native',
      'Electron',
      'Web3',
      'AI/ML',
      'Docker',
      'AWS',
    ],
    images: [
      {
        url: '/experiences/Remote.webp',
        alt: 'Remote',
        description: 'Remote',
      },
    ],
  },
  {
    title: 'FrontEnd Developer',
    company: 'Hundsun Technologies Inc',
    location: 'Hangzhou, China',
    period: 'September 2021 - September 2024',
    description:
      'Developed and maintained enterprise-level financial software applications. Collaborated with cross-functional teams to deliver high-quality solutions for financial institutions.',
    achievements: [
      'Optimized Vue.js applications, improving initial load time by 40% through code splitting and lazy loading',
      'Led frontend architecture improvements, reducing bundle size by 30%',
      'Implemented responsive designs supporting 10+ device types',
      'Mentored junior developers and established coding standards',
    ],
    technologies: [
      'Vue.js',
      'TypeScript',
      'Node.js',
      'Webpack',
      'Docker',
      'AWS',
    ],
    images: [
      {
        url: '/experiences/Hundsun.webp',
        alt: 'Hundsun Technologies Inc',
        description: 'Hundsun Technologies Inc',
      },
    ],
  },
] as const;
