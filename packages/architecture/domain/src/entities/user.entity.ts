import z from 'zod';
import { primitive, unbranded } from './zod-traits';

const useEntitySchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    image: z.string().url().optional(),
    createdAt: z.date(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional(),
  })
  .brand('UserEntity');

export type UserEntity = z.infer<typeof useEntitySchema>;

export type UnsafeUserEntity = z.infer<unbranded<typeof useEntitySchema>>;

export function UserEntity(value: UnsafeUserEntity): UserEntity {
  return value as UserEntity;
}

export const parseUserEntity = (
  value: primitive<UnsafeUserEntity>
): UserEntity => {
  return useEntitySchema.parse(value);
};
