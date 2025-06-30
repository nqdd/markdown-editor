import { PageEntity } from '../entities/page.entity';
import { createToken } from '@repo/ioc/token';

export const tPageRepository = createToken<PageRepository>('PAGE_REPOSITORY');

export interface PageRepository {
  getById(id: string): Promise<PageEntity | null>;
}
