import type { Factory } from '@repo/ioc/container';
import { createToken } from '@repo/ioc/token';
import {
  FolderRepository,
  tFolderRepository,
} from '@repo/domain/repositories/folder.repository';
export const tDeleteFolderUseCase = createToken<DeleteFolderUseCase>(
  'DELETE_FOLDER_USE_CASE'
);

export const createDeleteFolderUseCase: Factory<DeleteFolderUseCase> = (
  container
) => {
  const folderRepository = container.resolve(tFolderRepository);
  return new DeleteFolderUseCase(folderRepository);
};

export class DeleteFolderUseCase {
  constructor(private folderRepository: FolderRepository) {}

  async execute(id: string): Promise<void> {
    await this.folderRepository.delete(id);
  }
}
