import { vaultEntitySchema } from '@repo/domain/entities/vault.entity';
import z from 'zod';

export const vaultSchema = vaultEntitySchema.unwrap().pick({
  id: true,
  name: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export type Vault = z.infer<typeof vaultSchema>;
