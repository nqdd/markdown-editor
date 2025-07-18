import type { Factory } from '@repo/ioc/container';
import { createToken } from '@repo/ioc/container';
import { FolderEntity } from '@repo/domain/entities/folder.entity';
import {
  FolderRepository,
  tFolderRepository,
} from '@repo/domain/repositories/folder.repository';
import { z } from 'zod';
import { Folder, folderSchema } from './output';

export const updateFolderInputSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).optional(),
  parentId: z.string().uuid().optional().nullable(),
  vaultId: z.string().uuid().optional().nullable(),
});

export type UpdateFolderInput = z.infer<typeof updateFolderInputSchema>;

export const tUpdateFolderUseCase = createToken<UpdateFolderUseCase>(
  'UPDATE_FOLDER_USE_CASE'
);

export const createUpdateFolderUseCase: Factory<UpdateFolderUseCase> = (
  container
) => {
  const folderRepository = container.resolve(tFolderRepository);
  return new UpdateFolderUseCase(folderRepository);
};

export class UpdateFolderUseCase {
  constructor(private folderRepository: FolderRepository) {}

  async execute(input: UpdateFolderInput): Promise<Folder> {
    const validatedInput = updateFolderInputSchema.parse(input);

    const existingFolder = await this.folderRepository.getById(
      validatedInput.id
    );
    if (!existingFolder) {
      throw new Error(`Folder with id ${validatedInput.id} not found`);
    }

    const updatedFolder: FolderEntity = {
      ...existingFolder,
      name: validatedInput.name ?? existingFolder.name,
      parentId:
        validatedInput.parentId !== undefined
          ? validatedInput.parentId || undefined
          : existingFolder.parentId,
      vaultId:
        validatedInput.vaultId !== undefined
          ? validatedInput.vaultId || undefined
          : existingFolder.vaultId,
      updatedAt: new Date(),
    };

    await this.folderRepository.update(updatedFolder);

    return folderSchema.parse(updatedFolder);
  }
}
