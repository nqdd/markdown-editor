import { Factory } from '@repo/di/container';
import { createToken } from '@repo/di/create-token';
import { VaultEntity } from '@repo/domain/entities/vault.entity';
import {
  VaultRepository,
  tVaultRepository,
} from '@repo/domain/repositories/vault.repository';

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