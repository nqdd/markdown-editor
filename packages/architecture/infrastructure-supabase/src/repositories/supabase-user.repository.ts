import { UserRepository } from '@repo/domain/repositories/user.repository';
import { UserEntity, parseUserEntity } from '@repo/domain/entities/user.entity';
import { SupabaseClient } from '@supabase/supabase-js';
import { DependencyContainer } from '@repo/di/container';
import { tSupabaseClient } from '../supabase-client';

export const createSupabaseUserRepository = (
  container: DependencyContainer
): UserRepository => {
  const client = container.resolve(tSupabaseClient);
  return new SupabaseUserRepository(client);
};

export class SupabaseUserRepository implements UserRepository {
  constructor(private client: SupabaseClient) {}

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
