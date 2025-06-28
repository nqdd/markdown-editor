import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    accessToken: localStorage.getItem('accessToken'),
    loading: true,
    error: null,
  });

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (authState.accessToken) {
        try {
          // You would need to implement this method in your auth service
          // to verify the token and get the current user
          const user = await container
            .resolve(tAuthService)
            .getCurrentUser(authState.accessToken);

          if (user) {
            setAuthState((prev) => ({
              ...prev,
              user,
              loading: false,
            }));
            return;
          }
        } catch (error) {
          console.error('Failed to validate token:', error);
          localStorage.removeItem('accessToken');
        }
      }

      setAuthState((prev) => ({
        ...prev,
        user: null,
        accessToken: null,
        loading: false,
      }));
    };

    checkAuth();
  }, [container, authState.accessToken]);

  const login = useCallback(
    async (email: string, password: string) => {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const result = await loginWithEmailPasswordUseCase.execute({
          email,
          password,
        });

        localStorage.setItem('accessToken', result.accessToken);

        setAuthState({
          user: result.user,
          accessToken: result.accessToken,
          loading: false,
          error: null,
        });

        navigate('/');
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
    [loginWithEmailPasswordUseCase, navigate]
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

        localStorage.setItem('accessToken', result.accessToken);

        setAuthState({
          user: result.user,
          accessToken: result.accessToken,
          loading: false,
          error: null,
        });

        navigate('/');
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
    [handleOAuthCallbackUseCase, navigate]
  );

  const logout = useCallback(async () => {
    if (authState.accessToken) {
      try {
        await container.resolve(tAuthService).logout(authState.accessToken);
      } catch (error) {
        console.error('Logout error:', error);
      }
    }

    localStorage.removeItem('accessToken');

    setAuthState({
      user: null,
      accessToken: null,
      loading: false,
      error: null,
    });

    navigate('/login');
  }, [container, authState.accessToken, navigate]);

  return {
    user: authState.user,
    accessToken: authState.accessToken,
    loading: authState.loading,
    error: authState.error,
    isAuthenticated: !!authState.user,
    login,
    loginWithOAuth,
    handleOAuthCallback,
    logout,
  };
}
