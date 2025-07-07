import type { UserRepository } from '@repo/domain/repositories/user.repository';
import { UserEntity, parseUserEntity } from '@repo/domain/entities/user.entity';
import { SupabaseClient } from '@supabase/supabase-js';
import { DependencyContainer } from '@repo/ioc/container';
import { tSupabaseService } from '../services/supabase.service';

export const createSupabaseUserRepository = (
  container: DependencyContainer
): UserRepository => {
  const supabase = container.resolve(tSupabaseService);
  return new SupabaseUserRepository(supabase.client);
};

export class SupabaseUserRepository implements UserRepository {
  private readonly client: SupabaseClient;

  constructor(client: SupabaseClient) {
    this.client = client;
  }

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
