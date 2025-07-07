import type { Factory } from '@repo/ioc/container';
import type {
  AuthService,
  LoginWithEmailPasswordInput,
  LoginOutput,
} from '@repo/domain/services/auth.service';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { tFirebaseService } from '../register';

export const createFirebaseAuthService: Factory<AuthService> = (container) => {
  const firebaseService = container.resolve(tFirebaseService);
  return new FirebaseAuthService(firebaseService.auth);
};

export class FirebaseAuthService implements AuthService {
  private readonly auth: Auth;

  constructor(auth: Auth) {
    this.auth = auth;
  }

  async loginWithEmailPassword(
    input: LoginWithEmailPasswordInput
  ): Promise<LoginOutput> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        input.email,
        input.password
      );

      const user = userCredential.user;
      const accessToken = await user.getIdToken();

      return {
        accessToken,
        user: {
          id: user.uid,
          email: user.email!,
          name: user.displayName || undefined,
          avatar: user.photoURL || undefined,
        },
      };
    } catch (error) {
      console.error(error);
      throw new Error('Invalid credentials');
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to logout');
    }
  }

  async getCurrentUser(): Promise<LoginOutput['user'] | null> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(
        this.auth,
        async (user: User | null) => {
          unsubscribe();

          if (!user) {
            resolve(null);
            return;
          }

          resolve({
            id: user.uid,
            email: user.email!,
            name: user.displayName || undefined,
            avatar: user.photoURL || undefined,
          });
        }
      );
    });
  }
}
