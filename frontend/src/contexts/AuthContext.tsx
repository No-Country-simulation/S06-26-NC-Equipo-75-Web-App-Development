import React, { useState, type ReactNode } from 'react';
import { AuthContext, type AuthContextType } from './AuthContextDef';
import { authApi } from '../services/api.service';

const initializeAuth = () => {
  const token = localStorage.getItem('access_token');
  const userRaw = localStorage.getItem('user');

  let user = null;
  if (userRaw && userRaw !== 'undefined' && userRaw !== 'null') {
    try {
      user = JSON.parse(userRaw);
    } catch (e) {
      console.warn('Error parsing user from localStorage:', e);
      localStorage.removeItem('user');
    }
  }

  return {
    user,
    isAuthenticated: !!token,
  };
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState(initializeAuth);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authApi.login(email, password);

      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));

      setState({
        user: response.user,
        isAuthenticated: true,
      });
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setState({
      user: null,
      isAuthenticated: false,
    });
  };

  const contextValue: AuthContextType = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};