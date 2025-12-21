/**
 * Professional experience configuration (Chinese)
 * Add your work experience here
 */

import type { Experience } from '../../types';

export const experience: readonly Experience[] = [
    {
        title: '前端 & 全栈开发工程师',
        company: '自由职业',
        location: '远程',
        period: '2024年9月 - 至今',
        description: '专注于跨平台开发，使用 React、Next.js、NestJS、Tailwind CSS、TypeScript、Rust、Tauri、React Native、Electron、Web3、AI、Docker 开发和维护 Web 应用程序。',
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
                url: '/experiences/Remote.webp',
                alt: '远程',
                description: '远程工作',
            },
        ],
    },
    {
        title: '前端开发工程师',
        company: '恒生电子股份有限公司',
        location: '中国，杭州',
        period: '2021年9月 - 2024年9月',
        description: '专注于前端工程，使用 Vue.js、TypeScript 开发和维护 Web 应用程序。与跨职能团队合作，提供高质量的软件解决方案。',
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
                url: '/experiences/Hundsun.webp',
                alt: '恒生电子股份有限公司',
                description: '恒生电子股份有限公司',
            },
        ],
    },
] as const;


