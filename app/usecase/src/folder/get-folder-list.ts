import type { Factory } from '@repo/ioc/container';
import { createToken } from '@repo/ioc/token';
import {
  FolderRepository,
  tFolderRepository,
} from '@repo/domain/repositories/folder.repository';
import { Folder, folderSchema } from './output';
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

  async execute(userId: string): Promise<Folder[]> {
    const folders = await this.folderRepository.getAllByUser(userId);
    return folderSchema.array().parse(folders);
  }
}
