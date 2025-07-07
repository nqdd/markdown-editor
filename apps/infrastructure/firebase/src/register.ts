import { createToken, DependencyContainer } from '@repo/ioc/container';
import { createFirebaseAuthService } from './services/firebase-auth.service';
import { tAuthService } from '@repo/domain/services/auth.service';
import { createFirebaseUserRepository } from './repositories/firebase-user.repository';
import { tUserRepository } from '@repo/domain/repositories/user.repository';
import { createFirebaseFolderRepository } from './repositories/firebase-folder.repository';
import { tFolderRepository } from '@repo/domain/repositories/folder.repository';
import { createFirebaseVaultRepository } from './repositories/firebase-vault.repository';
import { tVaultRepository } from '@repo/domain/repositories/vault.repository';
import { FirebaseService } from './services/firebase.service';
import { type FirebaseOptions } from 'firebase/app';

const initializeInfrastructureToken = createToken('INITIALIZE_INFRASTRUCTURE');
export const tFirebaseService = createToken<FirebaseService>('FirebaseService');

export function registerInfrastructureFirebase(
  container: DependencyContainer,
  config: FirebaseOptions,
  env: string = 'development',
  host: string = 'localhost'
): void {
  if (container.has(initializeInfrastructureToken)) {
    console.debug('Firebase infrastructure already initialized');
    return;
  }

  container.register(initializeInfrastructureToken, () => true);

  // Register the FirebaseService instance
  container.register(tFirebaseService, () =>
    FirebaseService.init(env, host, config)
  );

  container.register(tAuthService, createFirebaseAuthService);
  container.register(tUserRepository, createFirebaseUserRepository);
  container.register(tFolderRepository, createFirebaseFolderRepository);
  container.register(tVaultRepository, createFirebaseVaultRepository);
}
