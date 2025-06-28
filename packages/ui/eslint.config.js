import { config } from '@repo/eslint-config/react-internal';
import tseslint from 'typescript-eslint';

export default tseslint.config([...config]);
