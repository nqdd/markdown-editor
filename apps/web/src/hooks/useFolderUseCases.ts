import {
  tCreateFolderUseCase,
  type CreateFolderInput,
} from '@repo/usecase/folder/create-folder';
import { useDependencyContainer } from './useDependencyContainer';
import type { FolderEntity } from '@repo/domain/entities/folder.entity';
import { tGetFolderUseCase } from '@repo/usecase/folder/get-folder';
import { tGetFolderListUseCase } from '@repo/usecase/folder/get-folder-list';
import { useAuthContext } from '../providers/auth-provider';

export type Folder = FolderEntity;
export type CreateFolderData = Omit<CreateFolderInput, 'userId'>;

export function useFolderUseCases() {
  const container = useDependencyContainer();
  const createFolderUseCase = container.resolve(tCreateFolderUseCase);
  const getFolderUseCase = container.resolve(tGetFolderUseCase);
  const getFolderListUseCase = container.resolve(tGetFolderListUseCase);
  const { user } = useAuthContext();

  // Get the current user ID from the auth context
  const getCurrentUserId = () => {
    if (!user) {
      // Default user ID as fallback
      return '00000000-0000-0000-0000-000000000000';
    }
    return user.id;
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
