import type { Factory } from '@repo/di/container';
import { createToken } from '@repo/di/create-token';
import { FolderEntity } from '@repo/domain/entities/folder.entity';
import {
  FolderRepository,
  tFolderRepository,
} from '@repo/domain/repositories/folder.repository';
export const tGetFolderListUseCase = createToken<GetFolderListUseCase>(
  'GET_FOLDER_LIST_USE_CASE'
);

export const createGetFolderListUseCase: Factory<GetFolderListUseCase> = (
  container
) => {
  const folderRepository = container.resolve(tFolderRepository);
  return new GetFolderListUseCase(folderRepository);
};

export class GetFolderListUseCase {
  constructor(private folderRepository: FolderRepository) {}

  async execute(userId: string): Promise<FolderEntity[]> {
    return await this.folderRepository.getAllByUser(userId);
  }
}
