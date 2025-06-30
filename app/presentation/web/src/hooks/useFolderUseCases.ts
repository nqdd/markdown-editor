import {
  tCreateFolderUseCase,
  type CreateFolderInput,
} from '@repo/usecase/folder/create-folder';
import { useDependencyContainer } from './useDependencyContainer';
import type { FolderEntity } from '@repo/domain/entities/folder.entity';
import { tGetFolderUseCase } from '@repo/usecase/folder/get-folder';
import { tGetFolderListUseCase } from '@repo/usecase/folder/get-folder-list';
import { useAuthContext } from '../providers/auth-provider';
import { useCallback } from 'react';

export type Folder = FolderEntity;
export type CreateFolderData = Omit<CreateFolderInput, 'userId'>;

export function useFolderUseCases() {
  const container = useDependencyContainer();
  const createFolderUseCase = container.resolve(tCreateFolderUseCase);
  const getFolderUseCase = container.resolve(tGetFolderUseCase);
  const getFolderListUseCase = container.resolve(tGetFolderListUseCase);
  const { user } = useAuthContext();

  return {
    createFolder: useCallback(
      async (data: CreateFolderData) => {
        if (!user?.id) {
          throw new Error('User not logged in');
        }
        return createFolderUseCase.execute({
          ...data,
          userId: user.id,
        });
      },
      [user?.id, createFolderUseCase]
    ),
    getFolderById: useCallback(
      async (id: string) => getFolderUseCase.execute(id),
      [getFolderUseCase]
    ),
    getAllFolders: useCallback(async () => {
      if (!user?.id) {
        throw new Error('User not logged in');
      }
      return getFolderListUseCase.execute(user?.id);
    }, [user?.id, getFolderListUseCase]),
  };
}
