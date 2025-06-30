import { createToken } from '@repo/ioc/token';
import { FolderEntity } from '../entities/folder.entity';

export const tFolderRepository =
  createToken<FolderRepository>('FOLDER_REPOSITORY');

export interface FolderRepository {
  getById(id: string): Promise<FolderEntity | null>;
  getAllByUserAndVault(
    userId: string,
    vaultId: string
  ): Promise<FolderEntity[]>;
  create(folder: FolderEntity): Promise<void>;
  update(folder: FolderEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
