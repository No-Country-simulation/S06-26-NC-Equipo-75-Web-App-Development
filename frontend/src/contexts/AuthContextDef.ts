import { createContext } from 'react';

export interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// ✅ Exportación correcta del contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);