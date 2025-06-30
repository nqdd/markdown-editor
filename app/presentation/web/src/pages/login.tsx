import { useState } from 'react';
import { useAuthContext } from '../providers/auth-provider';
import { Button, Input, Label } from '@repo/ui';
import { Navigate } from 'react-router-dom';

export function LoginPage() {
  const { login, loginWithOAuth, error, loading, isAuthenticated } =
    useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (loading) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg border p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Login to Markdown Editor</h1>
          <p className="text-muted-foreground">
            Enter your credentials to continue
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/15 p-3 text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <Button
            variant="outline"
            type="button"
            onClick={() => loginWithOAuth('github')}
            disabled={loading}
          >
            GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}
