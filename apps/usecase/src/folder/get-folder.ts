import type { Factory } from '@repo/ioc/container';
import { createToken } from '@repo/ioc/container';
import {
  FolderRepository,
  tFolderRepository,
} from '@repo/domain/repositories/folder.repository';
import { Folder, folderSchema } from './output';
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

  async execute(id: string): Promise<Folder | null> {
    const folder = await this.folderRepository.getById(id);
    return folder ? folderSchema.parse(folder) : null;
  }
}
