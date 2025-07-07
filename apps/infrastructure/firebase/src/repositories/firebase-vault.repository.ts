import {
  VaultEntity,
  parseVaultEntity,
} from '@repo/domain/entities/vault.entity';
import type { VaultRepository } from '@repo/domain/repositories/vault.repository';
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

export const createFirebaseVaultRepository = (
  container: DependencyContainer
): VaultRepository => {
  const firebaseService = container.resolve(tFirebaseService);
  return new FirebaseVaultRepository(firebaseService.firestore);
};

export class FirebaseVaultRepository implements VaultRepository {
  private readonly firestore: Firestore;

  constructor(firestore: Firestore) {
    this.firestore = firestore;
  }

  async getById(id: string): Promise<VaultEntity | null> {
    try {
      const vaultRef = doc(this.firestore, 'vaults', id);
      const vaultSnap = await getDoc(vaultRef);

      if (!vaultSnap.exists()) {
        return null;
      }

      const data = vaultSnap.data();
      return parseVaultEntity({
        id: vaultSnap.id,
        name: data.name,
        userId: data.userId,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      });
    } catch (error) {
      console.error('Error getting vault by id:', error);
      return null;
    }
  }

  async getAllByUser(userId: string): Promise<VaultEntity[]> {
    try {
      const vaultsRef = collection(this.firestore, 'vaults');
      const q = query(
        vaultsRef,
        where('userId', '==', userId),
        orderBy('name')
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs
        .map((doc) => {
          try {
            const data = doc.data();
            return parseVaultEntity({
              id: doc.id,
              name: data.name,
              userId: data.userId,
              createdAt: data.createdAt?.toDate() || new Date(),
              updatedAt: data.updatedAt?.toDate() || new Date(),
            });
          } catch (error) {
            console.error('Error parsing vault entity:', error);
            return null;
          }
        })
        .filter((vault): vault is VaultEntity => vault !== null);
    } catch (error) {
      console.error('Error getting vaults by user:', error);
      return [];
    }
  }

  async create(vault: VaultEntity): Promise<void> {
    try {
      const vaultsRef = collection(this.firestore, 'vaults');
      await addDoc(vaultsRef, {
        id: vault.id,
        name: vault.name,
        userId: vault.userId,
        createdAt: vault.createdAt,
        updatedAt: vault.updatedAt,
      });
    } catch (error) {
      console.error('Error creating vault:', error);
      throw error;
    }
  }

  async update(vault: VaultEntity): Promise<void> {
    try {
      const vaultRef = doc(this.firestore, 'vaults', vault.id);
      await updateDoc(vaultRef, {
        name: vault.name,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating vault:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const vaultRef = doc(this.firestore, 'vaults', id);
      await deleteDoc(vaultRef);
    } catch (error) {
      console.error('Error deleting vault:', error);
      throw error;
    }
  }
}
