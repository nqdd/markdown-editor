import type { Factory } from '@repo/ioc/container';
import { createToken } from '@repo/ioc/container';
import {
  AuthService,
  LoginWithEmailPasswordInput,
  LoginOutput,
  loginWithEmailPasswordInputSchema,
  loginOutputSchema,
  tAuthService,
} from '@repo/domain/services/auth.service';
export const tLoginWithEmailPasswordUseCase =
  createToken<LoginWithEmailPasswordUseCase>(
    'LOGIN_WITH_EMAIL_PASSWORD_USE_CASE'
  );

export const createLoginWithEmailPasswordUseCase: Factory<
  LoginWithEmailPasswordUseCase
> = (container) => {
  const authService = container.resolve(tAuthService);
  return new LoginWithEmailPasswordUseCase(authService);
};

export class LoginWithEmailPasswordUseCase {
  constructor(private authService: AuthService) {}

  async execute(input: LoginWithEmailPasswordInput): Promise<LoginOutput> {
    const validatedInput = loginWithEmailPasswordInputSchema.parse(input);

    const result =
      await this.authService.loginWithEmailPassword(validatedInput);

    return loginOutputSchema.parse(result);
  }
}
