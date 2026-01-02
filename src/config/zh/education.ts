/**
 * Education and courses configuration (Chinese)
 * Add your educational background and courses here
 */

import type { Education, Course } from '../../types';

export const education: readonly Education[] = [
  {
    degree: '计算机科学学士',
    major: '计算机科学',
    institution: '杭州师范大学',
    location: '中国，杭州',
    year: '2017-2021',
    description:
      '相关课程：数据结构、数据结构和算法、操作系统、计算机网络、软件工程、生物医学信息学、人工智能、机器学习、深度学习、计算机视觉、自然语言处理、计算机网络、操作系统、计算机体系结构、计算机组成、计算机安全、计算机图形学、计算机系统等',
    images: [
      {
        url: 'https://www.hznu.edu.cn/upload/resources/image/2021/08/10/7657092.jpg',
        alt: '杭州师范大学',
        description: '杭州师范大学校园',
      },
    ],
  },
] as const;

export const courses: readonly Course[] = [
  {
    title: '物联网',
    description: '物联网课程',
    institution: 'ITI',
    location: '埃及，开罗',
    year: '2023-2024',
    images: [
      {
        url: 'https://iti.gov.eg/assets/images/ColoredLogo.svg',
        alt: 'ITI',
      },
    ],
  },
  {
    title: '.NET 全栈课程',
    description: '.NET 全栈课程',
    institution: '数字埃及先锋计划 - DEPI',
    location: '埃及，开罗',
    year: '2024',
    images: [
      {
        url: 'https://depi.gov.eg/assets/images/proAr.png',
        alt: 'DEPI',
      },
    ],
  },
] as const;
