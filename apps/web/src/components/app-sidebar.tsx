import * as React from 'react';
import { AudioWaveform, Folder, GalleryVerticalEnd } from '@repo/ui/icons';

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
  folders: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Folder,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: Folder,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Folder,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <VaultSwitcher vaults={data.vaults} />
      </SidebarHeader>
      <SidebarContent>
        <NavFolder folders={data.folders} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
