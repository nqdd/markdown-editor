import {
  FolderEntity,
  parseFolderEntity,
} from '@repo/domain/entities/folder.entity';
import type { FolderRepository } from '@repo/domain/repositories/folder.repository';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
} from 'firebase/firestore';
import { DependencyContainer } from '@repo/ioc/container';
import { tFirebaseService } from '../register';

export const createFirebaseFolderRepository = (
  container: DependencyContainer
): FolderRepository => {
  const firebaseService = container.resolve(tFirebaseService);
  return new FirebaseFolderRepository(firebaseService.firestore);
};

export class FirebaseFolderRepository implements FolderRepository {
  private readonly firestore: Firestore;

  constructor(firestore: Firestore) {
    this.firestore = firestore;
  }

  async getById(id: string): Promise<FolderEntity | null> {
    try {
      const folderRef = doc(this.firestore, 'folders', id);
      const folderSnap = await getDoc(folderRef);

      if (!folderSnap.exists()) {
        return null;
      }

      const data = folderSnap.data();
      return parseFolderEntity({
        id: folderSnap.id,
        name: data.name,
        userId: data.userId,
        parentId: data.parentId,
        vaultId: data.vaultId,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        deletedAt: data.deletedAt?.toDate(),
      });
    } catch (error) {
      console.error('Error getting folder by id:', error);
      return null;
    }
  }

  async getAllByUserAndVault(
    userId: string,
    vaultId: string
  ): Promise<FolderEntity[]> {
    try {
      const foldersRef = collection(this.firestore, 'folders');
      const q = query(
        foldersRef,
        where('userId', '==', userId),
        where('vaultId', '==', vaultId),
        orderBy('name')
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs
        .map((doc) => {
          try {
            const data = doc.data();
            return parseFolderEntity({
              id: doc.id,
              name: data.name,
              userId: data.userId,
              parentId: data.parentId,
              vaultId: data.vaultId,
              createdAt: data.createdAt?.toDate() || new Date(),
              updatedAt: data.updatedAt?.toDate() || new Date(),
              deletedAt: data.deletedAt?.toDate(),
            });
          } catch (error) {
            console.error('Error parsing folder entity:', error);
            return null;
          }
        })
        .filter((folder): folder is FolderEntity => folder !== null);
    } catch (error) {
      console.error('Error getting folders by user and vault:', error);
      return [];
    }
  }

  async create(folder: FolderEntity): Promise<void> {
    try {
      const foldersRef = collection(this.firestore, 'folders');
      await addDoc(foldersRef, {
        id: folder.id,
        name: folder.name,
        userId: folder.userId,
        parentId: folder.parentId || null,
        vaultId: folder.vaultId || null,
        createdAt: folder.createdAt,
        updatedAt: folder.updatedAt,
        deletedAt: folder.deletedAt,
      });
    } catch (error) {
      console.error('Error creating folder:', error);
      throw error;
    }
  }

  async update(folder: FolderEntity): Promise<void> {
    try {
      const folderRef = doc(this.firestore, 'folders', folder.id);
      await updateDoc(folderRef, {
        name: folder.name,
        parentId: folder.parentId || null,
        vaultId: folder.vaultId || null,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating folder:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const folderRef = doc(this.firestore, 'folders', id);
      await deleteDoc(folderRef);
    } catch (error) {
      console.error('Error deleting folder:', error);
      throw error;
    }
  }
}
