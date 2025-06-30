import type { Factory } from '@repo/ioc/container';
import { createToken } from '@repo/ioc/token';
import { VaultEntity } from '@repo/domain/entities/vault.entity';
import type { VaultRepository } from '@repo/domain/repositories/vault.repository';
import { tVaultRepository } from '@repo/domain/repositories/vault.repository';
export const tGetVaultListUseCase = createToken<GetVaultListUseCase>(
  'GET_VAULT_LIST_USE_CASE'
);

export const createGetVaultListUseCase: Factory<GetVaultListUseCase> = (
  container
) => {
  const vaultRepository = container.resolve(tVaultRepository);
  return new GetVaultListUseCase(vaultRepository);
};

export class GetVaultListUseCase {
  constructor(private vaultRepository: VaultRepository) {}

  async execute(userId: string): Promise<VaultEntity[]> {
    return await this.vaultRepository.getAllByUser(userId);
  }
}
