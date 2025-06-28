import * as React from 'react';
import { AudioWaveform, GalleryVerticalEnd } from '@repo/ui/icons';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@repo/ui';
import { NavFolder } from './nav-folder';
import { VaultSwitcher } from './vault-switcher';
import { NavUser } from './nav-user';
import { useState } from 'react';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  vaults: [
    {
      name: 'Personal',
      logo: GalleryVerticalEnd,
    },
    {
      name: 'Company',
      logo: AudioWaveform,
    },
  ],
  folders: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // We'll continue to use the sample data as a fallback
  // and merge it with data from Supabase

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <VaultSwitcher vaults={data.vaults} />
      </SidebarHeader>
      <SidebarContent>
        {/* The NavFolder component will load folders from Supabase */}
        <NavFolder folders={data.folders} />
        {loading && (
          <div className="px-2 py-1 text-sm text-muted-foreground">
            Loading folders...
          </div>
        )}
        {error && <div className="px-2 py-1 text-sm text-red-500">{error}</div>}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
