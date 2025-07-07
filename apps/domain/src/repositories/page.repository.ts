import { createToken } from '@repo/ioc/container';

export const tPageRepository = createToken<PageRepository>('PAGE_REPOSITORY');

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PageRepository {}
