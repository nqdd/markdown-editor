import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
  Button,
  Input,
  Label,
} from '@repo/ui';
import {
  useFolderUseCases,
  type CreateFolderData,
} from '../hooks/useFolderUseCases';

interface CreateFolderDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  parentId?: string | null;
  onFolderCreated?: () => void;
}

export function CreateFolderDialog({
  isOpen,
  onOpenChange,
  parentId = null,
  onFolderCreated,
}: CreateFolderDialogProps) {
  const [folderName, setFolderName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { createFolder } = useFolderUseCases();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!folderName.trim()) {
      setError('Folder name is required');
      return;
    }

    try {
      setIsLoading(true);
      const folderData: CreateFolderData = {
        name: folderName.trim(),
        parentId: parentId || undefined,
      };

      await createFolder(folderData);
      setFolderName('');
      onOpenChange(false);
      if (onFolderCreated) {
        onFolderCreated();
      }
    } catch (err) {
      console.error('Error creating folder:', err);
      setError('Failed to create folder. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <form onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>Create New Folder</SheetTitle>
          </SheetHeader>

          <div className="px-4 py-6">
            <div className="space-y-2">
              <Label htmlFor="folderName">Folder Name</Label>
              <Input
                id="folderName"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Enter folder name"
                autoFocus
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </SheetClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Folder'}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
