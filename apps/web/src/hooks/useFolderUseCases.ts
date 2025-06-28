import {
  tCreateFolderUseCase,
  type CreateFolderInput,
} from '@repo/usecase/folder/create-folder';
import { useDependencyContainer } from './useDependencyContainer';
import type { FolderEntity } from '@repo/domain/entities/folder.entity';
import { tGetFolderUseCase } from '@repo/usecase/folder/get-folder';
import { tGetFolderListUseCase } from '@repo/usecase/folder/get-folder-list';

export type Folder = FolderEntity;
export type CreateFolderData = Omit<CreateFolderInput, 'userId'>;

export function useFolderUseCases() {
  const container = useDependencyContainer();
  const createFolderUseCase = container.resolve(tCreateFolderUseCase);
  const getFolderUseCase = container.resolve(tGetFolderUseCase);
  const getFolderListUseCase = container.resolve(tGetFolderListUseCase);

  // Get the current user ID (this would come from your auth system)
  const getCurrentUserId = () => {
    // This is a placeholder - replace with your actual user ID retrieval logic
    return '00000000-0000-0000-0000-000000000000'; // Default user ID for now
  };

  return {
    createFolder: async (data: CreateFolderData) => {
      const userId = getCurrentUserId();
      return createFolderUseCase.execute({
        ...data,
        userId,
      });
    },
    getFolderById: (id: string) => getFolderUseCase.execute(id),
    getAllFolders: () => {
      const userId = getCurrentUserId();
      return getFolderListUseCase.execute(userId);
    },
  };
}
