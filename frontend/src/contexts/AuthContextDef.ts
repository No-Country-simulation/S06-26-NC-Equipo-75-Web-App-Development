import { createContext } from 'react';

export interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
  companyId?: string; // ← nuevo campo
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);