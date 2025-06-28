import * as React from 'react';
import { GalleryVerticalEnd } from '@repo/ui/icons';

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { getAllVaults } = useVaultUseCases();
  const [vaults, setVaults] = React.useState<any[]>([]);
  const [showCreateVaultDialog, setShowCreateVaultDialog] =
    React.useState(false);

  const loadVaults = React.useCallback(async () => {
    try {
      const supabaseVaults = await getAllVaults();

      if (supabaseVaults.length > 0) {
        const mappedVaults = supabaseVaults.map((vault) => ({
          id: vault.id,
          name: vault.name,
          logo: GalleryVerticalEnd, // Default logo
        }));

        setVaults(mappedVaults);
        setShowCreateVaultDialog(false);
      } else {
        // No vaults exist, show create vault dialog
        setShowCreateVaultDialog(true);
      }
    } catch (error) {
      console.error('Error loading vaults:', error);
      // Fallback to default vault on error
      setVaults([]);
    }
  }, [getAllVaults]);

  React.useEffect(() => {
    loadVaults();
  }, [loadVaults]);

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
