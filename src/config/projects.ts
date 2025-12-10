/**
 * Projects configuration
 * Import all project JSON files here
 */

import type { Project } from '../types';

import scheds from './projects/scheds.json';
import portfolio from './projects/portfolio.json';

export const projects: readonly Project[] = [
  // scheds,
  // portfolio,
] as Project[];
