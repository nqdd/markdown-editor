import '@blocknote/core/fonts/inter.css';
import '@blocknote/shadcn/style.css';
import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@repo/ui';
import { router } from './router.tsx';
import { DependencyContainerProvider } from './providers/dependency-container.tsx';
import { AuthProvider } from './providers/auth-provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system">
      <DependencyContainerProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </DependencyContainerProvider>
    </ThemeProvider>
  </StrictMode>
);
