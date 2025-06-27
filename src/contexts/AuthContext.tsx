import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiRequest } from '../lib/api';

interface UserProfile {
  id: number;
  email: string;
  role: 'admin' | 'client';
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, role: 'admin' | 'client') => Promise<void>;
  signOut: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      // Decodificar token (simples, sem validação de expiração)
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({ id: payload.id, email: payload.email, role: payload.role });
    } else {
      setUser(null);
    }
  }, [token]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest('/auth/login', 'POST', { email, password });
      setToken(data.token);
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setLoading(false);
      return true;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      return false;
    }
  };

  const signUp = async (email: string, password: string, role: 'admin' | 'client') => {
    setLoading(true);
    setError(null);
    try {
      await apiRequest('/auth/register', 'POST', { email, password, role });
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signIn, signUp, signOut, token }}>
      {children}
    </AuthContext.Provider>
  );
}; 