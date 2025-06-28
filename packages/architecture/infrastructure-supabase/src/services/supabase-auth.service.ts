import type { Factory } from '@repo/di/container';
import type {
  AuthService,
  LoginWithEmailPasswordInput,
  LoginOutput,
  LoginWithOAuthInput,
  OAuthProvider,
} from '@repo/domain/services/auth.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { tAuthRedirectUrl, tSupabaseClient } from '../supabase-client';
export const createSupabaseAuthService: Factory<AuthService> = (container) => {
  const client = container.resolve(tSupabaseClient);
  const redirectUrl = container.resolve(tAuthRedirectUrl);
  return new SupabaseAuthService(client, redirectUrl);
};

export class SupabaseAuthService implements AuthService {
  private readonly client: SupabaseClient;
  private readonly redirectUrl: string;

  constructor(client: SupabaseClient, redirectUrl: string) {
    this.redirectUrl = redirectUrl;
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

  async getOAuthLoginUrl(input: LoginWithOAuthInput): Promise<string> {
    const { data, error } = await this.client.auth.signInWithOAuth({
      provider: input.provider,
      options: {
        redirectTo: this.redirectUrl,
      },
    });

    if (error || !data.url) {
      throw new Error(
        error?.message || `Failed to get ${input.provider} login URL`
      );
    }

    return data.url;
  }

  async handleOAuthCallback(
    provider: OAuthProvider,
    code: string
  ): Promise<LoginOutput> {
    console.log('handleOAuthCallback', provider, code);
    // Supabase handles OAuth callbacks automatically through redirects
    // This method would be used to exchange the code for a token if needed
    // For Supabase, we can get the session after the redirect completes

    const { data, error } = await this.client.auth.getSession();

    if (error || !data.session) {
      throw new Error(
        error?.message || 'Failed to complete OAuth authentication'
      );
    }

    return {
      accessToken: data.session.access_token,
      user: {
        id: data.session.user.id,
        email: data.session.user.email!,
        name: data.session.user.user_metadata?.name,
        avatar: data.session.user.user_metadata?.avatar_url,
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
