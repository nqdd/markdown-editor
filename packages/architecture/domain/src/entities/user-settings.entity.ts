import z from 'zod';
import type { primitive, unbranded } from './zod-traits';

export const userSettingsEntitySchema = z
  .object({
    userId: z.string().uuid(),
    theme: z.string().default('light'),
    fontSize: z.number().default(16),
    lineSpacing: z.number().default(1.5),
    autoSave: z.boolean().default(true),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .brand('UserSettingsEntity');

export type UserSettingsEntity = z.infer<typeof userSettingsEntitySchema>;

export type UnsafeUserSettingsEntity = z.infer<
  unbranded<typeof userSettingsEntitySchema>
>;

export function UserSettingsEntity(
  value: UnsafeUserSettingsEntity
): UserSettingsEntity {
  return value as UserSettingsEntity;
}

export const parseUserSettingsEntity = (
  value: primitive<UnsafeUserSettingsEntity>
): UserSettingsEntity => {
  return userSettingsEntitySchema.parse(value);
};
