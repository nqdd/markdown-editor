import { DependencyContainer } from '@repo/di/container';
import { createSupabaseAuthService } from './services/supabase-auth.service';
import { tAuthService } from '@repo/domain/services/auth.service';
import { createSupabaseUserRepository } from './repositories/supabase-user.repository';
import { tUserRepository } from '@repo/domain/repositories/user.repository';
import { createSupabaseFolderRepository } from './repositories/supabase-folder.repository';
import { tFolderRepository } from '@repo/domain/repositories/folder.repository';
import { createSupabaseVaultRepository } from './repositories/supabase-vault.repository';
import { tVaultRepository } from '@repo/domain/repositories/vault.repository';
import {
  createSupabaseClient,
  tAuthRedirectUrl,
  tSupabaseClient,
  tSupabaseKey,
  tSupabaseUrl,
} from './supabase-client';

export function registerInfrastructureSupabase(
  container: DependencyContainer,
  config: {
    supabaseUrl: string;
    supabaseKey: string;
    authRedirectUrl: string;
  }
): void {
  container.register(tSupabaseUrl, () => config.supabaseUrl);
  container.register(tSupabaseKey, () => config.supabaseKey);
  container.register(tAuthRedirectUrl, () => config.authRedirectUrl);
  container.register(tSupabaseClient, createSupabaseClient);
  container.register(tAuthService, createSupabaseAuthService);
  container.register(tUserRepository, createSupabaseUserRepository);
  container.register(tFolderRepository, createSupabaseFolderRepository);
  container.register(tVaultRepository, createSupabaseVaultRepository);
}
