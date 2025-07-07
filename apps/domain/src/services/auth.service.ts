import { createToken } from '@repo/ioc/container';
import z from 'zod';

export const tAuthService = createToken<AuthService>('AUTH_SERVICE');

// Email/Password login schemas
export const loginWithEmailPasswordInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginWithEmailPasswordInput = z.infer<
  typeof loginWithEmailPasswordInputSchema
>;

// OAuth login schemas
export const oauthProviderEnum = z.enum(['google', 'apple', 'github']);
export type OAuthProvider = z.infer<typeof oauthProviderEnum>;

export const loginWithOAuthInputSchema = z.object({
  provider: oauthProviderEnum,
});

export type LoginWithOAuthInput = z.infer<typeof loginWithOAuthInputSchema>;

// Common output schema for all login methods
export const loginOutputSchema = z.object({
  accessToken: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string().optional(),
    avatar: z.string().url().optional(),
  }),
});

export type LoginOutput = z.infer<typeof loginOutputSchema>;

export interface AuthService {
  loginWithEmailPassword(
    input: LoginWithEmailPasswordInput
  ): Promise<LoginOutput>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<LoginOutput['user'] | null>;
}
