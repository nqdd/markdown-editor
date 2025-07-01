import type { UserRepository } from '@repo/domain/repositories/user.repository';
import { UserEntity, parseUserEntity } from '@repo/domain/entities/user.entity';
import { SupabaseClient } from '@supabase/supabase-js';
import type { Factory } from '@repo/ioc/container';
import { injectable, inject } from 'tsyringe';
import { tSupabaseClient } from '../supabase-client';

export const createSupabaseUserRepository: Factory<UserRepository> = (container) =>
  container.resolve(SupabaseUserRepository);

@injectable()
export class SupabaseUserRepository implements UserRepository {
  constructor(
    @inject(tSupabaseClient) private readonly client: SupabaseClient
  ) {}

  async getByEmail(email: string): Promise<UserEntity | null> {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      return null;
    }

    try {
      return parseUserEntity({
        ...data,
        createdAt: new Date(data.created_at),
        updatedAt: data.updated_at ? new Date(data.updated_at) : undefined,
        deletedAt: data.deleted_at ? new Date(data.deleted_at) : undefined,
      });
    } catch (e) {
      console.error('Error parsing user entity:', e);
      return null;
    }
  }
}
