import { initializeApp, FirebaseApp, type FirebaseOptions } from 'firebase/app';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';
import {
  connectFirestoreEmulator,
  getFirestore,
  Firestore,
} from 'firebase/firestore';
import { connectAuthEmulator, getAuth, Auth, User } from 'firebase/auth';

export class FirebaseService {
  private readonly _app: FirebaseApp;
  private readonly _auth: Auth;
  private readonly _firestore: Firestore;
  private _analytics: Analytics | undefined;
  public static instance: FirebaseService;

  private constructor(
    private readonly env: string,
    private readonly host: string,
    private readonly firebaseConfig: FirebaseOptions
  ) {
    this._app = initializeApp(this.firebaseConfig);
    this._auth = getAuth(this._app);
    this._firestore = getFirestore(this._app);

    // Connect to emulators in development
    if (this.env === 'development' && this.host === 'localhost') {
      console.log('🧪 Connecting to Firebase Emulators...');
      connectAuthEmulator(this._auth, 'http://localhost:9099');
      connectFirestoreEmulator(this._firestore, 'localhost', 8080);
    }

    // Initialize analytics
    if (this.env !== 'development') {
      isSupported().then((supported) => {
        if (supported) {
          this._analytics = getAnalytics(this._app);
        }
      });
    }
  }

  public static init(
    env: string,
    host: string,
    firebaseConfig: FirebaseOptions
  ) {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService(env, host, firebaseConfig);
    }
    return FirebaseService.instance;
  }

  get auth(): Auth {
    return this._auth;
  }

  get firestore(): Firestore {
    return this._firestore;
  }

  get analytics(): Analytics | undefined {
    return this._analytics;
  }

  get firebaseApp(): FirebaseApp {
    return this._app;
  }

  onAuthStateChanged(callback: (user: User | null) => void) {
    return this._auth.onAuthStateChanged(callback);
  }
}
