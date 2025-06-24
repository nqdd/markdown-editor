import '@blocknote/core/fonts/inter.css';
import '@blocknote/shadcn/style.css';
import './index.css';

import App from './app/App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Label,
  SidebarProvider,
  SidebarTrigger,
  ThemeProvider,
} from '@repo/ui';
import { AppSidebar } from './app/app-sidebar.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col flex-1 gap-2 p-2">
          <div className="flex items-center">
            <SidebarTrigger />
            <Label>Markdown Editor</Label>
          </div>
          <div className="flex flex-1">
            <App />
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  </StrictMode>
);
