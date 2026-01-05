/**
 * Education and courses configuration
 * Add your educational background and courses here
 */

import type { Education, Course } from '../../types';

export const education: readonly Education[] = [
  {
    degree: 'Bachelor of Computer Science',
    major: 'Computer Science',
    institution: 'Hangzhou Normal University',
    location: 'Hangzhou, China',
    year: '2017-2021',
    description:
      'Focused on software engineering, algorithms, and modern web technologies. Completed capstone project on cross-platform application development.',
    relevantCourses: [
      'Data Structures and Algorithms',
      'Operating Systems',
      'Computer Networks',
      'Software Engineering',
      'Machine Learning',
      'Computer Vision',
    ],
    images: [
      {
        url: 'https://www.hznu.edu.cn/upload/resources/image/2021/08/10/7657092.jpg',
        alt: 'Hangzhou Normal University',
        description: 'Hangzhou Normal University Campus',
      },
    ],
  },
] as const;

export const courses: readonly Course[] = [
  {
    title: 'IOT',
    description: 'IOT course',
    institution: 'ITI',
    location: 'Cairo, Egypt',
    year: '2023-2024',
    images: [
      {
        url: 'https://iti.gov.eg/assets/images/ColoredLogo.svg',
        alt: 'ITI',
      },
    ],
  },
  {
    title: '.NET full stack course',
    description: '.NET full stack course',
    institution: 'Digital Egypt Pioneers Initiative - DEPI',
    location: 'Cairo, Egypt',
    year: '2024',
    images: [
      {
        url: 'https://depi.gov.eg/assets/images/proAr.png',
        alt: 'DEPI',
      },
    ],
  },
] as const;
