import { useDependencyContainer } from './useDependencyContainer';
import { tGetVaultListUseCase } from '@repo/usecase/vault/get-vault-list';
import {
  tCreateVaultUseCase,
  type CreateVaultInput,
} from '@repo/usecase/vault/create-vault';
import { useAuthContext } from '../providers/auth-provider';
import { useCallback } from 'react';

export type CreateVaultData = Omit<CreateVaultInput, 'userId'>;

export function useVaultUseCases() {
  const container = useDependencyContainer();
  const getVaultListUseCase = container.resolve(tGetVaultListUseCase);
  const createVaultUseCase = container.resolve(tCreateVaultUseCase);
  const { user } = useAuthContext();

  return {
    getAllVaults: useCallback(async () => {
      const userId = user?.id;
      if (!userId) {
        throw new Error('User not logged in');
      }
      return getVaultListUseCase.execute(userId);
    }, [getVaultListUseCase, user?.id]),
    createVault: useCallback(
      async (data: CreateVaultData) => {
        const userId = user?.id;
        if (!userId) {
          throw new Error('User not logged in');
        }
        return createVaultUseCase.execute({
          ...data,
          userId,
        });
      },
      [createVaultUseCase, user?.id]
    ),
  };
}
