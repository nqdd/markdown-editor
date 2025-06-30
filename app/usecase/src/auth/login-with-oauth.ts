import type { Factory } from '@repo/ioc/container';
import { createToken } from '@repo/ioc/token';
import type {
  AuthService,
  LoginWithOAuthInput,
  OAuthProvider,
  LoginOutput,
} from '@repo/domain/services/auth.service';
import {
  loginWithOAuthInputSchema,
  loginOutputSchema,
  tAuthService,
} from '@repo/domain/services/auth.service';
export const tGetOAuthLoginUrlUseCase = createToken<GetOAuthLoginUrlUseCase>(
  'GET_OAUTH_LOGIN_URL_USE_CASE'
);

export const createGetOAuthLoginUrlUseCase: Factory<GetOAuthLoginUrlUseCase> = (
  container
) => {
  const authService = container.resolve(tAuthService);
  return new GetOAuthLoginUrlUseCase(authService);
};

export const createHandleOAuthCallbackUseCase: Factory<
  HandleOAuthCallbackUseCase
> = (container) => {
  const authService = container.resolve(tAuthService);
  return new HandleOAuthCallbackUseCase(authService);
};

export const tHandleOAuthCallbackUseCase =
  createToken<HandleOAuthCallbackUseCase>('HANDLE_OAUTH_CALLBACK_USE_CASE');

export class GetOAuthLoginUrlUseCase {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async execute(input: LoginWithOAuthInput): Promise<string> {
    const validatedInput = loginWithOAuthInputSchema.parse(input);

    return await this.authService.getOAuthLoginUrl(validatedInput);
  }
}

export class HandleOAuthCallbackUseCase {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async execute(provider: OAuthProvider, code: string): Promise<LoginOutput> {
    const result = await this.authService.handleOAuthCallback(provider, code);

    return loginOutputSchema.parse(result);
  }
}
