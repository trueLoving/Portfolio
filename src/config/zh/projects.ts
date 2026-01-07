/**
 * Projects configuration (Chinese)
 * Import all project JSON files here
 */

import type { Project } from '../../types';

import pixuli from './projects/pixuli.json';
import stationuli from './projects/stationuli.json';
import profiliuli from './projects/profiliuli.json';

export const projects: readonly Project[] = [pixuli, stationuli, profiliuli] as Project[];

