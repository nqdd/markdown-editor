import {
  VaultEntity,
  parseVaultEntity,
} from '@repo/domain/entities/vault.entity';
import { VaultRepository } from '@repo/domain/repositories/vault.repository';
import { SupabaseClient } from '@supabase/supabase-js';
import { DependencyContainer } from '@repo/di/container';
import { tSupabaseClient } from '../supabase-client';

export const createSupabaseVaultRepository = (
  container: DependencyContainer
): VaultRepository => {
  const client = container.resolve(tSupabaseClient);
  return new SupabaseVaultRepository(client);
};

export class SupabaseVaultRepository implements VaultRepository {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  async getById(id: string): Promise<VaultEntity | null> {
    const { data, error } = await this.supabaseClient
      .from('vaults')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return null;
    }

    try {
      return parseVaultEntity({
        id: data.id,
        name: data.name,
        userId: data.user_id,
        createdAt: new Date(data.created_at),
        updatedAt: data.updated_at ? new Date(data.updated_at) : new Date(),
      });
    } catch (e) {
      console.error('Error parsing vault entity:', e);
      return null;
    }
  }

  async getAllByUser(userId: string): Promise<VaultEntity[]> {
    const { data, error } = await this.supabaseClient
      .from('vaults')
      .select('*')
      .eq('user_id', userId)
      .order('name');

    if (error || !data) {
      return [];
    }

    return data
      .map((item) => {
        try {
          return parseVaultEntity({
            id: item.id,
            name: item.name,
            userId: item.user_id,
            createdAt: new Date(item.created_at),
            updatedAt: item.updated_at ? new Date(item.updated_at) : new Date(),
          });
        } catch (e) {
          console.error('Error parsing vault entity:', e);
          return null;
        }
      })
      .filter((item): item is VaultEntity => item !== null);
  }

  async create(vault: VaultEntity): Promise<void> {
    const { error } = await this.supabaseClient.from('vaults').insert({
      id: vault.id,
      name: vault.name,
      user_id: vault.userId,
      created_at: vault.createdAt.toISOString(),
      updated_at: vault.updatedAt.toISOString(),
    });

    if (error) {
      console.error('Error creating vault:', error);
      throw error;
    }
  }

  async update(vault: VaultEntity): Promise<void> {
    const { error } = await this.supabaseClient
      .from('vaults')
      .update({
        name: vault.name,
        updated_at: new Date().toISOString(),
      })
      .eq('id', vault.id);

    if (error) {
      console.error('Error updating vault:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabaseClient
      .from('vaults')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting vault:', error);
      throw error;
    }
  }
}