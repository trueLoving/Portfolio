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
    description:
      '领导跨平台产品开发，专注于性能优化和现代架构。成功交付多个生产级应用，服务数千用户。',
    achievements: [
      '构建 Stationuli - 使用 Rust/Tauri 的 P2P 文件传输解决方案，实现 <50ms 延迟，支持 1GB+ 文件传输',
      '开发 Pixuli - 基于 AI 的图像分析平台，通过 WebAssembly 优化，处理时间减少 60%',
      '使用 NestJS 架构可扩展的全栈解决方案，处理 10K+ 并发用户',
      '为去中心化应用实现 Web3 集成',
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
    description:
      '开发和维护企业级金融软件应用。与跨职能团队合作，为金融机构提供高质量解决方案。',
    achievements: [
      '优化 Vue.js 应用，通过代码分割和懒加载将初始加载时间提升 40%',
      '领导前端架构改进，将打包体积减少 30%',
      '实现响应式设计，支持 10+ 种设备类型',
      '指导初级开发人员并建立编码规范',
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
        alt: '恒生电子股份有限公司',
        description: '恒生电子股份有限公司',
      },
    ],
  },
] as const;
