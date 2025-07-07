import { folderEntitySchema } from '@repo/domain/entities/folder.entity';
import z from 'zod';

export const folderSchema = folderEntitySchema.unwrap().pick({
  id: true,
  name: true,
  userId: true,
  parentId: true,
  vaultId: true,
  createdAt: true,
  updatedAt: true,
});

export type Folder = z.infer<typeof folderSchema>;
