import {
  FolderEntity,
  parseFolderEntity,
} from '@repo/domain/entities/folder.entity';
import type { FolderRepository } from '@repo/domain/repositories/folder.repository';
import { SupabaseClient } from '@supabase/supabase-js';
import { DependencyContainer } from '@repo/ioc/container';
import { tSupabaseClient } from '../supabase-client';

export const createSupabaseFolderRepository = (
  container: DependencyContainer
): FolderRepository => {
  const client = container.resolve(tSupabaseClient);
  return new SupabaseFolderRepository(client);
};

export class SupabaseFolderRepository implements FolderRepository {
  private readonly supabaseClient: SupabaseClient;

  constructor(supabaseClient: SupabaseClient) {
    this.supabaseClient = supabaseClient;
  }

  async getById(id: string): Promise<FolderEntity | null> {
    const { data, error } = await this.supabaseClient
      .from('folders')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return null;
    }

    try {
      return parseFolderEntity({
        id: data.id,
        name: data.name,
        userId: data.user_id,
        parentId: data.parent_id || undefined,
        vaultId: data.vault_id || undefined,
        createdAt: new Date(data.created_at),
        updatedAt: data.updated_at ? new Date(data.updated_at) : new Date(),
        deletedAt: data.deleted_at ? new Date(data.deleted_at) : new Date(),
      });
    } catch (e) {
      console.error('Error parsing folder entity:', e);
      return null;
    }
  }

  async getAllByUserAndVault(
    userId: string,
    vaultId: string
  ): Promise<FolderEntity[]> {
    const { data, error } = await this.supabaseClient
      .from('folders')
      .select('*')
      .eq('user_id', userId)
      .eq('vault_id', vaultId)
      .order('name');

    if (error || !data) {
      return [];
    }

    return data
      .map((item) => {
        try {
          return parseFolderEntity({
            id: item.id,
            name: item.name,
            userId: item.user_id,
            parentId: item.parent_id || undefined,
            vaultId: item.vault_id || undefined,
            createdAt: new Date(item.created_at),
            updatedAt: item.updated_at ? new Date(item.updated_at) : new Date(),
            deletedAt: item.deleted_at ? new Date(item.deleted_at) : new Date(),
          });
        } catch (e) {
          console.error('Error parsing folder entity:', e);
          return null;
        }
      })
      .filter((item): item is FolderEntity => item !== null);
  }

  async create(folder: FolderEntity): Promise<void> {
    const { error } = await this.supabaseClient.from('folders').insert({
      id: folder.id,
      name: folder.name,
      user_id: folder.userId,
      parent_id: folder.parentId || null,
      vault_id: folder.vaultId || null,
      created_at: folder.createdAt.toISOString(),
      updated_at: folder.updatedAt?.toISOString(),
      deleted_at: folder.deletedAt?.toISOString(),
    });

    if (error) {
      console.error('Error creating folder:', error);
      throw error;
    }
  }

  async update(folder: FolderEntity): Promise<void> {
    const { error } = await this.supabaseClient
      .from('folders')
      .update({
        name: folder.name,
        parent_id: folder.parentId || null,
        vault_id: folder.vaultId || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', folder.id);

    if (error) {
      console.error('Error updating folder:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabaseClient
      .from('folders')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting folder:', error);
      throw error;
    }
  }
}
