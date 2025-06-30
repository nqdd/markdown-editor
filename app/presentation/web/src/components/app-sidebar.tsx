import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@repo/ui';
import { NavFolder } from './nav-folder';
import { VaultSwitcher } from './vault-switcher';
import { NavUser } from './nav-user';
import { useVaultUseCases } from '../hooks/useVaultUseCases';
import { CreateVaultDialog } from './create-vault-dialog';
import { Vault } from '@repo/usecase/vault/output';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { getAllVaults } = useVaultUseCases();
  const [vaults, setVaults] = React.useState<Vault[]>([]);
  const [showCreateVaultDialog, setShowCreateVaultDialog] =
    React.useState(false);

  const loadVaults = React.useCallback(async () => {
    try {
      const vaults = await getAllVaults();
      if (vaults.length > 0) {
        setVaults(vaults);
        setShowCreateVaultDialog(false);
      } else {
        setShowCreateVaultDialog(true);
      }
    } catch (error) {
      console.error('Error loading vaults:', error);
      setVaults([]);
    }
  }, []);

  React.useEffect(() => {
    loadVaults();
  }, []);

  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <VaultSwitcher
            vaults={vaults.length > 0 ? vaults : []}
            onVaultCreated={loadVaults}
          />
        </SidebarHeader>
        <SidebarContent>
          <NavFolder />
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
      </Sidebar>

      <CreateVaultDialog
        isOpen={showCreateVaultDialog}
        onOpenChange={setShowCreateVaultDialog}
        onVaultCreated={loadVaults}
      />
    </>
  );
}
