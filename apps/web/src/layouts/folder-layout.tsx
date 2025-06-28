import { type ReactNode } from 'react';
import { SidebarTrigger, Label } from '@repo/ui';

interface FolderLayoutProps {
  title: string;
  children: ReactNode;
}

export function FolderLayout({ title, children }: FolderLayoutProps) {
  return (
    <div className="flex flex-col flex-1 gap-2 p-2">
      {/* Header with title */}
      <div className="flex items-center">
        <SidebarTrigger />
        <Label>{title}</Label>
      </div>

      {/* Main content area with optional preview */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 border-1 rounded-md py-4 px-2 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
