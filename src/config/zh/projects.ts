/**
 * Projects configuration (Chinese)
 * Import all project JSON files here
 */

import type { Project } from '../../types';

import pixuli from './projects/pixuli.json';
import stationuli from './projects/stationuli.json';

export const projects: readonly Project[] = [pixuli, stationuli] as Project[];

