import type { Factory } from '@repo/ioc/container';
import { createToken } from '@repo/ioc/container';
import { FolderEntity } from '@repo/domain/entities/folder.entity';
import {
  FolderRepository,
  tFolderRepository,
} from '@repo/domain/repositories/folder.repository';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { Folder, folderSchema } from './output';

export const createFolderInputSchema = z.object({
  name: z.string().min(1),
  userId: z.string().uuid(),
  parentId: z.string().uuid().optional(),
  vaultId: z.string().uuid().optional(),
});

export type CreateFolderInput = z.infer<typeof createFolderInputSchema>;

export const tCreateFolderUseCase = createToken<CreateFolderUseCase>(
  'CREATE_FOLDER_USE_CASE'
);

export const createCreateFolderUseCase: Factory<CreateFolderUseCase> = (
  container
) => {
  const folderRepository = container.resolve(tFolderRepository);
  return new CreateFolderUseCase(folderRepository);
};

export class CreateFolderUseCase {
  constructor(private folderRepository: FolderRepository) {}

  async execute(input: CreateFolderInput): Promise<Folder> {
    const validatedInput = createFolderInputSchema.parse(input);

    const folder: FolderEntity = FolderEntity({
      id: uuidv4(),
      name: validatedInput.name,
      userId: validatedInput.userId,
      parentId: validatedInput.parentId,
      vaultId: validatedInput.vaultId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.folderRepository.create(folder);

    return folderSchema.parse(folder);
  }
}
