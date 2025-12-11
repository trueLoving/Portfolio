/**
 * Professional experience configuration
 * Add your work experience here
 */

import type { Experience } from '../types';

export const experience: readonly Experience[] = [
    {
        title: 'FrontEnd & Full-Stack Developer',
        company: 'Self-Employed',
        location: 'Remote',
        period: 'September 2024 - Present',
        description: 'Focus on Cross-Platform Development, developed and maintained web applications using React, Next.js, NestJS, Tailwind CSS, TypeScript, Rust, Tauri, React Native, Electron, Web3, AI, Docker.',
        technologies: [
            'React',
            'Next.js',
            'NestJS',
            'Tailwind CSS',
            'TypeScript',
            'Rust',
            'Tauri',
            'React Native',
            'Electron',
            'Web3',
            'AI',
            'Docker',
        ],
        images: [
            {
                url: '/Remote.jpg',
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
        description: 'Foucs on FrontEnd Engineering, developed and maintained web applications using Vue.js, TypeScript. Collaborated with cross-functional teams to deliver high-quality software solutions.',
        technologies: [
            'Vue.js', 
            'TypeScript', 
            'Node.js', 
            'Webpack', 
            'JavaScript', 
            'HTML', 
            'CSS',
            'Docker',
            'AWS',
        ],
        images: [
            {
                url: '/Hundsun-Logo.png',
                alt: 'Hundsun Technologies Inc',
                description: 'Hundsun Technologies Inc',
            },
        ],
    },
] as const;
