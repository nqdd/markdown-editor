import * as React from 'react';
import { ChevronsUpDown, Plus } from '@repo/ui/icons';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@repo/ui';
import { CreateVaultDialog } from './create-vault-dialog';

export function VaultSwitcher({
  vaults,
  onVaultCreated,
}: {
  vaults: {
    name: string;
    logo: React.ElementType;
  }[];
  onVaultCreated?: () => void;
}) {
  const { isMobile } = useSidebar();
  const [activeVault, setActiveVault] = React.useState(vaults[0]);
  const [isCreateVaultOpen, setIsCreateVaultOpen] = React.useState(false);

  if (!activeVault) {
    return null;
  }

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <activeVault.logo className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {activeVault.name}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="start"
              side={isMobile ? 'bottom' : 'right'}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                Vaults
              </DropdownMenuLabel>
              {vaults.map((vault, index) => (
                <DropdownMenuItem
                  key={vault.name}
                  onClick={() => setActiveVault(vault)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <vault.logo className="size-3.5 shrink-0" />
                  </div>
                  {vault.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2 p-2"
                onClick={() => setIsCreateVaultOpen(true)}
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">
                  Add vault
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <CreateVaultDialog
        isOpen={isCreateVaultOpen}
        onOpenChange={setIsCreateVaultOpen}
        onVaultCreated={onVaultCreated}
      />
    </>
  );
}
