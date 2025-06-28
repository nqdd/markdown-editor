import z from 'zod';
import type { primitive, unbranded } from './zod-traits';

export const folderEntitySchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(1),
    userId: z.string().uuid(), // This matches user_id in the database
    parentId: z.string().uuid().optional(), // This matches parent_id in the database
    vaultId: z.string().uuid().optional(), // This matches vault_id in the database
    createdAt: z.date(), // This matches created_at in the database
    updatedAt: z.date(), // This matches updated_at in the database
    deletedAt: z.date().optional(), // This is not in the database schema but can be kept for soft delete functionality
  })
  .brand('FolderEntity');

export type FolderEntity = z.infer<typeof folderEntitySchema>;

export type UnsafeFolderEntity = z.infer<unbranded<typeof folderEntitySchema>>;

export function FolderEntity(value: UnsafeFolderEntity): FolderEntity {
  return value as FolderEntity;
}

export const parseFolderEntity = (
  value: primitive<UnsafeFolderEntity>
): FolderEntity => {
  return folderEntitySchema.parse(value);
};
