import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import astro from 'eslint-plugin-astro';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import astroParser from 'astro-eslint-parser';

export default [
  // Astro 推荐配置（必须在其他配置之前）
  ...astro.configs.recommended,
  // JavaScript 推荐配置
  js.configs.recommended,
  // TypeScript 推荐配置
  ...tseslint.configs.recommended,
  // 全局配置 - 只检查 src 目录
  {
    files: ['src/**/*.{js,jsx,ts,tsx,astro}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // React 相关规则
      'react/react-in-jsx-scope': 'off', // React 17+ 不需要导入 React
      'react/prop-types': 'off', // 使用 TypeScript 进行类型检查
      'react/jsx-uses-react': 'off', // React 17+ 不需要
      'react/jsx-uses-vars': 'error',
      'react-hooks/preserve-manual-memoization': 'warn', // 将 memoization 警告降级
      'react-hooks/set-state-in-effect': 'warn', // 将 setState 警告降级

      // TypeScript 相关规则
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // 通用规则
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      'no-unused-vars': 'off', // 使用 TypeScript 版本
      
      // 可访问性规则 - 降级为警告
      'jsx-a11y/label-has-associated-control': 'warn',
      'jsx-a11y/no-noninteractive-element-interactions': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-noninteractive-tabindex': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'react/no-unescaped-entities': 'warn',
    },
  },
  // React 特定配置
  {
    files: ['src/**/*.{jsx,tsx}'],
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // React 17+ 不需要导入 React
      'react-hooks/preserve-manual-memoization': 'warn', // 将 memoization 警告降级
      'react-hooks/set-state-in-effect': 'warn', // 将 setState 警告降级
      // 可访问性规则 - 覆盖推荐配置，降级为警告
      'jsx-a11y/label-has-associated-control': 'warn',
      'jsx-a11y/no-noninteractive-element-interactions': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-noninteractive-tabindex': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'react/no-unescaped-entities': 'warn',
    },
  },
  // Astro 特定配置（覆盖规则）
  {
    files: ['src/**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
        sourceType: 'module',
      },
    },
    rules: {
      // 可以在这里覆盖 Astro 特定规则
      // 例如：'astro/no-set-html-directive': 'warn',
    },
  },
  // Prettier 配置（必须放在最后）
  prettier,
];
