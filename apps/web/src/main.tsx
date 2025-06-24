import './index.css';
import App from './app/App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SidebarProvider, SidebarTrigger, ThemeProvider } from '@repo/ui';
import { AppSidebar } from './app/AppSideBar.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system">
      <SidebarProvider>
        <AppSidebar />
        <>
          <SidebarTrigger />
          <App />
        </>
      </SidebarProvider>
    </ThemeProvider>
  </StrictMode>
);
