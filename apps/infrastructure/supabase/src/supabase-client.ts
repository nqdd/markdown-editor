import { DependencyContainer } from '@repo/ioc/container';
import { createToken } from '@repo/ioc/container';
import {
  createClient as supabaseCreateClient,
  SupabaseClient,
} from '@supabase/supabase-js';

export const tSupabaseUrl = createToken<string>('SUPABASE_URL');
export const tSupabaseKey = createToken<string>('SUPABASE_KEY');
export const tAuthRedirectUrl = createToken<string>('AUTH_REDIRECT_URL');

export const tSupabaseClient = createToken<SupabaseClient>('SupabaseClient');

export const createSupabaseClient = (
  container: DependencyContainer
): SupabaseClient => {
  const supabaseUrl = container.resolve(tSupabaseUrl);
  const supabaseKey = container.resolve(tSupabaseKey);
  return supabaseCreateClient(supabaseUrl, supabaseKey);
};
