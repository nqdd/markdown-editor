import { DependencyContainer } from '@repo/ioc/container';
import { registerInfrastructureSupabase } from '@repo/infrastructure-supabase/register';
import { registerUseCases } from '@repo/usecase/register';
import { createContext, type ReactNode, useMemo } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const DependencyContainerContext =
  createContext<DependencyContainer | null>(null);

let isDependencyInitialized = false;

export function DependencyContainerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const container = useMemo(() => {
    console.debug('isDependencyInitialized', isDependencyInitialized);
    const container = DependencyContainer.getInstance();
    if (!isDependencyInitialized) {
      registerInfrastructureSupabase(container, {
        supabaseUrl: import.meta.env.VITE_SUPABASE_URL!,
        supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY!,
        authRedirectUrl:
          import.meta.env.VITE_AUTH_REDIRECT_URL! || window.origin,
      });

      // Register use cases
      registerUseCases(container);

      isDependencyInitialized = true;
    }
    return container;
  }, []);

  return (
    <DependencyContainerContext.Provider value={container}>
      {children}
    </DependencyContainerContext.Provider>
  );
}
