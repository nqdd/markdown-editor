import { useDependencyContainer } from './useDependencyContainer';
import type { VaultEntity } from '@repo/domain/entities/vault.entity';
import { tGetVaultListUseCase } from '@repo/usecase/vault/get-vault-list';
import {
  tCreateVaultUseCase,
  type CreateVaultInput,
} from '@repo/usecase/vault/create-vault';
import { useAuthContext } from '../providers/auth-provider';

export type Vault = VaultEntity;
export type CreateVaultData = Omit<CreateVaultInput, 'userId'>;

export function useVaultUseCases() {
  const container = useDependencyContainer();
  const getVaultListUseCase = container.resolve(tGetVaultListUseCase);
  const createVaultUseCase = container.resolve(tCreateVaultUseCase);
  const { user } = useAuthContext();

  // Get the current user ID from the auth context
  const getCurrentUserId = () => {
    if (!user) {
      // Default user ID as fallback
      return '00000000-0000-0000-0000-000000000000';
    }
    return user.id;
  };

  return {
    getAllVaults: () => {
      const userId = getCurrentUserId();
      return getVaultListUseCase.execute(userId);
    },
    createVault: async (data: CreateVaultData) => {
      const userId = getCurrentUserId();
      return createVaultUseCase.execute({
        ...data,
        userId,
      });
    },
  };
}
