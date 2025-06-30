import { PageEntity } from '../entities/page.entity';
import { createToken } from '@repo/di/create-token';

export const tPageRepository = createToken<PageRepository>('PAGE_REPOSITORY');

export interface PageRepository {
  getById(id: string): Promise<PageEntity | null>;
}
