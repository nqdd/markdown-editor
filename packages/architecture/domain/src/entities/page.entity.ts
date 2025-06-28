import z from 'zod';
import { primitive, unbranded } from './zod-traits';

const pageEntitySchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(1),
    folderId: z.string().uuid(),
    content: z.string().min(1),
    createdAt: z.date(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional(),
  })
  .brand('PageEntity');

export type PageEntity = z.infer<typeof pageEntitySchema>;

export type UnsafePageEntity = z.infer<unbranded<typeof pageEntitySchema>>;

export function PageEntity(value: UnsafePageEntity): PageEntity {
  return value as PageEntity;
}

export const parsePageEntity = (
  value: primitive<UnsafePageEntity>
): PageEntity => {
  return pageEntitySchema.parse(value);
};
