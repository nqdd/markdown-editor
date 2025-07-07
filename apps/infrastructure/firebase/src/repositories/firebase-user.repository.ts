import type { UserRepository } from '@repo/domain/repositories/user.repository';
import { UserEntity, parseUserEntity } from '@repo/domain/entities/user.entity';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { DependencyContainer } from '@repo/ioc/container';
import { tFirebaseService } from '../register';

export const createFirebaseUserRepository = (
  container: DependencyContainer
): UserRepository => {
  const firebaseService = container.resolve(tFirebaseService);
  return new FirebaseUserRepository(firebaseService.firestore);
};

export class FirebaseUserRepository implements UserRepository {
  private readonly firestore: Firestore;

  constructor(firestore: Firestore) {
    this.firestore = firestore;
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    try {
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return null;
      }

      const doc = querySnapshot.docs[0];
      const data = doc?.data();

      if (!data || !doc?.id) {
        return null;
      }

      return parseUserEntity({
        id: doc.id,
        name: data.name,
        email: data.email,
        password: data.password,
        image: data.image,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate(),
        deletedAt: data.deletedAt?.toDate(),
      });
    } catch (error) {
      console.error('Error getting user by email:', error);
      return null;
    }
  }
}
