import z from 'zod';
import type { primitive, unbranded } from './zod-traits';

export const documentTagEntitySchema = z
  .object({
    documentId: z.string().uuid(),
    tagId: z.string().uuid(),
  })
  .brand('DocumentTagEntity');

export type DocumentTagEntity = z.infer<typeof documentTagEntitySchema>;

export type UnsafeDocumentTagEntity = z.infer<
  unbranded<typeof documentTagEntitySchema>
>;

export function DocumentTagEntity(
  value: UnsafeDocumentTagEntity
): DocumentTagEntity {
  return value as DocumentTagEntity;
}

export const parseDocumentTagEntity = (
  value: primitive<UnsafeDocumentTagEntity>
): DocumentTagEntity => {
  return documentTagEntitySchema.parse(value);
};
