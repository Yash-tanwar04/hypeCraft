import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { auth } from '../firebase/config';

interface AuthContextType {
  user: User | null;
  isDemoAdmin: boolean;
  loading: boolean;
  loginWithDemo: () => void;
  loginWithPassword: (pass: string) => boolean;
  loginWithEmail: (e: string, p: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isDemoAdmin: false,
  loading: true,
  loginWithDemo: () => {},
  loginWithPassword: () => false,
  loginWithEmail: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isDemoAdmin, setIsDemoAdmin] = useState<boolean>(() => {
    return localStorage.getItem('hypecraft_demo_admin') === 'true';
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithDemo = () => {
    setIsDemoAdmin(true);
    localStorage.setItem('hypecraft_demo_admin', 'true');
  };

  const loginWithPassword = (pass: string): boolean => {
    if (pass.trim() === 'hypecraft2026') {
      setIsDemoAdmin(true);
      localStorage.setItem('hypecraft_demo_admin', 'true');
      return true;
    }
    return false;
  };

  const loginWithEmail = async (email: string, pass: string) => {
    if (pass.trim() === 'hypecraft2026') {
      setIsDemoAdmin(true);
      localStorage.setItem('hypecraft_demo_admin', 'true');
      return;
    }

    if (!auth) {
      throw new Error('Invalid credentials. Please enter the master password (hypecraft2026).');
    }

    try {
      await signInWithEmailAndPassword(auth, email, pass);
      setIsDemoAdmin(false);
      localStorage.removeItem('hypecraft_demo_admin');
    } catch (err: any) {
      if (pass.trim() === 'hypecraft2026') {
        setIsDemoAdmin(true);
        localStorage.setItem('hypecraft_demo_admin', 'true');
        return;
      }
      throw new Error('Invalid credentials. Please use password "hypecraft2026" or valid Firebase credentials.');
    }
  };

  const logout = async () => {
    setIsDemoAdmin(false);
    localStorage.removeItem('hypecraft_demo_admin');
    if (auth && auth.currentUser) {
      await signOut(auth);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isDemoAdmin,
        loading,
        loginWithDemo,
        loginWithPassword,
        loginWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
