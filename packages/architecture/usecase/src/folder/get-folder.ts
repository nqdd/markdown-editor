import { Factory } from '@repo/di/container';
import { createToken } from '@repo/di/create-token';
import { FolderEntity } from '@repo/domain/entities/folder.entity';
import {
  FolderRepository,
  tFolderRepository,
} from '@repo/domain/repositories/folder.repository';

export const tGetFolderUseCase = createToken<GetFolderUseCase>(
  'GET_FOLDER_USE_CASE'
);

export const createGetFolderUseCase: Factory<GetFolderUseCase> = (
  container
) => {
  const folderRepository = container.resolve(tFolderRepository);
  return new GetFolderUseCase(folderRepository);
};

export class GetFolderUseCase {
  constructor(private folderRepository: FolderRepository) {}

  async execute(id: string): Promise<FolderEntity | null> {
    return await this.folderRepository.getById(id);
  }
}
