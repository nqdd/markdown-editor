import z from 'zod';
import type { primitive, unbranded } from './zod-traits';

export const documentEntitySchema = z
  .object({
    id: z.string().uuid(),
    title: z.string().min(1),
    content: z.string(),
    folderId: z.string().uuid(),
    userId: z.string().uuid(),
    isFavorite: z.boolean().default(false),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().optional(),
  })
  .brand('DocumentEntity');

export type DocumentEntity = z.infer<typeof documentEntitySchema>;

export type UnsafeDocumentEntity = z.infer<
  unbranded<typeof documentEntitySchema>
>;

export function DocumentEntity(value: UnsafeDocumentEntity): DocumentEntity {
  return value as DocumentEntity;
}

export const parseDocumentEntity = (
  value: primitive<UnsafeDocumentEntity>
): DocumentEntity => {
  return documentEntitySchema.parse(value);
};
