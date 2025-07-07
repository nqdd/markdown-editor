import { createToken, DependencyContainer } from '@repo/ioc/container';
import { createSupabaseAuthService } from './services/supabase-auth.service';
import { tAuthService } from '@repo/domain/services/auth.service';
import { createSupabaseUserRepository } from './repositories/supabase-user.repository';
import { tUserRepository } from '@repo/domain/repositories/user.repository';
import { createSupabaseFolderRepository } from './repositories/supabase-folder.repository';
import { tFolderRepository } from '@repo/domain/repositories/folder.repository';
import { createSupabaseVaultRepository } from './repositories/supabase-vault.repository';
import { tVaultRepository } from '@repo/domain/repositories/vault.repository';
import { SupabaseService, tSupabaseService } from './services/supabase.service';

const initializeInfrastructureToken = createToken('INITIALIZE_INFRASTRUCTURE');

export function registerInfrastructureSupabase(
  container: DependencyContainer,
  config: {
    supabaseUrl: string;
    supabaseKey: string;
    authRedirectUrl: string;
  }
): void {
  if (container.has(initializeInfrastructureToken)) {
    console.debug('Supabase infrastructure already initialized');
    return;
  }

  container.register(initializeInfrastructureToken, () => true);

  container.register(tSupabaseService, () =>
    SupabaseService.init(config.supabaseUrl, config.supabaseKey)
  );

  container.register(tAuthService, createSupabaseAuthService);
  container.register(tUserRepository, createSupabaseUserRepository);
  container.register(tFolderRepository, createSupabaseFolderRepository);
  container.register(tVaultRepository, createSupabaseVaultRepository);
}
