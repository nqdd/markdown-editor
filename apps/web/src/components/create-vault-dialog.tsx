import { useState } from 'react';

import { useVaultUseCases } from '../hooks/useVaultUseCases';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
} from '@repo/ui';

interface CreateVaultDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onVaultCreated?: () => void;
}

export function CreateVaultDialog({
  isOpen,
  onOpenChange,
  onVaultCreated,
}: CreateVaultDialogProps) {
  const [name, setName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { createVault } = useVaultUseCases();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setIsCreating(true);
      await createVault({ name });
      setName('');
      onOpenChange(false);
      if (onVaultCreated) {
        onVaultCreated();
      }
    } catch (error) {
      console.error('Error creating vault:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Vault</DialogTitle>
          <DialogDescription>
            Create a new vault to organize your documents and folders.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                autoFocus
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? 'Creating...' : 'Create Vault'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
