import { DependencyContainer } from '@repo/ioc/container';
import {
  createCreateFolderUseCase,
  tCreateFolderUseCase,
} from './create-folder';
import { createGetFolderUseCase, tGetFolderUseCase } from './get-folder';
import {
  createGetFolderListUseCase,
  tGetFolderListUseCase,
} from './get-folder-list';
import {
  createUpdateFolderUseCase,
  tUpdateFolderUseCase,
} from './update-folder';
import {
  createDeleteFolderUseCase,
  tDeleteFolderUseCase,
} from './delete-folder';

export function registerFolderUseCases(container: DependencyContainer): void {
  container.register(tCreateFolderUseCase, createCreateFolderUseCase);
  container.register(tGetFolderUseCase, createGetFolderUseCase);
  container.register(tGetFolderListUseCase, createGetFolderListUseCase);
  container.register(tUpdateFolderUseCase, createUpdateFolderUseCase);
  container.register(tDeleteFolderUseCase, createDeleteFolderUseCase);
}
