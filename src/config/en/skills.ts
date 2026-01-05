/**
 * Skills configuration
 * Structured skills by category with proficiency levels
 */

export interface Skill {
  name: string;
  level?: 'expert' | 'advanced' | 'intermediate' | 'learning';
  years?: number;
}

export const skillsByCategory = {
  languages: [
    { name: 'JavaScript', level: 'expert' as const, years: 5 },
    { name: 'TypeScript', level: 'expert' as const, years: 4 },
    { name: 'Rust', level: 'intermediate' as const, years: 2 },
    { name: 'Python', level: 'intermediate' as const, years: 3 },
  ],
  frontend: [
    { name: 'React', level: 'expert' as const, years: 4 },
    { name: 'Vue.js', level: 'expert' as const, years: 3 },
    { name: 'Next.js', level: 'advanced' as const, years: 2 },
    { name: 'Tailwind CSS', level: 'expert' as const, years: 3 },
  ],
  backend: [
    { name: 'Node.js', level: 'expert' as const, years: 4 },
    { name: 'NestJS', level: 'advanced' as const, years: 2 },
  ],
  mobile: [
    { name: 'React Native', level: 'advanced' as const, years: 2 },
  ],
  desktop: [
    { name: 'Electron', level: 'advanced' as const, years: 2 },
    { name: 'Tauri', level: 'intermediate' as const, years: 1 },
  ],
  databases: [
    { name: 'PostgreSQL', level: 'intermediate' as const, years: 2 },
    { name: 'MongoDB', level: 'intermediate' as const, years: 2 },
    { name: 'MySQL', level: 'intermediate' as const, years: 2 },
  ],
  devops: [
    { name: 'Docker', level: 'advanced' as const, years: 3 },
    { name: 'AWS', level: 'intermediate' as const, years: 2 },
    { name: 'CI/CD', level: 'intermediate' as const, years: 2 },
  ],
  emerging: [
    { name: 'Web3', level: 'intermediate' as const, years: 1 },
    { name: 'AI/ML', level: 'learning' as const, years: 1 },
  ],
} as const;

// Flatten for backward compatibility
export const skills: readonly string[] = [
  ...skillsByCategory.languages.map((s) => s.name),
  ...skillsByCategory.frontend.map((s) => s.name),
  ...skillsByCategory.backend.map((s) => s.name),
  ...skillsByCategory.mobile.map((s) => s.name),
  ...skillsByCategory.desktop.map((s) => s.name),
  ...skillsByCategory.databases.map((s) => s.name),
  ...skillsByCategory.devops.map((s) => s.name),
  ...skillsByCategory.emerging.map((s) => s.name),
] as const;
