import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuthContext } from '../providers/auth-provider';

export function OAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const { handleOAuthCallback } = useAuthContext();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processOAuthCallback = async () => {
      const provider = searchParams.get('provider');
      const code = searchParams.get('code');

      if (!provider || !code) {
        setError('Missing provider or code parameter');
        return;
      }

      try {
        // Cast provider to OAuthProvider type
        await handleOAuthCallback(provider as any, code);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to complete authentication');
      }
    };

    processOAuthCallback();
  }, [searchParams, handleOAuthCallback]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-4 rounded-lg border p-8 shadow-md">
          <h1 className="text-2xl font-bold text-destructive">Authentication Error</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-4 rounded-lg border p-8 shadow-md">
        <h1 className="text-2xl font-bold">Completing authentication...</h1>
        <p>Please wait while we complete your login.</p>
      </div>
    </div>
  );
}