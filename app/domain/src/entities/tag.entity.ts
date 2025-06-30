import z from 'zod';
import type { primitive, unbranded } from './zod-traits';

export const tagEntitySchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(1),
    color: z.string().optional(),
    userId: z.string().uuid(),
    createdAt: z.date(),
  })
  .brand('TagEntity');

export type TagEntity = z.infer<typeof tagEntitySchema>;

export type UnsafeTagEntity = z.infer<unbranded<typeof tagEntitySchema>>;

export function TagEntity(value: UnsafeTagEntity): TagEntity {
  return value as TagEntity;
}

export const parseTagEntity = (
  value: primitive<UnsafeTagEntity>
): TagEntity => {
  return tagEntitySchema.parse(value);
};
