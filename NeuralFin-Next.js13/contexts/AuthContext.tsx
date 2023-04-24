'use client'


import { createContext, useState, ReactNode } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
}

interface AuthContextType {
  auth: AuthState;
  updateAuth: (newAuth: AuthState) => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({ isAuthenticated: false, user: null });

  const updateAuth = (newAuth: AuthState) => {
    setAuth(newAuth);
  };

  return (
    <AuthContext.Provider value={{ auth, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
