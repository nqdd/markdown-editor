import z from 'zod';
import { primitive, unbranded } from './zod-traits';

export const folderEntitySchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(1),
    userId: z.string().uuid(),
    parentId: z.string().uuid().optional(),
    createdAt: z.date(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional(),
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
