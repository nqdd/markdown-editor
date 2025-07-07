import globals from 'globals';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { config as reactConfig } from '@repo/eslint-config/react';

export default tseslint.config([
  ...reactConfig,
  {
    ignores: ['dist/**'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]);
