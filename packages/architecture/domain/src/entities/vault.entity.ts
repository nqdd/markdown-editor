import z from 'zod';
import type { primitive, unbranded } from './zod-traits';

export const vaultEntitySchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(1),
    userId: z.string().uuid(), // This matches user_id in the database
    createdAt: z.date(), // This matches created_at in the database
    updatedAt: z.date(), // This matches updated_at in the database
  })
  .brand('VaultEntity');

export type VaultEntity = z.infer<typeof vaultEntitySchema>;

export type UnsafeVaultEntity = z.infer<unbranded<typeof vaultEntitySchema>>;

export function VaultEntity(value: UnsafeVaultEntity): VaultEntity {
  return value as VaultEntity;
}

export const parseVaultEntity = (
  value: primitive<UnsafeVaultEntity>
): VaultEntity => {
  return vaultEntitySchema.parse(value);
};
