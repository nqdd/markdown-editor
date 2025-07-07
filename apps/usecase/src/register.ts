import { createToken, DependencyContainer } from '@repo/ioc/container';

import {
  createLoginWithEmailPasswordUseCase,
  tLoginWithEmailPasswordUseCase,
} from './auth/login-with-email-password';
import {
  createCreateFolderUseCase,
  tCreateFolderUseCase,
} from './folder/create-folder';
import {
  tDeleteFolderUseCase,
  createDeleteFolderUseCase,
} from './folder/delete-folder';
import { tGetFolderUseCase, createGetFolderUseCase } from './folder/get-folder';
import {
  tGetFolderListUseCase,
  createGetFolderListUseCase,
} from './folder/get-folder-list';
import {
  tUpdateFolderUseCase,
  createUpdateFolderUseCase,
} from './folder/update-folder';
import {
  tCreateVaultUseCase,
  createCreateVaultUseCase,
} from './vault/create-vault';
import {
  tGetVaultListUseCase,
  createGetVaultListUseCase,
} from './vault/get-vault-list';

const initializeUseCasesToken = createToken('INITIALIZE_USE_CASES');

export function registerUseCases(container: DependencyContainer): void {
  if (container.has(initializeUseCasesToken)) {
    return;
  }

  container.register(initializeUseCasesToken, () => true);
  container.resolve(initializeUseCasesToken);

  // Register auth use cases
  container.register(
    tLoginWithEmailPasswordUseCase,
    createLoginWithEmailPasswordUseCase
  );

  // Register folder use cases
  container.register(tCreateFolderUseCase, createCreateFolderUseCase);
  container.register(tGetFolderUseCase, createGetFolderUseCase);
  container.register(tGetFolderListUseCase, createGetFolderListUseCase);
  container.register(tUpdateFolderUseCase, createUpdateFolderUseCase);
  container.register(tDeleteFolderUseCase, createDeleteFolderUseCase);

  // Register vault use cases
  container.register(tGetVaultListUseCase, createGetVaultListUseCase);
  container.register(tCreateVaultUseCase, createCreateVaultUseCase);
}
