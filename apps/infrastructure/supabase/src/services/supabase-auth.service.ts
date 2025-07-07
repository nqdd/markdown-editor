import type { Factory } from '@repo/ioc/container';
import type {
  AuthService,
  LoginWithEmailPasswordInput,
  LoginOutput,
} from '@repo/domain/services/auth.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { tSupabaseService } from './supabase.service';
export const createSupabaseAuthService: Factory<AuthService> = (container) => {
  const supabase = container.resolve(tSupabaseService);
  return new SupabaseAuthService(supabase.client);
};

export class SupabaseAuthService implements AuthService {
  private readonly client: SupabaseClient;

  constructor(client: SupabaseClient) {
    this.client = client;
  }

  async loginWithEmailPassword(
    input: LoginWithEmailPasswordInput
  ): Promise<LoginOutput> {
    const { data, error } = await this.client.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    });

    if (error || !data.session) {
      throw new Error(error?.message || 'Invalid credentials');
    }

    return {
      accessToken: data.session.access_token,
      user: {
        id: data.user.id,
        email: data.user.email!,
        name: data.user.user_metadata?.name,
        avatar: data.user.user_metadata?.avatar_url,
      },
    };
  }

  async logout(): Promise<void> {
    const { error } = await this.client.auth.signOut();

    if (error) {
      throw new Error(error.message || 'Failed to logout');
    }
  }

  async getCurrentUser(
    accessToken?: string
  ): Promise<LoginOutput['user'] | null> {
    // Set the auth token if provided
    if (accessToken) {
      this.client.auth.setSession({
        access_token: accessToken,
        refresh_token: '', // We don't have the refresh token here
      });
    }

    const { data, error } = await this.client.auth.getUser();

    if (error || !data.user) {
      return null;
    }

    return {
      id: data.user.id,
      email: data.user.email!,
      name: data.user.user_metadata?.name,
      avatar: data.user.user_metadata?.avatar_url,
    };
  }
}
