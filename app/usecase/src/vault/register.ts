import { DependencyContainer } from '@repo/ioc/container';
import {
  createGetVaultListUseCase,
  tGetVaultListUseCase,
} from './get-vault-list';
import { createCreateVaultUseCase, tCreateVaultUseCase } from './create-vault';

export function registerVaultUseCases(container: DependencyContainer): void {
  container.register(tGetVaultListUseCase, createGetVaultListUseCase);
  container.register(tCreateVaultUseCase, createCreateVaultUseCase);
}
