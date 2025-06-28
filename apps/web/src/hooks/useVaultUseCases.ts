import { useDependencyContainer } from './useDependencyContainer';
import type { VaultEntity } from '@repo/domain/entities/vault.entity';
import { tGetVaultListUseCase } from '@repo/usecase/vault/get-vault-list';
import {
  tCreateVaultUseCase,
  type CreateVaultInput,
} from '@repo/usecase/vault/create-vault';
import { useAuthContext } from '../providers/auth-provider';
import { useCallback } from 'react';

export type Vault = VaultEntity;
export type CreateVaultData = Omit<CreateVaultInput, 'userId'>;

export function useVaultUseCases() {
  const container = useDependencyContainer();
  const getVaultListUseCase = container.resolve(tGetVaultListUseCase);
  const createVaultUseCase = container.resolve(tCreateVaultUseCase);
  const { user } = useAuthContext();

  return {
    getAllVaults: useCallback(async () => {
      return getVaultListUseCase.execute(user?.id!);
    }, [user?.id]),
    createVault: useCallback(
      async (data: CreateVaultData) => {
        const userId = user?.id!;
        return createVaultUseCase.execute({
          ...data,
          userId,
        });
      },
      [user?.id]
    ),
  };
}
