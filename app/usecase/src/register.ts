import { DependencyContainer } from '@repo/di/container';

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
import { registerFolderUseCases } from './folder/register';
import { registerVaultUseCases } from './vault/register';

export function registerUseCases(container: DependencyContainer): void {
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
  registerFolderUseCases(container);
  
  // Register vault use cases
  registerVaultUseCases(container);
}
