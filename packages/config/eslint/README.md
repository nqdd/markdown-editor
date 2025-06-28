# ESLint Configuration

This package provides shared ESLint configurations for the repository.

## Usage

### Base Configuration

For TypeScript packages without React:

```js
import { config } from '@repo/eslint-config/base';
import tseslint from 'typescript-eslint';

export default tseslint.config([...config]);
```
