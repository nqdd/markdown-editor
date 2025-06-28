export { config } from '@repo/typescript-config/base';

import tseslint from 'typescript-eslint';

export default tseslint.config([...config]);
