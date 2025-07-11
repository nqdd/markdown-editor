import type { Factory } from '@repo/ioc/container';
import { createToken } from '@repo/ioc/container';
import { VaultEntity } from '@repo/domain/entities/vault.entity';
import type { VaultRepository } from '@repo/domain/repositories/vault.repository';
import { tVaultRepository } from '@repo/domain/repositories/vault.repository';
import z from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { Vault } from './output';

// Input schema for creating a vault
export const createVaultInputSchema = z.object({
  name: z.string().min(1),
  userId: z.string().uuid(),
});

export type CreateVaultInput = z.infer<typeof createVaultInputSchema>;

export const tCreateVaultUseCase = createToken<CreateVaultUseCase>(
  'CREATE_VAULT_USE_CASE'
);

export const createCreateVaultUseCase: Factory<CreateVaultUseCase> = (
  container
) => {
  const vaultRepository = container.resolve(tVaultRepository);
  return new CreateVaultUseCase(vaultRepository);
};

export class CreateVaultUseCase {
  private vaultRepository: VaultRepository;

  constructor(vaultRepository: VaultRepository) {
    this.vaultRepository = vaultRepository;
  }

  async execute(input: CreateVaultInput): Promise<Vault> {
    const validatedInput = createVaultInputSchema.parse(input);

    const vault: VaultEntity = VaultEntity({
      id: uuidv4(),
      name: validatedInput.name,
      userId: validatedInput.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.vaultRepository.create(vault);

    return vault;
  }
}
