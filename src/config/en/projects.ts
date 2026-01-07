/**
 * Projects configuration
 * Import all project JSON files here
 */

import type { Project } from '../../types';

import pixuli from './projects/pixuli.json';
import stationuli from './projects/stationuli.json';
import macosTerminalPortfolio from './projects/macos-terminal-portfolio.json';

export const projects: readonly Project[] = [pixuli, stationuli, macosTerminalPortfolio] as Project[];
