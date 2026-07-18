import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut 
} from 'firebase/auth';

// Firebase Client configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Check if Firebase settings are fully configured
const isConfigured = !!(
  firebaseConfig.apiKey && 
  firebaseConfig.authDomain && 
  firebaseConfig.projectId
);

let app;
let auth;
let googleProvider;

if (isConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
}

// ==========================================
// CLIENT MOCK FALLBACK (Local Development)
// ==========================================
class MockAuth {
  constructor() {
    this.listeners = new Set();
    this.currentUser = null;
    
    // Load persisted mock user session on client start
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('mock_user_session');
      if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
      }
    }
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback(this.currentUser));
  }

  onAuthStateChanged(callback) {
    this.listeners.add(callback);
    // Execute immediately with current state
    callback(this.currentUser);
    return () => this.listeners.delete(callback);
  }

  async signInWithEmailAndPassword(email, password) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const uid = `dev-${email.split('@')[0]}`;
    const mockUser = {
      uid,
      email,
      displayName: email.split('@')[0].toUpperCase(),
      getIdToken: async () => `dev-${uid}-token`
    };
    
    this.currentUser = mockUser;
    localStorage.setItem('mock_user_session', JSON.stringify(mockUser));
    this.notifyListeners();
    return { user: mockUser };
  }

  async createUserWithEmailAndPassword(email, password, displayName = '') {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const uid = `dev-${email.split('@')[0]}`;
    const mockUser = {
      uid,
      email,
      displayName: displayName || email.split('@')[0].toUpperCase(),
      getIdToken: async () => `dev-${uid}-token`
    };

    this.currentUser = mockUser;
    localStorage.setItem('mock_user_session', JSON.stringify(mockUser));
    this.notifyListeners();
    return { user: mockUser };
  }

  async signInWithPopup() {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockUser = {
      uid: 'dev-googleuser123',
      email: 'hacker.community@gmail.com',
      displayName: 'HACKNFINITY DEV',
      photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150',
      getIdToken: async () => 'dev-dev-googleuser123-token'
    };

    this.currentUser = mockUser;
    localStorage.setItem('mock_user_session', JSON.stringify(mockUser));
    this.notifyListeners();
    return { user: mockUser };
  }

  async signOut() {
    await new Promise(resolve => setTimeout(resolve, 300));
    this.currentUser = null;
    localStorage.removeItem('mock_user_session');
    this.notifyListeners();
    return true;
  }
}

// Export real or mock auth system
const clientAuth = isConfigured ? auth : new MockAuth();

// Wrapper authentication functions that abstract whether we are in Real or Mock mode
export const loginEmail = async (email, password) => {
  if (isConfigured) {
    return signInWithEmailAndPassword(clientAuth, email, password);
  } else {
    return clientAuth.signInWithEmailAndPassword(email, password);
  }
};

export const registerEmail = async (email, password, displayName = '') => {
  if (isConfigured) {
    const credential = await createUserWithEmailAndPassword(clientAuth, email, password);
    // In real Firebase, you would update user profile:
    // await updateProfile(credential.user, { displayName });
    return credential;
  } else {
    return clientAuth.createUserWithEmailAndPassword(email, password, displayName);
  }
};

export const loginGoogle = async () => {
  if (isConfigured) {
    return signInWithPopup(clientAuth, googleProvider);
  } else {
    return clientAuth.signInWithPopup();
  }
};

export const logoutUser = async () => {
  if (isConfigured) {
    return signOut(clientAuth);
  } else {
    return clientAuth.signOut();
  }
};

export const subscribeToAuth = (callback) => {
  if (isConfigured) {
    return onAuthStateChanged(clientAuth, callback);
  } else {
    return clientAuth.onAuthStateChanged(callback);
  }
};

export { clientAuth as auth };
export default clientAuth;
