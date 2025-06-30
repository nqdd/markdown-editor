import { DependencyContainer } from '@repo/ioc/container';

import {
  createLoginWithEmailPasswordUseCase,
  tLoginWithEmailPasswordUseCase,
} from './auth/login-with-email-password';
import {
  createGetOAuthLoginUrlUseCase,
  createHandleOAuthCallbackUseCase,
  tGetOAuthLoginUrlUseCase,
  tHandleOAuthCallbackUseCase,
} from './auth/login-with-oauth';
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

export function registerUseCases(container: DependencyContainer): void {
  // Register auth use cases
  container.register(
    tLoginWithEmailPasswordUseCase,
    createLoginWithEmailPasswordUseCase
  );
  container.register(
    tHandleOAuthCallbackUseCase,
    createHandleOAuthCallbackUseCase
  );
  container.register(tGetOAuthLoginUrlUseCase, createGetOAuthLoginUrlUseCase);

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
