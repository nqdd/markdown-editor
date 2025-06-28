import { SidebarProvider } from '@repo/ui';
import { AppSidebar } from '../components/app-sidebar.tsx';
import { Outlet } from 'react-router-dom';

export function RootLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Outlet />
    </SidebarProvider>
  );
}