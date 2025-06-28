import '@blocknote/core/fonts/inter.css';
import '@blocknote/shadcn/style.css';
import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@repo/ui';
import { router } from './router.tsx';
import { DependencyContainerProvider } from './providers/dependency-container.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system">
      <DependencyContainerProvider>
        <RouterProvider router={router} />
      </DependencyContainerProvider>
    </ThemeProvider>
  </StrictMode>
);
