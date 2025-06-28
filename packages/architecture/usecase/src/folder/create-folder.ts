import { Factory } from '@repo/di/container';
import { createToken } from '@repo/di/create-token';
import { FolderEntity } from '@repo/domain/entities/folder.entity';
import {
  FolderRepository,
  tFolderRepository,
} from '@repo/domain/repositories/folder.repository';
import { z } from 'zod';

export const createFolderInputSchema = z.object({
  name: z.string().min(1),
  userId: z.string().uuid(),
  parentId: z.string().uuid().optional(),
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

  async execute(input: CreateFolderInput): Promise<FolderEntity> {
    const validatedInput = createFolderInputSchema.parse(input);

    const folder: FolderEntity = FolderEntity({
      id: 'dummy-id',
      name: validatedInput.name,
      userId: validatedInput.userId,
      parentId: validatedInput.parentId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.folderRepository.create(folder);

    return folder;
  }
}
