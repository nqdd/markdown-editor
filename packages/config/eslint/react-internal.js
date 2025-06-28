import { config as reactConfig } from './react.js';
import tseslint from 'typescript-eslint';

/**
 * A custom ESLint configuration for internal React packages.
 * This extends the base React configuration with additional rules for internal packages.
 *
 * @type {import("eslint").Linter.Config[]} */
export const config = tseslint.config([
  ...reactConfig,
  {
    rules: {
      // Add any additional rules specific to internal React packages
      'react/prop-types': 'off',
    },
  },
]);
