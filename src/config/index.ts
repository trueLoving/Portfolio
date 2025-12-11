/**
 * Main configuration file
 * This file combines all modular configuration files into a single userConfig export
 * 
 * To customize your portfolio, edit the individual files in src/config/
 * instead of editing this file directly:
 * - personal.ts: Personal information
 * - social.ts: Social media links
 * - contact.ts: Contact information
 * - education.ts: Education and courses
 * - experience.ts: Work experience
 * - skills.ts: Technical skills
 * - projects.ts: Project imports
 * - apps.ts: Spotify and resume configuration
 * - site.ts: SEO and theme configuration
 */

import type { UserConfig } from '../types';

import { personal } from './personal';
import { social } from './social';
import { contact } from './contact';
import { education, courses } from './education';
import { experience } from './experience';
import { skills } from './skills';
import { projects } from './projects';
import { spotify, resume } from './apps';
import { seo, theme } from './site';

/**
 * Combined user configuration
 * This is the main configuration object used throughout the application
 */
export const userConfig: UserConfig = {
  // Personal Information
  ...personal,

  // Social & Contact
  social,
  contact,

  // Configuration
  spotify,
  resume,
  seo,
  theme,

  // Content
  education,
  courses,
  skills,
  experience,
  projects,
} as const;

// Export individual modules for granular imports if needed
export { personal, social, contact, education, courses, experience, skills, projects, spotify, resume, seo, theme };
