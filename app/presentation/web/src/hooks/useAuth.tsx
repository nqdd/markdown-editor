import { useCallback, useEffect, useState } from 'react';
import { useDependencyContainer } from './useDependencyContainer';
import { tLoginWithEmailPasswordUseCase } from '@repo/usecase/auth/login-with-email-password';
import {
  tGetOAuthLoginUrlUseCase,
  tHandleOAuthCallbackUseCase,
} from '@repo/usecase/auth/login-with-oauth';
import {
  tAuthService,
  type OAuthProvider,
} from '@repo/domain/services/auth.service';

type User = {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
};

export function useAuth() {
  const container = useDependencyContainer();
  const loginWithEmailPasswordUseCase = container.resolve(
    tLoginWithEmailPasswordUseCase
  );
  const getOAuthLoginUrlUseCase = container.resolve(tGetOAuthLoginUrlUseCase);
  const handleOAuthCallbackUseCase = container.resolve(
    tHandleOAuthCallbackUseCase
  );

  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    accessToken: null,
    loading: true,
    error: null,
  });

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // You would need to implement this method in your auth service
        // to verify the token and get the current user
        const user = await container.resolve(tAuthService).getCurrentUser();

        setAuthState((prev) => ({
          ...prev,
          user,
        }));
      } catch (error) {
        console.error('Failed to validate token:', error);
      } finally {
        setAuthState((prev) => ({
          ...prev,
          loading: false,
        }));
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const result = await loginWithEmailPasswordUseCase.execute({
          email,
          password,
        });

        setAuthState({
          user: result.user,
          accessToken: result.accessToken,
          loading: false,
          error: null,
        });

        return result;
      } catch (error) {
        setAuthState((prev) => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to login',
        }));
        throw error;
      }
    },
    [loginWithEmailPasswordUseCase]
  );

  const loginWithOAuth = useCallback(
    async (provider: OAuthProvider) => {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const url = await getOAuthLoginUrlUseCase.execute({ provider });
        window.location.href = url;
      } catch (error) {
        setAuthState((prev) => ({
          ...prev,
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : `Failed to login with ${provider}`,
        }));
        throw error;
      }
    },
    [getOAuthLoginUrlUseCase]
  );

  const handleOAuthCallback = useCallback(
    async (provider: OAuthProvider, code: string) => {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const result = await handleOAuthCallbackUseCase.execute(provider, code);

        setAuthState({
          user: result.user,
          accessToken: result.accessToken,
          loading: false,
          error: null,
        });

        return result;
      } catch (error) {
        setAuthState((prev) => ({
          ...prev,
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : 'Failed to complete OAuth login',
        }));
        throw error;
      }
    },
    [handleOAuthCallbackUseCase]
  );

  const logout = useCallback(async () => {
    if (authState.accessToken) {
      try {
        await container.resolve(tAuthService).logout();
      } catch (error) {
        console.error('Logout error:', error);
      }
    }

    setAuthState({
      user: null,
      accessToken: null,
      loading: false,
      error: null,
    });
  }, [container, authState.accessToken]);

  return {
    user: authState.user,
    accessToken: authState.accessToken,
    loading: authState.loading,
    error: authState.error,
    isAuthenticated: Boolean(authState.user?.id),
    login,
    loginWithOAuth,
    handleOAuthCallback,
    logout,
  };
}
