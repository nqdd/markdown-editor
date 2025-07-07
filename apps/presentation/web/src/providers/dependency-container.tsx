import { DependencyContainer } from '@repo/ioc/container';
import { registerInfrastructureSupabase } from '@repo/infrastructure-supabase/register';
import { registerUseCases } from '@repo/usecase/register';
import { createContext, type ReactNode, useMemo } from 'react';
import { registerInfrastructureFirebase } from '@repo/infrastructure-firebase/register';

// eslint-disable-next-line react-refresh/only-export-components
export const DependencyContainerContext =
  createContext<DependencyContainer | null>(null);

export function DependencyContainerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const container = useMemo(() => {
    const container = DependencyContainer.getInstance();

    switch (import.meta.env.VITE_INFRASTRUCTURE) {
      case 'SUPABASE':
        registerInfrastructureSupabase(container, {
          supabaseUrl: import.meta.env.VITE_SUPABASE_URL!,
          supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY!,
          authRedirectUrl:
            import.meta.env.VITE_AUTH_REDIRECT_URL! || window.origin,
        });
        break;
      case 'FIREBASE':
        registerInfrastructureFirebase(container, {
          apiKey: import.meta.env.VITE_FIREBASE_API_KEY!,
          authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN!,
          projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID!,
          storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET!,
          messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID!,
          appId: import.meta.env.VITE_FIREBASE_APP_ID!,
        });
        break;
      default:
        throw new Error('Invalid VITE_INFRASTRUCTURE');
    }

    // Register use cases
    registerUseCases(container);

    return container;
  }, []);

  return (
    <DependencyContainerContext.Provider value={container}>
      {children}
    </DependencyContainerContext.Provider>
  );
}
